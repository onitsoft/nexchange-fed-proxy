const Partner = require('./Partner.js')

class Emon extends Partner {

  constructor() {
    super('E-mon', 'e-mon.ru')
  }

  getCur(qParam) {
    return qParam.toUpperCase().substr(-3);
  }

  getPair (params, referer) {

    let path = referer.split('/');

    let pairA = this.matchCurrency(path[path.length-2]);
    let pairB = this.matchCurrency(path[path.length-1]);

    if (pairA !== false && pairB !== false) {
      this.redirectRequired = true;
      return pairB+pairA;
    }

    return '';
  }

  getReferrerCode (params) {
    return params.rid;
  }

  isCard (referrer) {
    return (referrer.indexOf('CARD') > -1);
  }

}

module.exports = Emon;