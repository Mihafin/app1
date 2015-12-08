module.exports = function(app){
    app.request.req_param = function(param_name){
        return this.body[param_name] || this.query[param_name];
    };
};