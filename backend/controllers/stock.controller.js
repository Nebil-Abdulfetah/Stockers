const stockServices = require("../services/stock.service");

async function listStocks(req, res, next) {
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

async function addStock(req, res, next) {
  const { brand_name, model, location, quantity, price, date } = req.body;

  try {
    if (!brand_name || !model || !location || !quantity || !price || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (quantity <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity and price must be positive numbers" });
    }
    const data = await stockServices.addStock(
      brand_name,
      model,
      location,
      quantity,
      price,
      date
    );
    res.status(201).json({ message: "Stock added successfully" });
  } catch (error) {
    console.error("Error adding stock:", error); // Logs for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// async function sellStock(req, res, next) {
//   console.log(req.body);
// }
module.exports = {
  listStocks,
  addStock,
  // sellStock,
};
