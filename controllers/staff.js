var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false })
var MongoClient = require('mongodb').MongoClient;
var middleware = require('./middleware');
var dal = require('./DAL');

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
    MongoClient.connect(url, function(err, db) {
        if (err) throw err; 
        var dbo = db.db("Sentry"); 
        dbo.collection("Images").find({}).toArray(function(err, result) {
            if (err) throw err; 
            var data = result; 
            db.close(); 
            var i = 0, arr = [];
            while (i < data.length)
            {
                if (data[i]["verified"] == false)
                {
                    arr.push({"_id": data[i]["_id"], "image": data[i]["Images"][data[i]["Images"].length - 1]});
                }
                i++;
            }
            res.render('staffVerify', {raw: arr});
        });
    });
})

router.post('/verify', parser, function (req, res){
    console.log('Verifying ' + req.body.studentNo);
    dal.verify(req.body.studentNo)
    res.redirect('/staff/verify');
})

module.exports = router;