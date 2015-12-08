exports.add_extentions = function(app){
    app.request.req_param = function(param_name){
        return this.body[param_name] || this.query[param_name];
    };
};

//exports.request_extentions = function(req, res, next) {
//    console.log("set ext_funcs", req.req_param);
//    req.req_param = function(param_name){
//        return req.query[param_name] || req.body[param_name];
//    };
//    next();
//};