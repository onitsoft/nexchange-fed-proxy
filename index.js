const express = require("express");
const path = require("path");
const helmet = require("helmet");
const url = require("url");

const app = express();
const NEXCHANGE_ROOT = process.env.NEXCHANGE_ROOT;
const ICO_ROOT = process.env.ICO_ROOT;

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
    res.redirect(`/${lang}/order/${orderIdUP}`);
  } else {
    next();
  }
};

// General handler for the rest of the URLs
const generalHandler = (req, res) => {
  let host = undefined;
  let urlPath = req.path;
  const langInPath = urlPath.split("/")[1];
  const langInParam = req.query.lang ? req.query.lang.toLowerCase() : undefined;
  let lang = langInPath || langInParam || "en";
  const fromCurr = req.query.cur_from;
  const toCurr = req.query.cur_to;
  const validLanguages = ["en", "de", "ru"];

  let redirectRequired = false;

  // Dont add language path in url, if its not n.exchange
  if (
    !req.headers.host.includes("n.exchange") &&
    !req.headers.host.includes("localhost")
  )
    lang = "";

  if (validLanguages.includes(langInPath)) {
    res.header("Set-Cookie", `i18next=${lang}`);

    urlPath = urlPath.substr(lang.length + 1);

    // If lang is in path then ignore lang in param
    delete req.query["lang"];
  }

  if (fromCurr && toCurr) {
    const fromCurrType = fromCurr.substr(0, fromCurr.length - 3);

    if (["ADVC", "PR"].includes(fromCurrType)) host = "s.api.n.exchange";

    console.log(fromCurrType);
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
    const redirectUrl = url.format({
      pathname: urlPath === "/" ? `/${lang}` : `/${lang}${urlPath}`,
      query: req.query,
    });

    if (host) {
      res.redirect(`https://${host}${redirectUrl}`);
      return;
    }

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
