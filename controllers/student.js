var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false, limit: '10mb' });
var fs = require('fs');
var dal = require('./DAL')
var studentID = 'S12345678A';

router.get('/', function (req, res){
    res.render('login', { title: 'Login'});
})

router.post('/', parser, function(req, res){
    studentID = req.body.studentID;
    console.log(studentID);
    res.render('studentHome', { title: 'Home'})
})

router.get('/upload', function (req, res){
    res.render('studentHome', { title: 'Home' });
})

router.post('/upload', parser, function (req, res){
    var image = req.body.image.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("./temp/out.png", image, 'base64', function(err) {
        if (err != null){
            console.log(err);
        }
    });
    dal.upload(studentID);
    res.render('success', { title: 'Success'});
})

module.exports = router;