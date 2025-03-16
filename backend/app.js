const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db.config.js");
const stockRoute = require("./routes/stock.route");
const authRoute = require("./routes/auth.route")

//starting express
const app = express();


// middleware
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow cookies & auth headers
}));
app.use(express.json());

app.use("/stock", stockRoute);
app.use("/auth", authRoute)

// starting the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
