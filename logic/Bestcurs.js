const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('Bestcurs', 'bestcurs.org')
  }

  isCard (params) {
    return (referrer.indexOf('Card') > -1);
  }

  getReferrerCode (params) {
    return params.r;
  }

  isCard (params) {
    return (referrer.indexOf('Card') > -1);
  }

}

module.exports = Bestchange;