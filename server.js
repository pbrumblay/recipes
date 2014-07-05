var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');

var db = require('./app/models/recipe');

app.use(bodyParser());

var port = process.env.PORT || 8080;

var s = '';
var router = express.Router();

router.use(function(req, res, next) {
   console.log('something is happening...');
    next();
});

router.get('/', function(req, res) {
   res.json({message: 'hooray! welcome to our api!' });
});

router.route('/recipes')
    .post(function (req, resp) {

    })

    .get(function(req, res) {
        db.Recipe.find(function(err, recipes) {
            if(err)
                res.send(err);

            res.json(recipes);

        });
    });

router.route('/recipes/q/:term')
    .get(function(req, res) {
       db.Recipe.find({ IngredientsSearchText: new RegExp(req.params.term, "i")}, function(err, recipes) {
           if(err)
            res.send(err);
           res.json(recipes);
       });
    });

router.route('/recipes/c')
    .get(function(req, res) {
        db.Recipe.find().distinct('CategoryName', function(err, cats) {
            if(err) res.send(err);
            res.json(cats);
        });
    });


router.route('/recipes/c/:term')
    .get(function(req, res) {
        var q = db.Recipe.find({ CategoryName: new RegExp(req.params.term, "i")});
        q.select('CategoryName');
        q.exec(function(err, cats) {
            if(err) res.send(erro);
            res.json(cats);
        });
    });


app.use('/api', router);

app.listen(port);

console.log('Magic happens on port ' + port);

