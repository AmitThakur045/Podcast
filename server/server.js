require("dotenv").config();
const express = require("express");
const DBConnect = require("./database");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //to access the json data
app.use(router); // to access the router in routes file

DBConnect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
