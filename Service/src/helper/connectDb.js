const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://mimanshaadhikari78:ONdfWIF6kA6AkZs2@testdb.to514.mongodb.net/?retryWrites=true&w=majority&appName=testDB",
      {
        dbName: "RoomFinder",
      }
    );

    const password = "ONdfWIF6kA6AkZs2";
    const username = "mimanshaadhikari78";
    console.log("DB connection established");
  } catch (error) {
    console.log(error);
  }
};

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://mimanshaadhikari78:ONdfWIF6kA6AkZs2@testdb.to514.mongodb.net/?retryWrites=true&w=majority&appName=testDB";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const connectDB = async () => {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   }
//    finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// };
// connectDB().catch(console.dir);

// const mongoose = require("mongoose");
// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://mimanshaadhikari78:ONdfWIF6kA6AkZs2@testdb.to514.mongodb.net/?retryWrites=true&w=majority&appName=testDB",
//       {
//         dbName: "RoomFinder",
//       }
//     );

//     const password = "ONdfWIF6kA6AkZs2";
//     const username = "mimanshaadhikari78";
//     console.log("DB connection established");
//   } catch (error) {
//     console.log(error);
//   }
// };

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
