define(['common/server_queue', "app_params"],
function(ServerQueue, AppParams){
    var RequestProcessor = function(){ };

    RequestProcessor.prototype.process = function(cmd_params){
        var me = AppParams.scene.api.me;
        var request_params = {
            cb: this.on_response,
            cmd: cmd_params.cmd,
            params: { user_id: me.id }
        };
        if (cmd_params.cmd == 'first_data'){
            request_params.params.user_fname = me.first_name;
            request_params.params.user_lname = me.last_name;
        }
        ServerQueue.add_request(request_params);
    };

    RequestProcessor.prototype.on_response = function(data){
        if (data.error)
            AppParams.scene.on_error();
        else
            AppParams.scene.on_request_complete(data);
    };

    return new RequestProcessor();
});