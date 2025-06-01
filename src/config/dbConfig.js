// src/config/dbConfig.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

let client;

const connectDB = async () => {
    if (client && client.isConnected()) return client.db(process.env.DB_NAME);

    try {
        client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(process.env.DB_NAME);
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        throw error;
    }
};

module.exports = { connectDB, client };
