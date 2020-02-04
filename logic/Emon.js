const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('E-mon', 'e-mon.ru')
  }

  isCard (params) {
    return (referrer.indexOf('Card') > -1);
  }

  getReferrerCode (params) {
    return params.rid;
  }

  isCard (params) {
    return (referrer.indexOf('CARD') > -1);
  }

}

module.exports = Bestchange;