// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
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
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

    try {
        CardPayment.find({}).then(
            data=>resp.json(data)
        )
    } catch (error) {
        console.log(error)
    }
});

app.post("/register", async (req, resp) => {
    try {
        let user = new CardPayment(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }

    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.post("/delete",async(req,res)=>{
    let x=req.body
    // const user = new CardPayment();
    console.log(x)
    await CardPayment.deleteOne({ cardNumber: x.card }).clone()
    .catch(e=>{
        console.log(e)
    })
    })


app.post("/update",async(req,res)=>{
    let y=req.body
    // let user = new CardPayment();
    await CardPayment.updateOne({name: y.name, expiry: y.expiry}).catch(e=>{
        console.log(e)
    })

    // user.findOneAndUpdate({name:  }, 
    //     {name:"Anuj"}, null, function (err, docs) {
    //     if (err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log("Original Doc : ",docs);
    //     }
    // });
    })


app.listen(5000);