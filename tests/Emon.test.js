const request = require('supertest');
const app = require('../app')

describe('Pair test', () => {
  it('Should process currency pair, redirect', () => {
      return request(app)
              .get("/")
              .set('Referer', 'https://e-mon.ru/exchange/BTC/LTC')
              .expect('Location', "/?pair=LTCBTC")
              .expect(302);
  })
})

describe('Card test', () => {
  it('Should redirect to the old site in case of card payment.', () => {
      return request(app)
              .get("/")
              .set('Referer', 'https://e-mon.ru/exchange/CARDUSD/LTC')
              .expect(function(res) {
                if (res.header.location.indexOf(process.env.OLD_SITE_URL) == -1) {
                  throw new Error("Location is not OLD SITE URL");
                }
              })
              .expect(302);
  })
})

