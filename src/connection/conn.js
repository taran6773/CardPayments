const mongoose = require("mongoose");


mongoose
  .connect("mongodb://localhost/my_database")
  .then(() => console.log("Connection successful!"))
  .catch((err) => console.log(err));


