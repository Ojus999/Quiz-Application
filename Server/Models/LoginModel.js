const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema({
    username: String,
    password: String,
    score: Number
})

const LoginModel = mongoose.model("users",LoginSchema);
module.exports = LoginModel;

