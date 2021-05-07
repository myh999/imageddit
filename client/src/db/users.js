const base = require("./base");

exports.findUserByUserName = async function (userName) {
    const pool = base.createPool();
    const promisePool = pool.promise();

    const queryString = `
        SELECT user_name, password FROM user WHERE user_name = ?
    `;
    const parameters = [userName];

    try {
        const [rows, fields] = await promisePool.execute(queryString, parameters);
        if (rows.length != 1) return null;

        const row = rows[0];
        const user = {
            userName: row.user_name,
            password: row.password
        }
        return user;
    } catch (err) {
        console.error(err.toString());
    } finally {
        pool.end();
    }
}

exports.createUser = async function (userName, password) {
    const pool = base.createPool();
    const promisePool = pool.promise();

    const queryString = `
        INSERT INTO user(user_name, password)
        VALUES(?, ?)
    `;

    const parameters = [userName, password];

    try {
        await promisePool.execute(queryString, parameters);
        return userName;
    } catch(err) {
        console.error(err.toString());
        return null;
    } finally {
        pool.end();
    }
}
