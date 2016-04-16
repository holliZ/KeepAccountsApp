'use strict';

let mysql = require('mysql');
let DB_NAME = 'keepaccount';
let Category = require('./Category');
let Account = require('./Account');
let Setting = require('./Setting');
let Bill = require('./Bill');
let Items = require('./Items');

let pool = mysql.createPool({
    host: 'localhost',
    user: 'holli',
    password: '1234'
});

pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

pool.getConnection(function(err, connection) {
    let useDbSql = `USE ${DB_NAME}`;
    connection.query(useDbSql, function(err) {
        if (err) {
            console.log('USE Error:', err.message);
            return;
        }
        console.log('USE DataBase succeed');
    });
    Category.connection = connection;
    Category.pool = pool;
    Account.connection = connection;
    Account.pool = pool;
    Setting.connection = connection;
    Setting.pool = pool;
    Bill.connection = connection;
    Bill.pool = pool;
    Items.connection = connection;
    Items.pool = pool;
});

module.exports = {
    Category: Category,
    Account: Account,
    Setting: Setting,
    Bill: Bill,
    Items: Items,
};
