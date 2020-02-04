const Partner = require('./Partner.js')

class Bestchange extends Partner {

  constructor() {
    super('E-mon', 'e-mon.ru')
  }

  getCur(qParam) {
    return qParam.toUpperCase().substr(-3);
  }

  getPair (params, referer) {

    let path = referer.split('/');

    let pairA = this.matchCurrency(path[path.length-2]);
    let pairB = this.matchCurrency(path[path.length-2]);

    if (pairA !== false && pairB !== false) {
      return pairB+pairA;
    }

    return '';
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