const express = require('express');
const path = require('path');

const app = express();
const NEXCHANGE_ROOT = process.env.NEXCHANGE_ROOT
const ICO_ROOT = process.env.ICO_ROOT

app.use('/ico', express.static(path.resolve(ICO_ROOT)));
app.use(express.static(path.resolve(NEXCHANGE_ROOT), {index: false}));

function getCur(qParam) {
    return qParam.toUpperCase().substr(-3);
}

app.get('/ico', (req, res) => {
  res.sendFile(path.resolve(ICO_ROOT, 'index.html'));
});

app.get('*', (req, res) => {
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
    req.query.lang =  req.query.lang.toLowerCase()
  }

  if (redirectRequired) {
    params = req.query;
    params = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    res.redirect(req.path + '?' + params)
    return
  }

  res.sendFile(path.resolve(process.env.NEXCHANGE_ROOT, 'index.html'));

});


app.listen(3000, () => console.log('Nexchange Frontend Proxy is listening on port 3000!'));


