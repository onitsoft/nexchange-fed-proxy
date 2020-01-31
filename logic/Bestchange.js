import 'Partner'

class Bestchange extends Partner {

  constructor() {
    super('Bestchange', 'bestchange.ru')
  }

  function getCur(qParam) {
    return qParam.toUpperCase().substr(-3);
  }

  getPair (params) {
    let pair
    if (params.cur_to && params.cur_from) {
      pair = getCur(params.cur_to) + getCur(params.cur_from);
    }
    else {
      pair = 'USDBTC';
    }
    return pair;
  }

  getLang (params) {
    return 'en';
  }

  getMethod (params) {
    return 'VISA';
  }
}