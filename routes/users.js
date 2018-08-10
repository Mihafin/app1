var express = require('express');
var router = express.Router();
var models  = require('../models');
var auth = require('./auth');
var user = require('./user');

router.use(auth.check);

router.use(function(req, res, next){
    console.log("users: find or create!");
    var user_id = req.req_param('user_id');
    var user_name = req.req_param('user_fname');
    var user_surname = req.req_param('user_lname');
    models.User.with_user(user_id, user_name, user_surname, function(user){
        console.log("with_user", user);
        req.user = user;
        next();
    }, next);
});

router.all('/:cmd', function(req, res, next) {
    user.process(req.user, req.params.cmd, next);
    next();
});

router.use(function(req, res, next){
    console.log("users: save and response!");
    req.user.save()
        .then(function(user){
            var result = user.json_data();
            console.log("req.path=", req.path);
            result.cmd = req.path;
            res.json(result);
        })
        .catch(function(error) {
            next.call(null, error);
        });
});

module.exports = router;


//var requirejs = require('requirejs');
//var app_params = requirejs('../public/js/app/app_params');
//var debug = require('debug')('app:server');
/* GET users listing. */
//console.log("req.body=", req.body, "req.query=", req.query);
//or req.param('name')
//debug("debug in users /");