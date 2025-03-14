const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db.config.js");
const stockRoute = require("./routes/stock.route");

//starting express
const app = express();

// middleware
app.use(express.json());

app.use("/stock", stockRoute);

// starting the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
