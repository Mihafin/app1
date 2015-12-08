module.exports = function() {
    console.log("Init local api");
    return {
        is_auth_success: function(req){
            return true;
        }
    };
}();