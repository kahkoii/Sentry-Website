var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
    res.render('staffHome');
})

router.get('/statistics', function (req, res){
    res.render('staffStatistics');
})

module.exports = router;