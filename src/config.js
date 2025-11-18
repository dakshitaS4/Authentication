const mongoose = require("mongoose");
require("dotenv").config();  // load .env file

// connect to cloud MongoDB (Atlas)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Atlas connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Create the schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create the collection
const collection = mongoose.model("users", LoginSchema);

module.exports = collection;
