var express = require('express');

module.exports = function() {
    var path = "../configs/envs/" + express.app.get('env');
    console.log("params_file=", path);

    var keys_path = "../../shared/api_keys.js";
    console.log("keys_file=", keys_path);

    var env_params = require(path);

    var keys = require(keys_path);
    env_params.api_secret = keys.secret_key;
    env_params.app_id = keys.app_id;

    return env_params;
}();