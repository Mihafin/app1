var express = require('express');

module.exports = function() {
    var env = express.app.get('env');
    console.log("API INIT", env, express.app);

    return {
        test: function() {
            console.log("test==", env, express.app.get('env'));
        }
    };
}();