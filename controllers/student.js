var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false, limit: '10mb' });
parser.limit = '10mb';

router.get('/', function (req, res){
    res.render('studentHome', { title: 'Home' });
})

router.post('/', parser, function (req, res){
    var image = req.body.image;
    res.send('Post Successful');
})

module.exports = router;