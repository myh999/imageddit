const posts = require("../db/posts");

exports.getHome = async function (req, res) {
    const searchResults = await posts.searchPosts(req.query.q ? req.query.q : "");

    if (!searchResults) {
        res.status(500).send("An error occurred!");
    } else {
        res.render("home", { user: req.use, searchResults });
    }
}
