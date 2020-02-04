const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('Exchangesumo', 'exchangesumo.com')
  }

  isCard (params) {
    return (referrer.indexOf('Card') > -1);
  }

  getReferrerCode (params) {
    return params.ref;
  }

}

module.exports = Bestchange;