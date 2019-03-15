const express = require('express');
const path = require('path');

const app = express();


app.use('/ico', express.static(path.resolve(__dirname, 'ico')));
app.use(express.static(path.resolve(__dirname, 'nexchange')));

function getCur(qParam) {
    return qParam.toUpperCase().substr(-3);
}

app.get('/ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'ico', 'index.html'));
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
  }

  res.sendFile(path.resolve(__dirname, 'nexchange', 'index.html'));

});

app.listen(3000, () => console.log('Example app listening on port 3000!'));


