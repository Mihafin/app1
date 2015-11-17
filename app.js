var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var tech = require('./routes/tech');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(logger('tiny'));
app.use('/users', users);
app.use('/tech', tech);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.custom_stack = req.url;
  next(err);
});

console.log("env=", app.get('env'));

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: err.message, stack: err.custom_stack || err.stack});
  });
}
else{
  require('fs').readFile('REVISION', function (err, data) {
    if (err) console.log("rev_error=", err.message);
    else console.log("rev=", data.toString().trim());
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({error: err.message});
});

module.exports = app;
