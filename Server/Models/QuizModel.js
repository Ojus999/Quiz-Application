const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    question : {
        type: String,
        required: true
    },
    options :{
        type: [String] ,
        required: true

    },
    answer :{
        type:String,
        required: true

    }
});

const userModel=mongoose.model("questions",userSchema);
module.exports= userModel;