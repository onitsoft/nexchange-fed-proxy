const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('Exchangesumo', 'exchangesumo.com')
  }

  getCur(qParam) {
    return qParam.toUpperCase().substr(-3);
  }

  getPair (params) {
    let pair
    if (params.cur_to && params.cur_from) {
      pair = getCur(params.cur_to) + getCur(params.cur_from);
      this.redirectRequired = true;
    }
    else {
      pair = '';
    }
    return pair;
  }

  getLang (params) {
    let lang
    if (params.lang && params.lang !== params.lang.toLowerCase()) {
      lang = params.lang.toLowerCase()
      this.redirectRequired = true;
    }
    else {
      lang = '';
    }
    return lang;
  }

  isCard (params) {
    return (referrer.indexOf('Card') > -1);
  }

  getReferrerCode (params) {
    return params.rid;
  }

}

module.exports = Bestchange;