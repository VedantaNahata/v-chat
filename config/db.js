const mongoose = require("mongoose");

const connectDB = async (URI) => {
  const connect = mongoose.connect(URI);
  connect
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("Database connection failed");
    });
};

module.exports = connectDB;
