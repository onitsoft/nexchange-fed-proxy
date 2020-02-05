const Partner = require('./Partner.js')

//Haven't found n.exchange reference on this site.
class Kursexpert extends Partner {

  constructor() {
    super('Kurs Expert', 'kurs.expert')
  }


  getReferrerCode (params) {
    return params.ref;
  }

}

module.exports = Kursexpert;