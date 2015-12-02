define(["app_params"], function(AppParams){
    return function (on_init) {
        if (AppParams.query_params['api_id']){
            var app_id = AppParams.query_params['api_id'];
            requirejs(["api/vk", "configs/vk"+app_id], function (ApiClass, api_config){
                AppParams.api_config = api_config;
                on_init(ApiClass);
            })
        }
        else{
            requirejs(["api/local", "configs/local"], function (ApiClass, api_config){
                AppParams.api_config = api_config;
                on_init(ApiClass);
            })
        }
    };
});