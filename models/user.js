"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
            user_id:{ type: DataTypes.STRING,  allowNull: false, primaryKey: true },
            name:   { type: DataTypes.STRING,  allowNull: true},
            level:  { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
        },{
            freezeTableName: true,
            tableName: 'users',
            createdAt: false,
            updatedAt: false,
            // ------------------ methods -------------
            classMethods: {
                with_user: function(user_id, user_name, user_surname, cb, err_cb){
                    if (user_id == null || user_id == "" || typeof(user_id) == "undefined"){
                        throw new Error('user_id error!');
                    }
                    this.findOrInitialize({where: {user_id: user_id}, defaults: {name: User.full_name(user_name, user_surname)}})
                        .spread(
                            function(user, initialized) {
                                if (!initialized) user.name = User.full_name(user_name, user_surname);
                                console.log(user.get({ plain: true }), initialized);
                                cb.call(null, user);
                            }
                        )
                        .catch(function(error) {
                            err_cb.call(null, error);
                        });
                },
                full_name: function(user_name, user_surname){
                    return user_name + ' ' + user_surname
                }
            },
            instanceMethods: {
                json_data: function(){
                    return this.get({ plain: true });
                }
            }
        }
    );

    return User;
};