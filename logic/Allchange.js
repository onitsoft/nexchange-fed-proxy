const Partner = require('./Partner.js')

class Allchange extends Partner {

  constructor() {
    super('Allchange', 'allchange.org')
  }

  getPair (params, referer) {
    let pair
    let path = referer.split('/')
    let direction = path[path.length-1]
    if (direction.indexOf('direction') > -1) {
      let dirArr = direction.split('=')
      let pairArr =  dirArr[dirArr.length-1].split('_')
      if (pairA  && pairB ) {
        return pairB+pairA;
      }
    }
    return '';
  }

  isCard (params) {
    return (referrer.indexOf('CARD') > -1);
  }

  getReferrerCode (params) {
    return params.ref;
  }

}

module.exports = Bestchange;