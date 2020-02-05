const Partner = require('./Partner.js')

class Okchanger extends Partner {

  constructor() {
    super('Okchanger', 'okchanger.com')
  }

  getPair (params, referer) {

    let path = referer.split('/');
    let pairArr = path[path.length-1].split('to');
    let pairA = this.matchCurrency(pairArr[0]);
    let pairB = this.matchCurrency(pairArr[1]);
    if (pairA !== false && pairB !== false) {
      this.redirectRequired = true;
      return pairB+pairA;
    }

    return '';
    }

  isCard (referrer) {
    return (referrer.indexOf('VISAMASTERCARD') > -1);
  }

  getReferrerCode (params) {
    return params.rid;
  }
}

module.exports = Okchanger;