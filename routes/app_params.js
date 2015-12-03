var express = require('express');

module.exports = function() {
    var path = "../configs/envs/" + express.app.get('env');
    console.log("params_file=", path);
    return require(path);
}();