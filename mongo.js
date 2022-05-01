const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.DB_URI);

let _db;

connect = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to MongoDB");
  _db = client.db(process.env.DB_NAME);
  return;
};

db = () => _db;

module.exports = {
  connect,
  db,
  ObjectId,
};
