const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('Allchange', 'allchange.org')
  }

  getPair (params, referer) {
    let pair
    if (params.to && params.from) {
      pair = this.getCur(params.to) + this.getCur(params.from);
      this.redirectRequired = true;
    }
    else {
      pair = '';
    }
    return pair;
  }

  isCard (params) {
    return (referrer.indexOf('CARD') > -1);
  }

  getReferrerCode (params) {
    return params.id;
  }

}

module.exports = Bestchange;