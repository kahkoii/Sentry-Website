function uploadImg(studentNo, image){
    const fs = require('fs');
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb+srv://dbUser:Asteria987@cluster0.plmvw.mongodb.net/Cluster0?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Sentry");
        //place json here
        var myobj = { name: 'oH haK eewS', base64_img: image};
        //Inside .collection("here") is the name of the place where the item is stored
        dbo.collection("Images").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
    });
}

module.exports = { upload : uploadImg };
