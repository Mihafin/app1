module.exports = function (shipit){
    var readline = require('readline');
    var cur_env = shipit.environment;
    var server_path = shipit.config.deployTo + '/current/';

    shipit.on('published', function(){
        shipit.remoteCopy("public/js/app/configs/*.*", server_path + "public/js/app/configs/");
        shipit.remoteCopy("configs/db/database.json", server_path + "configs/db/database.json");
        console.log("configs uploaded");
    });

    shipit.task('test', function(){
        console.log("server_path=", server_path, "env=", cur_env);
    });

    shipit.task('pwd', function () {
        return shipit.remote('pwd');
    });

    shipit.task('restart_server', function(){
        shipit.remote('cd '+server_path + ' && pm2 start start_scripts/prod.json');
    });

    shipit.task('upload_local_changes', function(){
        var files = [];
        var file_name;
        shipit.local('git status | grep modified').then(function (res) {
            res.stdout.split("\n").forEach(function (element, index, array) {
                if (element != ""){
                    files.push(element.split(":")[1].trim());
                }
            });
            if (files.length > 0){
                var rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl.question("upload this: " + files.join(",")+"\n(y/n): ", function(answer) {
                    if (answer.toLowerCase() == "y"){
                        for (var i=0; i<files.length; i++){
                            file_name = files[i];
                            var dest_file = server_path + file_name;
                            shipit.remoteCopy(file_name, dest_file);
                        }
                    }
                    rl.close();
                });
            }
            else{
                console.log("no file to upload to server!");
            }
        });
    });
};