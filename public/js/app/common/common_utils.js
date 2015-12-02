var CommonUtils = function(){};

CommonUtils.prototype.get_inner_coords = function(obj, global_point){
    var res = global_point;
    this._mod_coords_by_parent(res, obj.parent);
    return res;
};

CommonUtils.prototype._mod_coords_by_parent = function(res, parent){
    if (!parent) return;
    res.x = res.x - parent.x;
    res.y = res.y - parent.y;
    if (parent.parent) this._mod_coords_by_parent(res, parent.parent);
};

CommonUtils.prototype.clear_element = function(obj){
    while (obj.firstChild) {
        obj.removeChild(obj.firstChild);
    }
};


//todo move to right place!
var UserProfile = function(){
    this.first_name = "";
    this.last_name = "";
    this.img50 = "";
    this.sex = 0; //1 — женский, 2 — мужской , 0 — пол не указан.
};