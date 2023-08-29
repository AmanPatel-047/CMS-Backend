const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require("./models/user.js")

const app = express()
app.use(express.json())
app.use(cors())
 
mongoose.connect("mongodb://localhost:27017/CMS")
.then(() => {
    console.log("Connected to database");
})
.catch(err => {
    console.error("Database connection error:", err);
});  
app.post('/login', (req, res) => {
    const { email, password } = req.body; 
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("the password is incorrect")
                } 
            } else {
                    console.log(req.body);
                    res.json(req.body)
                }
            })
})

app.post('/', (req, res) => {
    UserModel.create(req.body)
        .then(Users => res.json(Users))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})