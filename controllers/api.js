var express = require('express');
var router = express.Router();

router.get('/student/upload/:studentID([A-Z]{1}[0-9]{8}[A-Z]{1})', function (req, res){
    var studentID = req.params.studentID;
    res.send(studentID);
})

router.get('/', function (req, res){
    res.send('==Welcome to API Documentation==After api, add  \'/student/upload/StudentID\'');
})

module.exports = router;