const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// Import Routes
const rooms = require("./routes/rooms");
const reservations = require("./routes/reservations");
const users = require("./routes/users");
const login = require("./routes/login");

// ROUTES
app.use(cors());
app.use("/login", login);
app.use("/rooms", rooms);
app.use("/reservations", reservations);
app.use("/users", users);
app.use(express.static('files'));

app.get("/", (req, res) => {
  res.send("AltenHotel Middleware Services");
});

const dbStr = process.env.DB_CONNECTION;
mongoose.connect(dbStr, { useNewUrlParser: true }, (e) => {
  if (e) {
    console.log(e);
  }
  console.log("dbStr = ", dbStr);
  console.log("DB successfully connected");
});

app.listen(3000);
