const mongoose = require("mongoose");

const DBConnect = () => {
  const DB_URL = process.env.DB_URL;

  mongoose.connect(DB_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log("database connected");
  });
};

module.exports = DBConnect;
