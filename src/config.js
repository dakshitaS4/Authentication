const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/login", {

//checking if database connected or not
}).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
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

// Create the collection model
const collection = mongoose.model("users", LoginSchema);

module.exports = collection;
