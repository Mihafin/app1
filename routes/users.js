var express = require('express');
var router = express.Router();
var models  = require('../models');

//var requirejs = require('requirejs');
//var app_params = requirejs('../public/js/app/app_params');

router.all('/first_data', function(req, res, next) {

  models.User
      .findById(req.req_param('user_id'))
      .then(
        function(users) {
          res.json({cmd: "first_data", rn: 0, users: users});
        },
        function(err){
          next(err);
        }
      );
});

module.exports = router;


//var debug = require('debug')('app:server');
/* GET users listing. */
//console.log("req.body=", req.body, "req.query=", req.query);
//or req.param('name')
//debug("debug in users /");