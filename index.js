const express = require('express');
const path = require('path');
const helmet = require('helmet')

const app = express();

const NEXCHANGE_ROOT = process.env.NEXCHANGE_ROOT
const ICO_ROOT = process.env.ICO_ROOT

function getCur(qParam) {
  return qParam.toUpperCase().substr(-3);
}

// Handling lowercase order Ids
const orderUppercase = (req, res, next) => {
  if (req.params.orderId) {
    const orderIdUP = req.params.orderId.toUpperCase()
    if (req.params.orderId != orderIdUP) {
      res.redirect('/order/' + orderIdUP)
    } else {
      next()
    }
  }
};

// General handler for the rest of the URLs
const generalHandler = (req, res) => {

  let redirectRequired = false;
  let params = {};
  if (req.query.cur_from && req.query.cur_to) {
    redirectRequired = true;
    req.query.pair = getCur(req.query.cur_to) + getCur(req.query.cur_from);
    delete req.query['cur_to'];
    delete req.query['cur_from'];
  }

  if (req.query.lang && req.query.lang !== req.query.lang.toLowerCase()) {
    redirectRequired = true;
    req.query.lang = req.query.lang.toLowerCase()
  }

  if (redirectRequired) {
    params = req.query;
    params = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    res.redirect(req.path + '?' + params);
    return;
  }

  res.sendFile(path.resolve(NEXCHANGE_ROOT, 'index.html'));
};

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// ### Assets ###
app.use(express.static(path.resolve(NEXCHANGE_ROOT), {index: false}));
app.use('/blog-asset', express.static(path.resolve(ICO_ROOT, 'blog-asset'), {index: false}));


// ### Blog routes ###
app.get('/blog', (req, res) => {
  res.sendFile(path.resolve(ICO_ROOT,'blog/index.html'));
});

app.get('/blog/:slug', function (req, res) {
  res.sendFile(path.resolve(ICO_ROOT, 'blog', req.params.slug, 'index.html'));
});

// blog error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).sendFile(path.resolve(ICO_ROOT, '404/index.html'));
});


// ### n.Exchange routes ###
// Convert order ids to uppercase
app.get('/order/:orderId', [orderUppercase, generalHandler]
);

// For all other cases
app.get('*', generalHandler);


app.listen(3000, () => console.log('Nexchange Frontend Proxy is listening on port 3000!'));



