"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
            id: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                field: 'user_id',
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            }
        }, {
            freezeTableName: true,
            tableName: 'users',
            createdAt: false,
            updatedAt: false
        }
        //, {
        //classMethods: {
        //    associate: function(models) {
        //        User.hasMany(models.Task)
        //    }
        //}}
    );

    return User;
};