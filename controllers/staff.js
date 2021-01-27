var express = require('express');
var router = express.Router();
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
    res.render('staffStatistics');
})

module.exports = router;