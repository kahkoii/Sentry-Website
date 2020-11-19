function uploadImg(studentNo){
    const firebase = require('firebase');
    const admin = require("firebase-admin");
    const fs = require('fs');
    const cert = require('../config.json')
    var fileName = getRandKey();

    rename();

    function getRandKey(){
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < 16; i++){
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result + '.jpg';
    }

    function rename(){
        // Rename file
        fs.rename('./temp/out.png', './temp/' + fileName, function(err){
            if (err != null)
                throw err;
        })
        updateDB();
    }
    
    function updateDB(){
        // Initialize database
        if (!firebase.apps.length){
            let config = {
                apiKey: "AIzaSyDkHO7GgsiVRMX1Jz8Q-rbHuw1bfLhj-Ig",
                authDomain: "sentry-3daf9.firebaseapp.com",
                projectId: "sentry-3daf9",
                databaseURL: "https://sentry-3daf9.firebaseio.com",
            };
            firebase.initializeApp(config);
        } 

        // Updates real time database
        this.database = firebase.database();
        var imgCount = 0;
        let userRef = this.database.ref('StudentDetails/' + studentNo + '/Images');
        let updateRef = this.database.ref('StudentDetails/' + studentNo);
        data = userRef.once('value', function(snapshot, filename = fileName){
            newVarName = `img_${ snapshot.numChildren() + 1 }`;
            updateRef.child("Images").update({[newVarName]: filename});
        });
        updateStorage();
    }

    function updateStorage(){
        // Imports the Google Cloud client library
        const {Storage} = require('@google-cloud/storage');
    
        // Creates a client
        const storage = new Storage({ projectId: 'sentry-3daf9' });

        // Initialize storage bucket
        if (!admin.apps.length){
            admin.initializeApp({
                credential: admin.credential.cert(cert.firebase),
                databaseURL: "gs://sentry-3daf9.appspot.com",
                storageBucket: 'sentry-3daf9.appspot.com'
            });
            
        }
        var db = admin.database();
        var bucket = admin.storage().bucket();
        var Destination = `${studentNo}/${fileName}`
        // Upload Image to student Number Subfolder
        bucket.upload('./temp/' + fileName, { destination: Destination }, function(err){
            if (err != null)
                console.log(err);
        })
    }
}

module.exports = { upload : uploadImg };
