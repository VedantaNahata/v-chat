const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://vedanta:uL3kiL3Ja35sEEZV@cluster0.uo5novt.mongodb.net/?retryWrites=true&w=majority"
);

const connectDB = async () => {
  connect
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("Database connection failed");
    });
};

module.exports = connectDB;
