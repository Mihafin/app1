define(["app_params", "jquery"],
function(AppParams, $){
    var queue = [];

    var ServerQueue = function(){
        this.server_url = AppParams.api_config.server_url
    };

    ServerQueue.prototype.add_request = function(params){
        console.log("add_request:", params);
        queue.push(params);
        this.try_process();
    };

    ServerQueue.prototype.try_process = function(){
        if (this.wait_answer || queue.length == 0) return;
        this.wait_answer = true;

        this.cur_params = queue.shift();
        this.send_post();
    };

    ServerQueue.prototype.send_post = function () {
        $.post(this.server_url + "/users/" + this.cur_params.cmd, this.cur_params.params, function(data){
            this.cur_params.cb(data);
            this.wait_answer = false;
            this.try_process();
        }.bind(this), "text");
    };

    return new ServerQueue();
});