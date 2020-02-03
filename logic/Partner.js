class Partner {

  constructor(name, referrer) {
    this.name = name;
    this.referrer = referrer;
    this.redirectRequired = false;
  }

  isReferrer (referrer) {
    return (referrer.indexOf(this.referrer) != -1);
  }

  getPair (params) {
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