define(["app_params", "jquery"],
function(AppParams, $){
    var MAX_REPEAT = 5;
    var queue = [];

    var ServerQueue = function(){
        this.server_url = AppParams.api_config.server_url;
        this.repeat = 0;
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
        this.repeat = 0;
        this.send_post();
    };

    ServerQueue.prototype.send_post = function () {
        var on_success = function(data){
            this.cur_params.cb({result: data, cmd: this.cur_params});
            this.wait_answer = false;
            this.try_process();
        }.bind(this);

        var on_error = function(err){
            //{readyState: 4, responseText: "{"error":"user_id error!"}", responseJSON: Object, status: 500, statusText: "Internal Server Error"}
            //{readyState: 4, responseText: "{"error":"Not Found"}", responseJSON: Object, status: 404, statusText: "Not Found"}
            console.log("error", err, this.cur_params);
            this.repeat += 1;
            if (this.repeat > MAX_REPEAT){
                this.cur_params.cb({error: err, cmd: this.cur_params});
            }
            else{
                setTimeout(this.send_post.bind(this), 2000);
            }
        }.bind(this);

        $.post(this.server_url + "/users/" + this.cur_params.cmd, this.cur_params.params)
            .done(on_success)
            .fail(on_error);
    };

    return new ServerQueue();
});