const bestchange = require('./Bestchange.js')
const okchanger = require('./Okchanger.js')
const exchangesumo = require('./Exchangesumo.js')

class Switch {

    constructor (referrer) {
      this.sites = [new bestchange(), new okchanger(), new exchangesumo()];
      this.referrer = referrer;
    }

    getMatchingReferrer () {
      for (var i=0; i<this.sites.length; i++) {
        if (this.sites[i].isReferrer(this.referrer)) {
          return this.sites[i];
        }
      }
    }
}

module.exports = Switch;