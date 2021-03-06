"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
            user_id:{ type: DataTypes.STRING,  allowNull: false, primaryKey: true },
            name:   { type: DataTypes.STRING,  allowNull: true},
            level:  { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
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
                    console.log("before findOrInitialize", user_id);
                    this.findOrInitialize({where: {user_id: user_id}})
                        .spread(function(user, initialized) {
                            console.log("fn=", User.full_name(user_name, user_surname));
                            if (user_name && user_surname) user.name = User.full_name(user_name, user_surname);
                            console.log(user.get({ plain: true }), initialized);
                            cb.call(null, user);
                        })
                        .catch(function(error) {
                            console.log("error=", error);
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