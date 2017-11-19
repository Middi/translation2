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

/**
 * Load environment variables from .env file, where API keys and passwords are configurededit
 */
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
var transSchema = new mongoose.Schema({
    polish: String,
    english: String,
    phonetic: String,
    category: String,
    cat_id: Number,
    norwegian: String
}, {collection: 'polish'});

var Trans = mongoose.model("polish", transSchema);


app.get('/', function(req, res){
    Trans.find(function(err, data) {
        res.render('index', {data: data});
    });
});


app.get('/new', isLoggedIn, function(req, res){
    Trans.find( { category: "Directions" }, function(err, data) {
        res.render('new', {data: data});
    });
});


// CREATE ROUTE
app.post("/entry", function(req, res){
    // Create Entry
    Trans.create(req.body.trans, function(err, newEntry){
        if(err){
            res.render("/");
        }
        else {
            res.redirect("/new");
        }
    })
});

app.get('/norwegian', function(req, res){
    Trans.find(function(err, data) {
        res.render('norwegian', {data: data});
    }).sort({ cat_id: 1});
});

// Load Edit Form
app.get('/edit/:id', function (req, res) {
    Trans.findById(req.params.id, function (err, article) {
        res.render('edit', {
            article: article
        });
    });
});


// Update Submit POST Route
app.post('/edit/:id', function (req, res) {
    let article = {};
    article.polish = req.body.polish;
    article.norwegian = req.body.norwegian;
    article.english = req.body.english;
    article.phonetic = req.body.phonetic;
    article.category = req.body.category;
    article.cat_id = req.body.cat_id;

    let query = { _id: req.params.id };

    Trans.update(query, article, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect('/');
        }
    });
});


// LOGIN ROUTES
app.get("/login", function(req, res){
   res.render("login"); 
});


// Login Logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/new",
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