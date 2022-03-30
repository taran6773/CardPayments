const express = require("express");
const path = require('path')
const app = express();
const appJS = require("../App")
// const cors = require("cors");
app.use(express.json());
// app.use(cors());
const MyCard = require('./schema')
const port = process.env.PORT || 3000;
require('./conn')

app.get("/", (req, res) => {

    res.render('appJS');
});

app.post("/register", async (req, res) => {
    try {
        const user = new CardPayment(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            res.send(req.body);
            console.log(result);
        } else {
            console.log("Can't Send Data...try again!");
        }

    } catch (e) {
        res.send("Something Went Wrong");
    }
});


app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})