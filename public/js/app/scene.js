define(["pixi", "app_params", "common/utils", "i18n!nls/loader", "games/three_match/animator"],
function(_, AppParams, Utils, loader_texts, animator){

    var Scene = function(){
        PIXI.Container.call(this);
        this.loader = null;
        this.current_game = null;
        this.animator = animator;
        this.animator.init(this);

        var query = location.search.substr(1);
        var query_params = {};
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            query_params[item[0]] = decodeURIComponent(item[1]);
        });

        AppParams.query_params = query_params;
        AppParams.scene = this;
    };

    Scene.prototype = Object.create(PIXI.Container.prototype);
    Scene.prototype.constructor = Scene;

    Scene.prototype.init = function(){
        console.log("scene init!", AppParams, Utils);
        this.show_loader(function(){
            this.init_render();
            this.init_api();
        });
    };

    Scene.prototype.init_api = function(){
        this.loader.set_text(loader_texts.loading3);
        requirejs(["api/init"], function(SocialApiInitializer){
            SocialApiInitializer(function (SocialApi){
                this.api = new SocialApi(this.on_api_init.bind(this));
                this.api.init_api();
            }.bind(this));
        }.bind(this));
    };

    Scene.prototype.on_api_init = function () {
        if (AppParams.api_config.dev){
            requirejs(["stats"], function () {
                this.stats = this.init_stat();
                this.canvas.appendChild(this.stats.domElement);
            }.bind(this))
        }

        this.api.load_profiles([this.api.user_id], function(result){
            this.api.me = result[0];
            this.loader.set_text(Utils.text.substitute(loader_texts.loading4, this.api.me.first_name));
            this.init_game();
        }.bind(this));
    };

    Scene.prototype.show_loader = function(cb){
        requirejs(["loader"], function(Loader){
            this.loader = new Loader();
            this.loader.set_text(loader_texts.loading2);
            this.addChild(this.loader);
            cb.call(this);
        }.bind(this))
    };

    Scene.prototype.init_game = function() {
        this.load_user_state();
        Utils.sound.set_sound_state(Utils.store.get('sound') != "0");
    };

    Scene.prototype.load_user_state = function() {
        requirejs(["common/request_processor"], function(RequestProcessor){
            RequestProcessor.process({cmd: "first_data"});
        });
    };

    Scene.prototype.on_request_complete = function(result){
        var is_first_request = result.cmd.cmd == "first_data";
        console.log("on_request_complete", is_first_request, result);
        if (result.result.level == 0 && is_first_request){
            this.start_tutorial();
        }
        else{
            this.on_loaded_user_state();
        }
    };

    Scene.prototype.start_tutorial = function(){
        requirejs(["common/request_processor"], function(RequestProcessor) {
            RequestProcessor.process({cmd: "tutorial_complete"});
        });
    };

    Scene.prototype.on_error = function(){
        alert("К сожалению, связь с сервером потеряна! Проверьте подключение и перезапустите игру.");
    };

    Scene.prototype.on_request_error = function(error){
        console.log("on_request_error", error);
    };

    Scene.prototype.on_loaded_user_state = function() {
        requirejs(["game"], function(Game){
            this.game = new Game();
            this.game.init();

            this.removeChild(this.loader);
            this.addChild(this.game);
        }.bind(this))
    };

    Scene.prototype.init_render = function(){
        //PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
        this.renderer = PIXI.autoDetectRenderer(AppParams.width, AppParams.height, {backgroundColor: 0xccccff});
        this.canvas = document.getElementById(AppParams.canvas_id);
        Utils.common.clear_element(this.canvas);
        this.canvas.appendChild(this.renderer.view);

        this.stats = null;

        var animate = function() {
            if (this.stats) this.stats.begin();

            this.animator.update();
            this.renderer.render(this);

            if (this.stats) this.stats.end();
            requestAnimationFrame(animate.bind(this));
        }.bind(this);

        animate();
    };

    Scene.prototype.init_stat = function(){
        var stats = new Stats();
        stats.setMode(0);// 0: fps, 1: ms, 2: mb
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        return stats;
    };

    Scene.prototype.toggle_sound = function () {
        Utils.sound.set_sound_state(!Utils.sound.is_sound_on);
        Utils.store.set('sound', Utils.sound.is_sound_on ? "1" : "0");
        return Utils.sound.is_sound_on;
    };

    return new Scene();

});