var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false, limit: '10mb' });
var fs = require('fs');
var dal = require('./DAL');
const session = require('express-session');
var studentID = 'S12345678A';

router.get('/login', function (req, res){
    res.render('login', { title: 'Login'});
})

router.post('/login', parser, function(req, res){
    req.session.studentID = req.body.studentID;
    req.session.validated = true;
    console.log(req.session.studentID);
    res.redirect('/');
})

router.get('/', function (req, res){
    if (!req.session.validated){
        res.redirect('/login');
    }
    else{
        res.render('studentHome', { title: 'Home' });
    }
})

router.get('/upload', function (req, res){
    if (!req.session.validated){
        res.redirect('/login');
    }
    else{
        res.render('studentHome', { title: 'Home' });
    }
})

router.post('/upload', parser, function (req, res){
    var image = req.body.image.replace(/^data:image\/png;base64,/, "");
    dal.upload(studentID, image);
    res.render('success', { title: 'Success'});
})

module.exports = router;