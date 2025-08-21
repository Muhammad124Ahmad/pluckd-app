// db.js
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log("Database succesfully connected");

    dbInstance = client.db(dbName);

    return dbInstance;
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDatabase;
