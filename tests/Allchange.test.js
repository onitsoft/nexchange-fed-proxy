const request = require('supertest');
const app = require('../app')

describe('Pair test', () => {
  it('Should process currency pair, redirect', () => {
      return request(app)
              .get("/")
              .set('Referer', 'allchange.org/?direction=BTC_USD')
              .expect('Location', "/?pair=USDBTC")
              .expect(302);
  })
})

describe('Card test', () => {
  it('Should redirect to the old site in case of card payment.', () => {
      return request(app)
              .get("/")
              .set('Referer', 'allchange.org/?direction=CARDUSD_LTC')
              .expect(function(res) {
                if (res.header.location.indexOf(process.env.OLD_SITE_URL) == -1) {
                  throw new Error("Location is not OLD SITE URL");
                }
              })
              .expect(302);
  })
})

