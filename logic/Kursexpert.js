const Partner = require('./Partner.js')

//Haven't found n.exchange reference on this site.
class Kursexpert extends Partner {

  constructor() {
    super('Kurs Expert', 'kurs.expert')
  }

  isCard (params) {
    return (referrer.indexOf('Card') > -1);
  }

  getReferrerCode (params) {
    return params.rid;
  }

}

module.exports = Kursexpert;