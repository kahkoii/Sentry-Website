var express = require('express');
var router = express.Router();

/*import package to connect to db*/
var MongoClient = require('mongodb').MongoClient;
/*connection string to connect to db */
var url = "mongodb+srv://dbUser:Asteria987@cluster0.plmvw.mongodb.net/Cluster0?retryWrites=true&w=majority";

router.get('/', function (req, res){
    //----get data from DB----//
    /*method to retrieve collection*/
    MongoClient.connect(url, function(err, db) {
        if (err) throw err; // if error occure
        var dbo = db.db("Sentry"); // name of db
        dbo.collection("Logs").find({}).toArray(function(err, result) {
            if (err) throw err; // if error occure
            var r = result; // type is object
            db.close(); // close db
            res.render('staffHome', {title: 'Home', items: r});// sends data to web page
        });
    });
})

router.get('/statistics', function (req, res){
    res.render('staffStatistics');
})

module.exports = router;