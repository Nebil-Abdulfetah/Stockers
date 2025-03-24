const express = require("express");
const router = express.Router();

const {listStocks, restock, sellStock, summary} = require("../controllers/stock.controller");

router.get("/", listStocks);
router.post("/add", restock);
router.post("/sell", sellStock);
router.get("/summary", summary);
module.exports = router;
