const express = require('express');
const path = require("path");
const bcrypt = require("bcryptjs");
const collection = require("./config");

const app = express();

// Convert data into JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use ejs as the view engine
app.set('view engine', 'ejs');

// Static file
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register user
app.post("/signup", async (req, res) => {

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = {
        name: req.body.username,
        password: hashedPassword
    };

    //check if the user already exists in the database

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exists.Please choose a different username.");
    } else {
        const userdata = await collection.insertMany(data);
        console.log("User data saved:", userdata);
        res.render("home");
    }

});

//login user

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username });
        if(!check) {
            res.send("User not found.Kindly Sign Up.");
        }

        //compare the hash password from the database with the plain text
        const PasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(PasswordMatch) {
            res.render("home");
        }else {
            res.send("Wrong Password");
        }
    }catch{
        res.send("Worng Details");
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
