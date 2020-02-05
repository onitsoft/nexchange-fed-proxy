const Partner = require('./Partner.js')

class Allchange extends Partner {

  constructor() {
    super('Allchange', 'allchange.org')
  }

  getPair (params, referer) {

    let path = referer.split('/');
    let direction = path[path.length-1];
    if (direction.indexOf('direction') > -1) {
      let dirArr = direction.split('=');
      let pairArr =  dirArr[dirArr.length-1].split('_');
      let pairA = this.matchCurrency(pairArr[0]);
      let pairB = this.matchCurrency(pairArr[1]);
      if (pairA && pairB) {
        this.redirectRequired = true;
        return pairB+pairA;
      }
    }

    return '';
  }

  isCard (referrer) {
    return (referrer.indexOf('CARD') > -1);
  }

  getReferrerCode (params) {
    return params.ref;
  }

}

module.exports = Allchange;