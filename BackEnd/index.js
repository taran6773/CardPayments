// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/', {
    dbName: 'my_database',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to yourDB : my_database'));

// Schema for users of app
const MyCardSchema = new mongoose.Schema({
    cardNumber: {
        type:Number,
        required:true,
        unique:true,
    },
    name: {
        type:String,
        required:true,
    },
    expiry: {
        type:Date,
        default:Date.now(),
    }
  });
const CardPayment = mongoose.model('CardPayment', MyCardSchema);
CardPayment.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 3000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

    resp.sendFile("../src/App.js");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000
    
    // If you see App is working means
    // backend working properly
});

app.post("/register", async (req, resp) => {
    try {
        const user = new CardPayment(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }

    } catch (e) {
        resp.send("Something Went Wrong");
    }
});
app.listen(3000);