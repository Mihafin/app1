var express = require('express');
var router = express.Router();
var fs = require('fs');

router.all('/rev', function(req, res, next) {
  fs.readFile('REVISION', function (err, data) {
    res.set('Content-Type', 'text/plain');
    if (err) res.send(err.message);
    else res.send(data.toString());
  });
});

module.exports = router;
