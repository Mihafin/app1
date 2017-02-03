function User(){}

User.prototype.process = function(user, action, next){
    switch (action){
        case "first_data":{
            break;
        }
        case "tutorial_complete":{
            user.level = 1;
            break;
        }
        default:{
            next(new Error('no action!'));
        }
    }
};

module.exports = new User();