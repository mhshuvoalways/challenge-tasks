require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/db");

const router = require("./router/router");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("This is a tic tac toe game api");
});

db(app);
