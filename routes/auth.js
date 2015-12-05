var app_params = require('./app_params');
var api = require('./apis/' + app_params.api);

exports.check = function(req, res, next) {
    console.log("check auth!", req);
    if (api.is_auth_success(req)){
        next();
    }
    else{
        var err = new Error('Not auth');
        err.status = 600;
        next(err);
    }
};