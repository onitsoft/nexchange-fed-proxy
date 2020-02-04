const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('Kurs Expert', 'kurs.expert')
  }

  isCard (params) {
    return (referrer.indexOf('Card') > -1);
  }

  getReferrerCode (params) {
    return params.rid;
  }

}

module.exports = Bestchange;