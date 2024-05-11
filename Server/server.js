const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LoginModel = require("./Models/LoginModel.js");
const userModel = require("./Models/QuizModel.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/quiz");

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


app.post("/score", (req, res) => {
    const score = req.body.result;
    const user = req.body.user;

    LoginModel.findOne({ username: user })
        .then(result => {
            if (result) {
                const id = result._id;
                console.log(result);
                console.log(id);
                
                LoginModel.updateOne({ _id: id }, { $set: { score: score } })
                    .then(updateResult => {
                        console.log(updateResult);
                        res.status(200).send("Received Score");
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send("Error updating score");
                    });
            } else {
                console.log("User not found");
                res.status(404).send("User not found");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error finding user");
        });
});



console.log("Connected to Database Successfully")
app.get("/getQns", (req, res) => {
    userModel.aggregate([{ $sample: { size: 10 } }])
        .then(questions => {
            res.json(questions);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});


app.listen(3001, () => {
    console.log(`Server listening on Port 3001`);
})



