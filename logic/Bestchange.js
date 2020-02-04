const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('Bestchange', 'bestchange.ru')
  }

  getPair (params, referer) {
    let pair
    if (params.cur_to && params.cur_from) {
      pair = this.getCur(params.cur_to) + this.getCur(params.cur_from);
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

  isCard (referrer) {
    return (referrer.indexOf('visa-mastercard') > -1);
  }

  getReferrerCode (params) {
    return params.ref;
  }
}

module.exports = Bestchange;