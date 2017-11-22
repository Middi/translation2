const express = require('express');
const path = require('path');
const app = express();
const expressSanitizer = require("express-sanitizer");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require('body-parser');
var User = require("./models/user");


var port = process.env.PORT || 3000;

/* Load environment variables from .env file */
dotenv.load({ path: '.env' });

// APP CONFIG
mongoose.connect(process.env.MONGO_URL);
app.set("view engine", "pug");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Table Plate",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// =====================
// Check logged in
// =====================
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


// MONGOOSE/MODEL CONFIG
var norwegianSchema = new mongoose.Schema({
    english: String,
    translated: String,
    phonetic: String,
    category: String,
    cat_id: Number,
    lang: String
}, {collection: 'norwegian'});

var Norwegian = mongoose.model("norwegian", norwegianSchema);

// MONGOOSE/MODEL CONFIG
var testSchema = new mongoose.Schema({
    english: String,
    translated: String,
    phonetic: String,
    category: String,
    cat_id: Number,
    lang: String
}, {collection: 'test'});

var Test = mongoose.model("test", testSchema);



// MONGOOSE/MODEL CONFIG
var bulgarianSchema = new mongoose.Schema({
    english: String,
    translated: String,
    phonetic: String,
    category: String,
    cat_id: Number,
    lang: String
}, {collection: 'bulgarian'});

var Bulgarian = mongoose.model("bulgarian", bulgarianSchema);


// MONGOOSE/MODEL CONFIG
var polishSchema = new mongoose.Schema({
    english: String,
    translated: String,
    phonetic: String,
    category: String,
    cat_id: Number,
    lang: String
}, {collection: 'polish'});

var Polish = mongoose.model("polish", polishSchema);


app.get('/', function(req, res){
    res.render('index');
});

app.get('/norwegian', function(req, res){
    Norwegian.find(function(err, data) {
        res.render('lang', {
            data: data,
            lang: 'Norwegian'
        });
    }).sort({ cat_id: 1});
});

app.get('/test', function(req, res){
    Test.find(function(err, data) {
        res.render('lang', {
            data: data,
            lang: 'Test'
        });
    }).sort({ cat_id: 1});
});

app.get('/bulgarian', function(req, res){
    Bulgarian.find(function(err, data) {
        res.render('lang', {
            data: data,
            lang: 'Bulgarian'
        });
    }).sort({ cat_id: 1});
});


app.get('/polish', function(req, res){
    Polish.find(function(err, data) {
        res.render('lang', {
            data: data,
            lang: 'Polish'
        });
    }).sort({ cat_id: 1});
});


app.get('/norwegian/new', isLoggedIn, function(req, res){
    Norwegian.find( function(err, data) {
        res.render('new', {
            data: data,
            lang: 'Norwegian'
        });
    });
});

app.get('/bulgarian/new', isLoggedIn, function(req, res){
    Bulgarian.find( function(err, data) {
        res.render('new', {
            data: data,
            lang: 'Bulgarian'
        });
    });
});

app.get('/polish/new', isLoggedIn, function(req, res){
    Polish.find( function(err, data) {
        res.render('new', {
            data: data,
            lang: 'Polish'
        });
    });
});


// CREATE ROUTES
app.post("/norwegian/entry", isLoggedIn, function(req, res){
    // Create Entry
    Norwegian.create(req.body.trans, function(err, newEntry){
        if(err){
            res.render("/norwegian");
        }
        else {
            res.redirect("/norwegian/new");
        }
    })
});

// CREATE ROUTES
app.post("/bulgarian/entry", isLoggedIn, function(req, res){
    // Create Entry
    Bulgarian.create(req.body.trans, function(err, newEntry){
        if(err){
            res.render("/bulgarian");
        }
        else {
            res.redirect("/bulgarian/new");
        }
    })
});

// CREATE ROUTES
app.post("/polish/entry", isLoggedIn, function(req, res){
    // Create Entry
    Polish.create(req.body.trans, function(err, newEntry){
        if(err){
            res.render("/polish");
        }
        else {
            res.redirect("/polish/new");
        }
    })
});


// Load Edit Form
app.get('/norwegian/edit/:id', isLoggedIn, function (req, res) {
    Norwegian.findById(req.params.id, function (err, article) {
        res.render('edit', {
            article: article,
            lang: 'Norwegian'
        });
    });
});

// Load Edit Form
app.get('/bulgarian/edit/:id', isLoggedIn, function (req, res) {
    Bulgarian.findById(req.params.id, function (err, article) {
        res.render('edit', {
            article: article,
            lang: 'Bulgarian'
        });
    });
});

// Load Edit Form
app.get('/polish/edit/:id', isLoggedIn, function (req, res) {
    Polish.findById(req.params.id, function (err, article) {
        res.render('edit', {
            article: article,
            lang: 'Polish'
        });
    });
});


// Update Submit POST Route
app.post('/norwegian/edit/:id', function (req, res) {
    let article = {};
    article.polish = req.body.polish;
    article.norwegian = req.body.norwegian;
    article.english = req.body.english;
    article.phonetic = req.body.phonetic;
    article.category = req.body.category;
    article.cat_id = req.body.cat_id;

    let query = { _id: req.params.id };

    Norwegian.update(query, article, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect('/norwegian');
        }
    });
});


// Update Submit POST Route
app.post('/polish/edit/:id', function (req, res) {
    let article = {};
    article.translated = req.body.translated
    article.english = req.body.english;
    article.phonetic = req.body.phonetic;
    article.category = req.body.category;
    article.cat_id = req.body.cat_id;

    let query = { _id: req.params.id };

    Polish.update(query, article, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect('/polish');
        }
    });
});

// Update Submit POST Route
app.post('/bulgarian/edit/:id', function (req, res) {
    let article = {};
    article.translated = req.body.translated
    article.english = req.body.english;
    article.phonetic = req.body.phonetic;
    article.category = req.body.category;
    article.cat_id = req.body.cat_id;

    let query = { _id: req.params.id };

    Bulgarian.update(query, article, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect('/bulgarian');
        }
    });
});

// LOGIN ROUTES
app.get("/login", function(req, res){
   res.render("login"); 
});


// Login Logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/norwegian",
    failureRedirect: "/login"
}), function(req, res){
   
});


// Log Out Logic
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}






// Start Server
app.listen(port, function () {
    console.log('server started on port 3000');
});