define(["app_params", "jquery"],
function(AppParams, $){
    var ServerQueue = function(){
        this.server_url = AppParams.api_config.server_url
    };

    ServerQueue.prototype.add_request = function(params){
        console.log("add_request:", params);
        this.send_post();
    };

    ServerQueue.prototype.send_post = function () {
        $.post(this.server_url + "/users?par1=val1", {par2: "val2"}, function(data){
            console.log("req_data", data);
        }, "text");
    };

    return new ServerQueue();
});