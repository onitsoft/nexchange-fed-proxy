const express = require("express");
const path = require("path");
const helmet = require("helmet");
const url = require("url");

const app = express();
const NEXCHANGE_ROOT = process.env.NEXCHANGE_ROOT;
const ICO_ROOT = process.env.ICO_ROOT;
const languageRedirect = true;

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());
app.use("/ico", express.static(path.resolve(ICO_ROOT)));
app.use(express.static(path.resolve(NEXCHANGE_ROOT), { index: false }));

function getCur(qParam) {
  return qParam.toUpperCase().substr(-3);
}

app.get("/ico", (req, res) => {
  res.sendFile(path.resolve(ICO_ROOT, "index.html"));
});

// Handling lowercase order Ids
const orderUppercase = (req, res, next) => {
  const orderIdUP = req.params.orderId.toUpperCase();
  if (req.params.orderId !== orderIdUP) {
    res.redirect(`/order/${orderIdUP}`);
  } else {
    next();
  }
};

// General handler for the rest of the URLs
const generalHandler = (req, res) => {
  let urlPath = req.path;
  const langInPath = urlPath.split("/")[1];
  const langInParam = req.query.lang ? req.query.lang.toLowerCase() : undefined;
  let lang = langInPath || langInParam || "en";
  const fromCurr = req.query.cur_from;
  const toCurr = req.query.cur_to;
  const validLanguages = ["en", "de", "ru"];
  const testPaymentMethods = [
    { code: "ADVC", name: "ADVCASH" },
    { code: "PR", name: "PAYEER" },
    { code: "SEPA", name: "SEPA" },
  ];
  let testPaymentMethod = undefined;

  let redirectRequired = false;

  // remove extra / from url
  if (urlPath.charAt(urlPath.length - 1) === "/") {
    urlPath = urlPath.substring(0, urlPath.length - 1);
    redirectRequired = true;
  }

  const isForgotPasswordUrl = /\/forgot-password\/\w+(\/)?$/.test(urlPath);

  if (isForgotPasswordUrl) {
    const token = urlPath.split("/")[urlPath.split("/").length - 1];
    urlPath = urlPath.replace(`\/${token}`, "");
    res.header("Set-Cookie", `resetToken=${lang}`);
    redirectRequired = true;
  }

  // Dont add language path in url if set to false
  if (!languageRedirect) lang = "";

  if (validLanguages.includes(langInPath)) {
    res.header("Set-Cookie", `i18next=${lang}`);

    urlPath = urlPath.substr(lang.length + 1);

    // If lang is in path then ignore lang in param
    delete req.query["lang"];
  } else {
    if (languageRedirect) {
      lang = langInParam || "en";
      redirectRequired = true;
    }
  }

  if (fromCurr && toCurr) {
    const paymentMethod = fromCurr.substr(0, fromCurr.length - 3);

    // Loops in test payment methods array
    for (const elem in testPaymentMethods) {
      if (testPaymentMethods[elem].code === paymentMethod) {
        testPaymentMethod = {
          code: testPaymentMethods[elem].code,
          name: testPaymentMethods[elem].name,
        };
        break;
      }
    }

    req.query.pair = getCur(toCurr) + getCur(fromCurr);
    delete req.query.cur_from;
    delete req.query.cur_to;
    redirectRequired = true;
  }

  if (req.query.lang && validLanguages.includes(langInParam)) {
    delete req.query["lang"];
    redirectRequired = true;
  }

  if (redirectRequired) {
    // Redirect to testing url if testPaymentMethod is not undefined
    if (testPaymentMethod) {
      const testUrl =
        process.env.NODE_ENV !== "production"
          ? "https://sapi.n.exchange"
          : "https://api.n.exchange";

      res.redirect(
        `${testUrl}/en/orders/buy-${toCurr.toLowerCase()}-with-${getCur(
          fromCurr
        ).toLowerCase()}/${getCur(toCurr).toUpperCase()}${getCur(
          fromCurr
        ).toUpperCase()}/?payment_method=${testPaymentMethod.name.toLowerCase()}`
      );
      return;
    }

    const redirectUrl = url.format({
      pathname: urlPath === "/" ? `/${lang}` : `/${lang}${urlPath}`,
      query: req.query,
    });

    res.redirect(redirectUrl);
    return;
  }

  res.sendFile(path.resolve(process.env.NEXCHANGE_ROOT, "index.html"));
};

// Convert order ids to uppercase
app.get("/order/:orderId", [orderUppercase, generalHandler]);

// For all other cases
app.get("*", generalHandler);

app.listen(3000, () =>
  console.log("Nexchange Frontend Proxy is listening on port 3000!")
);
