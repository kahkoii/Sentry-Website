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
          console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);

        // Send status to MQTT server
        sendMQTT(studentNo);

      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
}

function sendMQTT(studentNo){
  const mqtt = require('mqtt');
  const options = {
    clientId : "Sentry-Webserver",
    port : 1883
  }
  var client = mqtt.connect("mqtt://broker.emqx.io", options);
  
  client.on("connect", function(){
    console.log("Connected to MQTT server, sending message...");
    client.publish("UniqueSentryImagePassable", studentNo);
    console.log("Message sent, disconnecting from MQTT server.")
    client.end();
  });

  client.on("error", function(error){
    console.log("Failed to connect " + error);
    process.exit(1);
  });
}

module.exports = { upload : uploadImg };
