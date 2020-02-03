const bestchange = require('./Bestchange.js')

class Switch {

    constructor (referrer) {
      this.sites = [new bestchange()];
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