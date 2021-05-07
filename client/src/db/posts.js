const base = require("./base");

exports.createPost = async function(title, imageFile, userName) {
    const pool = base.createPool();
    const promisePool = pool.promise();

    const queryString = `
        INSERT INTO post(title, image_file, created_by_user_name, created_date)
        VALUES (?, ?, ?, NOW())
    `;
    const parameters = [title, imageFile, userName];

    try {
        await promisePool.execute(queryString, parameters);
        return true;
    } catch (err) {
        console.error(err.toString());
        return null;
    } finally {
        pool.end();
    }
}

exports.searchPosts = async function(query) {
    const pool = base.createPool();
    const promisePool = pool.promise();

    query = `%${query}%`;

    const queryString = `
        SELECT post_id, title, image_file, created_by_user_name, created_date FROM post WHERE title LIKE ? ORDER BY created_date ASC
    `;
    const parameters = [query];

    try {
        const [rows, fields] = await promisePool.execute(queryString, parameters);

        const posts = rows.map((row) => {
            return {
                postID: row.post_id,
                title: row.title,
                imageFile: row.image_file,
                createdByUserName: row.created_by_user_name,
                createdDate: row.created_date
            }
        });
        return posts;
    } catch (err) {
        console.error(err.toString());
        return null;
    } finally {
        pool.end();
    }
}

exports.getPostByID = async function(postID) {
    const pool = base.createPool();
    const promisePool = pool.promise();

    const queryString = `
        SELECT
            post_id,
            title,
            image_file,
            created_by_user_name,
            created_date
        FROM post
        WHERE post_id = ?
    `;
    const parameters = [postID];

    try {
        const [rows, fields] = await promisePool.execute(queryString, parameters);
        if (rows.length !== 1) return null;
        const row = rows[0];

        const post = {
            postID: row.post_id,
            title: row.title,
            imageFile: row.image_file,
            createdByUserName: row.created_by_user_name,
            createdDate: row.created_date
        };
        return post;
    } catch (err) {
        console.error(err.toString());
        return null;
    } finally {
        pool.end();
    }
}

exports.getCommentsByPost = async function(postID) {
    const pool = base.createPool();
    const promisePool = pool.promise();

    const queryString = `
        SELECT
            comment_id,
            user_name,
            description,
            created_date
        FROM comment
        WHERE post_id = ?
        ORDER BY created_date ASC
    `;
    const parameters = [postID];

    try {
        const [rows, fields] = await promisePool.execute(queryString, parameters);

        const comments = rows.map((row) => {
            return {
                commentID: row.comment_id,
                userName: row.user_name,
                description: row.description,
                createdDate: row.created_date
            }
        });
        return comments;
    } catch (err) {
        console.error(err.toString());
        return null;
    } finally {
        pool.end();
    }
}

exports.createComment = async function(postID, userName, description) {
    const pool = base.createPool();
    const promisePool = pool.promise();

    const queryString = `
        INSERT INTO comment(post_id, user_name, description, created_date)
        VALUES (?, ?, ?, NOW())
    `;
    const parameters = [postID, userName, description];

    try {
        await promisePool.execute(queryString, parameters);
        return true;
    } catch (err) {
        console.error(err.toString());
        return null;
    } finally {
        pool.end();
    }
}
