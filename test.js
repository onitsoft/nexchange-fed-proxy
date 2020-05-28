const chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const requestUrl = "http://localhost:3000";
const request = chai.request(requestUrl);

describe("internal redirects", () => {
  it("redirect with lang", () => {
    request.get("/").end((err, res) => {
      expect(res).to.redirectTo(`${requestUrl}/en`, 200);
    });
  });

  it("redirect when lang in url param", () => {
    request.get("/?lang=ru").end((err, res) => {
      expect(res).to.have.header("Set-Cookie", "i18next=ru");
      expect(res).to.redirectTo(`${requestUrl}/ru`, 200);
    });
  });

  it("order page uppercase redirect", () => {
    request.get("/order/oqmhdw").end((err, res) => {
      expect(res).to.redirectTo(`${requestUrl}/en/order/OQMHDW`, 200);
    });
  });
});

describe("partner card redirect", () => {
  it("bestchange card usd to btc", () => {
    request
      .get("/?ref=RBWW77UMGTU&lang=RU&cur_from=CARDUSD&cur_to=BTC")
      .end((err, res) => {
        expect(res).to.redirectTo(
          `${requestUrl}/ru?ref=RBWW77UMGTU&pair=BTCUSD`,
          200
        );
      });
  });

  it("bestchange advcash redirect", () => {
    request.get("/?cur_from=ADVCUSD&cur_to=BTC").end((err, res) => {
      expect(res).to.redirectTo(
        "https://sapi.n.exchange/en/orders/buy-btc-with-usd/?payment_method=advcash",
        200
      );
    });
  });

  it("bestchange payeer redirect", () => {
    request.get("/?cur_from=PRUSD&cur_to=BTC").end((err, res) => {
      expect(res).to.redirectTo(
        "https://sapi.n.exchange/en/orders/buy-btc-with-usd/?payment_method=payeer",
        200
      );
    });
  });

  it("bestchange sepa redirect", () => {
    request.get("/?cur_from=SEPAUSD&cur_to=BTC").end((err, res) => {
      expect(res).to.redirectTo(
        "https://sapi.n.exchange/en/orders/buy-btc-with-usd/?payment_method=sepa",
        200
      );
    });
  });
});
