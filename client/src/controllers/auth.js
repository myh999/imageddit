const users = require("../db/users");

exports.getLogin = function (req, res) {
    res.render("login");
}

exports.postLogin = function (req, res) {
    res.redirect("/");
}

exports.getLogout = function (req, res) {
    req.logout();
    res.redirect("/");
}

exports.getCreateAccount = function (req, res) {
    res.render("create-account", { user: req.user });
}

exports.postCreateAccount = async function(req, res) {
    const userInfo = req.body;
    const result = await users.createUser(
        userInfo.userName,
        userInfo.password
    )
    if (result == null) {
        res.status(500).send("An error occurred!");
    }
    res.render("success", {redirect: "/login"});
}
