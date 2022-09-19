require("dotenv").config();
const express = require("express");
const DBConnect = require("./database");
const router = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser()); // to get the accesstoken from cookie in auth middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/storage", express.static("storage")); // whenever request url start with /storage then redirect to storage folder
app.use(express.json({ limit: "8mb" })); //to access the json data
app.use(router); // to access the router in routes file

DBConnect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
