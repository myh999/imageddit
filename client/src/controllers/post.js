const posts = require("../db/posts");

exports.getPost = async function(req, res) {
    const postID = req.params.postID;

    const postInfoPromise = posts.getPostByID(postID);
    const commentsPromise = posts.getCommentsByPost(postID);

    const postInfo = await postInfoPromise;
    const comments = await commentsPromise;

    if (!postInfo) {
        res.sendStatus(404);
    } else {
        res.render("post", {post: postInfo, comments});
    }
}

exports.postPost = async function(req, res) {
    const title = req.body.title;
    const imageFile = req.file;

    const result = await posts.createPost(title, imageFile.filename, req.user.userName);
    if (!result) {
        res.sendStatus(500).send("An error occurred!");
    } else {
        res.redirect("/");
    }
}

exports.postComment = async function(req, res) {
    const postID = req.params.postID;
    const description = req.body.description;

    const result = await posts.createComment(postID, req.user.userName, description);

    if (!result) {
        res.sendStatus(500);
    } else {
        res.redirect("/post/" + postID);
    }
}

