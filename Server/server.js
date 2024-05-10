const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LoginModel = require("./Models/LoginModel.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/admin");

app.post("/send", (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    console.log(user, pass);
    LoginModel.findOne({ username: user, password: pass })
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(err => console.log(err))
})

app.get("/get", (req,res) => {
    LoginModel.find()
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.listen(3001, () => {
    console.log(`Server listening on Port 3001`);
})



