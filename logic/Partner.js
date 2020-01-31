class Partner {
//  const name;
//  const pay_methods = {}
//  const referral;

  var redirectRequired = false

  constructor(name, referral) {
    this.name = name;
    this.referral = referral;
  }

  getPair (params) {
    return 'USDBTC';
  }

  getLang (params) {
    return 'en';
  }

  getMethod (params) {
    return 'VISA';
  }


}