
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




app.get('/test', function(req, res){
    Test.find(function(err, data) {
        res.render('lang', {
            data: data,
            lang: collections[1]
        });
    }).sort({ cat_id: 1});
});

app.get('/test/new', isLoggedIn, function(req, res){
    Test.find( function(err, data) {
        res.render('new', {
            data: data,
            lang: 'Test'
        });
    });
});



// CREATE ROUTES
app.post("/test/entry", isLoggedIn, function(req, res){
    // Create Entry
    Test.create(req.body.trans, function(err, newEntry){
        if(err){
            res.render("/test");
        }
        else {
            res.redirect("/test/new");
        }
    })
});


// Update Submit POST Route
app.post('/test/edit/:id', function (req, res) {
    let article = {};
    article.translated = req.body.translated
    article.english = req.body.english;
    article.phonetic = req.body.phonetic;
    article.category = req.body.category;
    article.cat_id = req.body.cat_id;

    let query = { _id: req.params.id };

    Test.update(query, article, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.redirect('/test');
        }
    });
});
