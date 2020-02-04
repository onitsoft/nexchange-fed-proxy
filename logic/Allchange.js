const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('Allchange', 'allchange.org')
  }

  getCur(qParam) {
    return qParam.toUpperCase().substr(-3);
  }

  getPair (params) {
    let pair
    if (params.to && params.from) {
      pair = getCur(params.cur_to) + getCur(params.cur_from);
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