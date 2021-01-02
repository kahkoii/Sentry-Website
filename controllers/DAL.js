function uploadImg(studentNo){
    const mongo = require('mongodb');
    const fs = require('fs');
    const cert = require('../config.json');
    var fileName = getRandKey();

    rename(fileName);

    function getRandKey(){
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < 16; i++){
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result + '.jpg';
    }

    function rename(fileName){
        // Rename file
        fs.rename('./temp/out.png', './temp/' + fileName, function(err){
            if (err != null)
                throw err;
        })
        updateDB();
    }
    
    function updateDB(){
        console.log("UPLOAD TO DB IN PROGRESS");
        //deleteLocalFile(fileName);
    }

    function deleteLocalFile(fileName){
        fs.unlinkSync('./temp/' + fileName);
    }
}

module.exports = { upload : uploadImg };
