//usage
// ./shipit [dev|vk_prod] [deploy|upload_local_changes|restart_server]

module.exports = function (shipit) {
    require('shipit-deploy')(shipit);
    var readline = require('readline');
    var cfg = require('./configs/shipitcfg');

    var cur_env = shipit.environment;
    console.log("Environment:", cur_env);
    shipit.initConfig(cfg);

    require('./configs/db_tasks')(shipit);
    require('./configs/deploy_tasks')(shipit);
};


