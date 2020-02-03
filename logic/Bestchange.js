const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('Bestchange', 'bestchange.ru')
//    super('Bestchange', 'localhost')
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

  getMethod (params) {
    return 'VISA';
  }
}

module.exports = Bestchange;