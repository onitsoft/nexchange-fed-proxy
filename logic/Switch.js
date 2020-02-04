const bestchange = require('./Bestchange.js')
const okchanger = require('./Okchanger.js')
const exchangesumo = require('./Exchangesumo.js')
const allchange = require('./Allchange.js')
const bestcurs = require('./Bestcurs.js')
const emon = require('./Emon.js')
const kursexpert = require('./Kursexpert.js')
const partner = require('./Partner.js')

class Switch {

    constructor (referrer) {
      this.sites = [new bestchange(), new okchanger(), new exchangesumo(), new allchange(), new bestcurs(), new emon(), new kursexpert()];
      this.referrer = referrer;
    }

    getMatchingReferrer () {
      for (var i=0; i<this.sites.length; i++) {
        if (this.sites[i].isReferrer(this.referrer)) {
          return this.sites[i];
        }
      }
      return new Partner('Unknown', this.referrer);
    }
}

module.exports = Switch;