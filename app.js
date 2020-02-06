const NEXCHANGE_ROOT = process.env.NEXCHANGE_ROOT;
const ICO_ROOT = process.env.ICO_ROOT;
const OLD_SITE_URL = process.env.OLD_SITE_URL;
const DEVENV = process.env.DEVENV;

const express = require('express');
const path = require('path');
const helmet = require('helmet')
const referrerSwitch = require('./logic/Switch.js')

const app = express();

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet())

//Exclude index.html from static serving
app.use('/ico', express.static(path.resolve(ICO_ROOT)));
app.use(express.static(path.resolve(NEXCHANGE_ROOT),{index: false}));

function getCur(qParam) {
    return qParam.toUpperCase().substr(-3);
}

app.get('/ico', (req, res) => {
  res.sendFile(path.resolve(ICO_ROOT, 'index.html'));
});

// Handling lowercase order Ids
var orderUppercase = (req, res, next) => {

  if (req.params.orderId) {
    const orderIdUP =  req.params.orderId.toUpperCase()
    if (req.params.orderId != orderIdUP) {
      res.redirect('/order/' + orderIdUP)
    }
    else {
      next()
    }
  }
};

// General handler for the rest of the URLs
var generalHandler = (req, res) => {

  if (req.header('Referer')) {

    let rHeader = req.header('Referer');
    //If traffic comes from partner
    if (rHeader.indexOf('n.exchange') == -1) {
      try {

        let rSwitch = new referrerSwitch(rHeader);
        let referrer = rSwitch.getMatchingReferrer();

        let params = {'lang': referrer.getLang(req.query),
                    'pair': referrer.getPair(req.query, rHeader)};

        params = Object.keys(params).filter(key => params[key] !== '' ).map(key => key + '=' + params[key]).join('&');

        if (referrer.isCard(rHeader)) {
          res.redirect(OLD_SITE_URL + '?' + params);
          return;
        }
        else if (referrer.redirectRequired) {
          res.redirect(req.path + '?' + params);
          return;
        }
      }
      catch(e) {
        if (DEVENV) {
          console.log(e);
        }
      }
    }
  }

  res.sendFile(path.resolve(process.env.NEXCHANGE_ROOT, 'index.html'));
};

// Convert order ids to uppercase
app.get('/order/:orderId', [orderUppercase, generalHandler]
);

// For all other cases
app.get('*', generalHandler);

module.exports = app;

