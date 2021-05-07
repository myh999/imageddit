const mysql = require('mysql2');

exports.createConnection = function() {
    const connectionConfigs = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
    const connection = mysql.createConnection(connectionConfigs);
    return connection;
};

exports.createPool = function() {
    const connectionConfigs = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
    const pool = mysql.createPool(connectionConfigs);
    return pool;
}
