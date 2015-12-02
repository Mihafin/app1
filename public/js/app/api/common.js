define(["app_params"], function(AppParams){
    var CommonApi = function (on_init, api_prefix) {
        this.on_init = on_init;
        this.api_params = AppParams.query_params;
        this.user_id = this.get_user_id();
        if (AppParams.api_config.valid_user_ids){
            if (AppParams.api_config.valid_user_ids.indexOf(this.user_id) == -1)
                throw "unavailable user!"
        }
        this.api_prefix = api_prefix;
    };

    CommonApi.prototype = Object.create(Object.prototype);
    CommonApi.prototype.constructor = CommonApi;

    CommonApi.prototype.on_api_init = function(){
        console.log(this.api_prefix, "api initialization succeeded");
        this.on_init.call(null);
    };

    CommonApi.prototype.on_api_init_error = function(){
        console.log("api initialization failed");
    };

    CommonApi.prototype.load_profiles = function(profiles, cb){
        console.log("load_profiles call with", profiles, cb);
    };

    CommonApi.prototype.get_user_id = function(){
        return this.api_params["viewer_id"];
    };

    return CommonApi;
});