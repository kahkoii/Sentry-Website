function uploadImg(studentNo, image){
    const fs = require('fs');
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb+srv://dbUser:Asteria987@cluster0.plmvw.mongodb.net/Cluster0?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Sentry");
        // Json object
        var myobj = { "_id": studentNo, "name": "oH haK eewS", "Images": [{image}]};

        dbo.collection("Images").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
    });
}

module.exports = { upload : uploadImg };
