const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database')
.then(()=>console.log("Connection Successful!"))
.catch((err)=>console.log(err));

const MyCardSchema = new mongoose.Schema({
  cardNumber: Number,
  name: String,
  expiry: {
      type:Date
  }
});

const CardPayment = new mongoose.model('CardPayment', MyCardSchema);

// const createDocument = async()=>{
//    try{
//     const reactCards = new CardPayment({
//         cardNumber:1234567891234567,
//         name:"Unkown",
//         expiry:Date.now()
//     })
    
//     const result = await reactCards.save();
//     console.log(result)
//    }catch(err){
//        console.log(err)
//    }
// }

// createDocument();

module.exports = CardPayment;