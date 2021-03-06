var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.set('env', process.env.NODE_ENV || "local");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('tiny'));
express.app = app; //use req.app

require('./routes/ext_funcs')(app);

var users = require('./routes/users');
var tech = require('./routes/tech');

app.use('/users', users);
app.use('/tech', tech);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.custom_stack = req.url;
  next(err);
});

app.use(function (err, req, res, next) {
  console.log(err.custom_stack || err.stack);
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({error: err.message});
});

if (app.get('env') != 'local') {
  require('fs').readFile('REVISION', function (err, data) {
    if (err) console.log("rev_error=", err.message);
    else console.log("rev=", data.toString().trim());
  });
}

module.exports = app;
