module.exports = function (shipit){
    var cur_env = shipit.environment;
    var cfgs = " --config=configs/db/database.json -e " + cur_env;
    var exec = "node node_modules/db-migrate/bin/db-migrate ";

    shipit.task('migrate-up', function(){
        //usage: VERSION=20151201011009 ./shipit local migrate-up
        var ver = process.env.VERSION ? " " + process.env.VERSION : '';
        var cmd = exec + "up" + ver + cfgs;
        shipit.local(cmd);
    });

    shipit.task('migrate-down', function(){
        //usage: VERSION=20151201011009 ./shipit local migrate-down
        var cmd = exec + "down " + process.env.VERSION + cfgs;
        shipit.local(cmd);
    });
};