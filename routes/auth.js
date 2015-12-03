var app_params = require('./app_params');

exports.check = function(req, res, next) {
    console.log("check auth!", app_params.auth);

    var api = require('./api');
    api.test();

    if (!app_params.auth){
        next();
    }
    else{



        var err = new Error('Not auth');
        err.status = 600;
        next(err);
    }
};