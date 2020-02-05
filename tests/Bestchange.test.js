const request = require('supertest');
const app = require('../app')

describe('Lang test', () => {
  it('Should let lang param through', () => {
      return request(app)
              .get("/")
              .query({ lang: 'RU' })
              .set('Referer', 'https://bestchange.ru')
              .expect('Location', "/?lang=ru")
              .expect(302);
  })
})

describe('Pair test', () => {
  it('Should process currency pair', () => {
      return request(app)
              .get("/")
              .query({ cur_from: 'BTC', cur_to: 'USD' })
              .set('Referer', 'https://bestchange.ru')
              .expect('Location', "/?pair=USDBTC")
              .expect(302);
  })
})

describe('Card test', () => {
  it('Should redirect to the old site in case of card payment.', () => {
      return request(app)
              .get("/")
              .query({ cur_from: 'BTC', cur_to: 'USD' })
              .set('Referer', 'https://www.bestchange.ru/visa-mastercard-usd-to-bitcoin.html')
              .expect(function(res) {
                if (res.header.location.indexOf(process.env.OLD_SITE_URL) == -1) {
                  throw new Error("Location is not OLD SITE URL");
                }
              })
              .expect(302);
  })
})

