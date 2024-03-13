const mongoose = require("mongoose");

const connectToDatabase = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`.cyan.underline.bold);
  } catch (error) {
    throw new Error("Error connecting to db: " + error.message);
  }
};

module.exports = connectToDatabase;
