const stockServices = require("../services/stock.service");

async function listStocks(req, res) {
  try {
    const data = await stockServices.getAllStock();
    // console.log("Data retreived");
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function addStock(req, res) {
  const { model, quantity, price } = req.body;

  try {
    if (!model || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (quantity <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity and price must be positive numbers" });
    }

    await stockServices.addBuyRecord(model, quantity, price); //add buying to the records table
    const isStockAvailable = await stockServices.isStockAvailable(model); // Check if stock is available
    if (!isStockAvailable) {
      await stockServices.addStock(model, quantity); // Add new stock
    } else {
      await stockServices.updateStockQuantity(model, quantity); // Update stock quantity
    }
    res.status(201).json({ message: "Stock added successfully" });
  } catch (error) {
    console.error("Error adding stock:", error); // Logs for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  listStocks,
  addStock,
};
