var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var middleware = require('./middleware');

var url = "mongodb+srv://dbUser:Asteria987@cluster0.plmvw.mongodb.net/Cluster0?retryWrites=true&w=majority";

router.get('/', function (req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err; 
        var dbo = db.db("Sentry");
        dbo.collection("Logs").find({}).toArray(function(err, result) {
            if (err) throw err;
            var data = result; 
            var metadata = middleware.getMeta(data);
            db.close();
            res.render('staffHome', {title: 'Home', items: data, meta: metadata});
        });
    });
})

router.get('/statistics', function (req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err; 
        var dbo = db.db("Sentry");
        dbo.collection("Logs").find({}).toArray(function(err, result) {
            if (err) throw err;
            var data = result; 
            db.close();
            res.render('staffStatistics', {raw: data});
        });
    });
})

router.get('/verify', function (req, res){
    var i = 0; // used for while loop
    var img = [];

    /*import package to connect to db*/
    var MongoClient = require('mongodb').MongoClient;
    /*connection string to connect to db */
    var url = "mongodb+srv://dbUser:Asteria987@cluster0.plmvw.mongodb.net/Cluster0?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err; 
        var dbo = db.db("Sentry"); 
        dbo.collection("Images").find({}).toArray(function(err, result) {
            if (err) throw err; 
            var r = result; 
            db.close(); 
    
            while (i < r.length)
            {
                console.log(r[i]["_id"]);
                if (r[i]["verified"] == false)
                {
                    img.push({"_id": r[i]["_id"], "image": r[i]["Images"][r[i]["Images"].length - 1]});
                }
                i++;
            }
            res.render('staffVerify', {data:img});
        });
    });
})

module.exports = router;