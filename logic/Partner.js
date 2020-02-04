class Partner {

  constructor(name, referrer) {
    this.name = name;
    this.referrer = referrer;
    this.redirectRequired = false;
    this.currencies = ['EUR','GBP','JPY','RUB','USD','BCH','BTC','DASH','DOGE','LTC','ZEC']
  }

  getCur(qParam) {
    return qParam.toUpperCase().substr(-3);
  }

  matchCurrency(str) {
    str = str.toUpperCase();
    for (var i=0; i<this.currencies.length; i++) {
      if (str.indexOf(currencies[i] > -1)) {
        return currencies[i];
      }
    }
    return false;
  }

  isReferrer (referrer) {
    return (referrer.indexOf(this.referrer) != -1);
  }

  getPair (params, referer) {
    return '';
  }

  getLang (params) {
    return '';
  }

  getMethod (params) {
    return '';
  }

  getName() {
    return this.name;
  }

  isCard (params) {
    return false;
  }

  getReferrerCode (params) {
    return '';
  }
}

module.exports = Partner;