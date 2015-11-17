var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('users',
        {
            user_id: {type: 'string', primaryKey: true},
            name: 'string',
            level: 'int'
        },
        callback
    );
};

exports.down = function(db, callback) {
    db.dropTable('users', callback);
};
