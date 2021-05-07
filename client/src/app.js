const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-local");
const Users = require("./db/users");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const connectEnsureLogin = require("connect-ensure-login");
const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: multerStorage });

const auth = require("./controllers/auth");
const home = require("./controllers/home");
const post = require("./controllers/post");

require('dotenv').config();

// Configure the local strategy for use by Passport.
//
// The local strategy requires a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(async (username, password, done) => {
    try {
        const user = await Users.findUserByUserName(username);
        if (!user) return done(null, false);
        if (user.password != password) return done(null, false);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, done) => {
    done(null, user.userName);
});

passport.deserializeUser(async (userName, done) => {
    const user = await Users.findUserByUserName(userName);
    if (user == null) {
        done(new Error("Username " + userName + " does not exit"));
    } else {
        done(null, user);
    }
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: "keyboard cat", resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get("/", connectEnsureLogin.ensureLoggedIn(), home.getHome);

app.use("/images", express.static("./images"));

app.get("/post/:postID", connectEnsureLogin.ensureLoggedIn(), post.getPost);
app.post("/post", connectEnsureLogin.ensureLoggedIn(), upload.single("imageFile"), post.postPost);
app.post("/post/:postID/comment", connectEnsureLogin.ensureLoggedIn(), post.postComment);

app.get("/login", auth.getLogin);
app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), auth.postLogin);
app.get("/logout", auth.getLogout);
app.get("/create-account", auth.getCreateAccount);
app.post("/create-account", auth.postCreateAccount);

app.listen(3000, () => {
    console.log("App is running at http://localhost:3000");
    console.log("Press CTRL-C to stop");
});
