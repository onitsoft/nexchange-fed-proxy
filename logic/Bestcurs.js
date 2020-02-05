const Partner = require('./Partner.js')

class Bestcurs extends Partner {

  constructor() {
    super('Bestcurs', 'bestcurs.org')
  }

  getPair (params, referer) {

    let path = referer.split('/');
    let pairArr = path[path.length-1].split('-');
    let pairA = this.matchCurrency(pairArr[0]);
    let pairB = this.matchCurrency(pairArr[1]);
    if (pairA !== false && pairB !== false) {
      return pairB+pairA;
    }

    return '';
  }

  isCard (params) {
    return (referrer.indexOf('Card') > -1);
  }

  getReferrerCode (params) {
    return params.r;
  }

  isCard (params) {
    return (referrer.indexOf('Card') > -1);
  }

}

module.exports = Bestcurs;