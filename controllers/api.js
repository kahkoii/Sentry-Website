var express = require('express');
var router = express.Router();
var dal = require('./DAL');
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './temp');
    },
    filename: function(req, file, cb){
        cb(null, 'out.png');
    }
})
var upload = multer({ storage: storage });

router.get('/student/upload/:studentID([A-Z]{1}[0-9]{8}[A-Z]{1})', function (req, res){
    var studentID = req.params.studentID;
    res.send(studentID);
})

router.post('/student/upload', upload.single('image'), (req, res) => {
    console.log(req.body.id); //req.file
    var studentID = req.body.id;
    dal.upload(studentID);
    if (studentID.match(/^([A-Z]{1}[0-9]{8}[A-Z]{1})$/)){
        res.status(200).send('Successfully uploaded picture for ' + studentID);
    }
    else{
        res.status(200).send('Upload complete, but invalid student ID.');
    }
})

router.get('/', function (req, res){
    res.send('Visit " https://github.com/kahkoii/Sentry-Website/blob/main/README.md " for documentation');
})

module.exports = router;