const express = require("express");
const router = express.Router();

const stockController = require("../controllers/stock.controller");

router.get("/", stockController.listStocks);
router.post("/add", stockController.restock)
router.post("/sell", stockController.sellStock)

module.exports = router;