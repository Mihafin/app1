//usage
// ./shipit [local|vk_dev] [deploy|upload_local_changes|restart_server]

module.exports = function (shipit) {
    var cur_env = shipit.environment;
    console.log("Environment:", cur_env);

    var cfg = require('./configs/shipitcfg');
    shipit.initConfig(cfg);

    require('shipit-deploy')(shipit);
    require('./configs/db_tasks')(shipit);
    require('./configs/deploy_tasks')(shipit);
};


