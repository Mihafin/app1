var crypto = require('crypto');
var app_params = require('../app_params');

module.exports = function() {
    console.log("Init vk api");

    function generate_auth_key(user_id){
        //console.log("str=", app_params.app_id + '_' + user_id + '_' + app_params.api_secret);
        return crypto.createHash('md5')
            .update(app_params.app_id + '_' + user_id + '_' + app_params.api_secret)
            .digest('hex');
    }

    return {
        is_auth_success: function(req){
            var client_key = req.body.auth_key;
            var server_key = generate_auth_key(req.body.user_id);
            //console.log("client_key=", client_key, "server_key=", server_key, "req=", req);
            return client_key == server_key;
        }
    };
}();