define(["api/common"], function(CommonApi){

    var SocialApi = function (on_init) {
        CommonApi.call(this, on_init, "local");
    };

    SocialApi.prototype = Object.create(CommonApi.prototype);
    SocialApi.prototype.constructor = SocialApi;

    SocialApi.prototype.init_api = function(){
        this.on_api_init();
    };

    SocialApi.prototype.load_profiles = function(profiles, cb){
        profiles = this.local_profiles();
        cb.call(null, profiles);
    };

    SocialApi.prototype.local_profiles = function(cnt){
        var res = [];
        var prof = new UserProfile();
        prof.first_name = "Имя";
        prof.last_name = "Фамилия";
        prof.img50 = "imgs/loader/load_image.png";
        prof.sex = 2;
        res.push(prof);
        return res;
    };

    return SocialApi;
});

