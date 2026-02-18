const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hyperlocal', {
      serverSelectionTimeoutMS: 5000 // Fail fast if local mongo is down
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Local/Cloud MongoDB connection failed. Attempting to start In-Memory MongoDB...');
    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      console.log(`In-Memory MongoDB started at ${uri}`);

      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected (In-Memory): ${conn.connection.host}`);
    } catch (memError) {
      console.error(`Error starting in-memory DB: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
