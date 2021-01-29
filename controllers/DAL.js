function uploadImg(studentNo, image){
    const fs = require('fs');
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://dbUser:Asteria987@cluster0.plmvw.mongodb.net/Cluster0?retryWrites=true&w=majority";

    const client = new MongoClient(url);
    async function run() {
      try {
        await client.connect();
        const database = client.db("Sentry");
        const collection = database.collection("Images");
        const filter = { "_id": studentNo };
        const options = { upsert: true };
        const updateDoc = {
          $push: {
            "Images": image
          }
        };
        
        const result = await collection.updateOne(filter, updateDoc, options);
        if (result.matchedCount == 0)
          console.log("A document is created");
        else
          console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
          );
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
}

module.exports = { upload : uploadImg };
