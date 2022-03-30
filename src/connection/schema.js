const mongoose = require("mongoose");

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

module.exports = new mongoose.model('CardPayment', MyCardSchema);