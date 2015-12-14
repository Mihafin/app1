var express = require('express');
var router = express.Router();
var models  = require('../models');

//var requirejs = require('requirejs');
//var app_params = requirejs('../public/js/app/app_params');

router.all('/test', function(req, res, next) {

});

router.all('/first_data', function(req, res, next) {
    var user_id = req.req_param('user_id');
    var user_name = req.req_param('user_fname');
    var user_surname = req.req_param('user_lname');
    models.User.with_user(user_id, user_name, user_surname, function(user){
        user.save()
            .then(function(user){
                res.json(user.json_data());
            })
            .catch(function(error) {
                next.call(null, error);
            });
    }, next);
});

module.exports = router;


//var debug = require('debug')('app:server');
/* GET users listing. */
//console.log("req.body=", req.body, "req.query=", req.query);
//or req.param('name')
//debug("debug in users /");