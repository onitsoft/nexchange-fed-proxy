const Partner = require('./Partner.js')

class Exchangesumo extends Partner {

  constructor() {
    super('Exchangesumo', 'exchangesumo.com')
  }

  getPair (params, referer) {

    let path = referer.split('/');
    let pairArr = path[path.length-2].split('-');
    let pairA = this.matchCurrency(pairArr[0]);
    let pairB = this.matchCurrency(pairArr[1]);
    if (pairA !== false && pairB !== false) {
      this.redirectRequired = true;
      return pairB+pairA;
    }
    return '';
  }

  isCard (referrer) {
    return (referrer.indexOf('Card') > -1);
  }

  getReferrerCode (params) {
    return params.refId;
  }

}

module.exports = Exchangesumo;