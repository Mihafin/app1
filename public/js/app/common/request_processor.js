define(['common/server_queue', "app_params"],
function(ServerQueue, AppParams){
    var RequestProcessor = function(){ };

    RequestProcessor.prototype.process = function(cmd_params){
        var request_params = {
            cb: this.on_response,
            cmd: cmd_params.cmd,
            params: {
                user_id: AppParams.scene.api.me.id,
                user_fname: AppParams.scene.api.me.first_name,
                user_lname: AppParams.scene.api.me.last_name
            }
        };
        ServerQueue.add_request(request_params);
    };

    RequestProcessor.prototype.on_response = function(data){
        AppParams.scene.on_request_complete(data);
    };

    return new RequestProcessor();
});