var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false, limit: '10mb' });
var fs = require('fs');
var dal = require('./DAL')

router.get('/', function (req, res){
    res.render('studentHome', { title: 'Home' });
})

router.post('/', parser, function (req, res){
    var studentNo = 'S12345678A';
    var image = req.body.image.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("./temp/out.png", image, 'base64', function(err) {
        if (err != null){
            console.log(err);
        }
    });
    dal.upload(studentNo);
    res.send('Post Successful');
})

module.exports = router;