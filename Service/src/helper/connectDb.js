const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mimanshaadhikari78:B8BxRf1o0tGfzEZV@cluster0.nodxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: "RoomFinder",
      }
    );
    console.log("DB connection established");
  } catch (error) {
    console.log(error);
  }
};

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://amanoli1000:KGBIaQoQh9AnpWsv@test.pcwhnrr.mongodb.net/?retryWrites=true&w=majority&appName=test";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function connectDB() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// connectDB().catch(console.dir);

module.exports = { connectDB };
