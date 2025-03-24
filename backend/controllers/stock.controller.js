const {
  getAllStock,
  isStockAvailable,
  addStock,
  updateStockQuantity,
  addBuyRecord,
  addSalesRecord,
  getSummary,
} = require("../services/stock.service");
const { addCreditRecord } = require("../services/credit.service");
async function listStocks(req, res) {
  try {
    const data = await getAllStock();
    // console.log("Data retreived");
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
async function restock(req, res) {
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

    await addBuyRecord(model, quantity, price); //add buying to the records table
    const isStock = await isStockAvailable(model); // Check if stock is available
    if (!isStock) {
      await addStock(model, quantity); // Add new stock
    } else {
      await updateStockQuantity(model, quantity); // Update stock quantity
    }
    res.status(201).json({ message: "Stock added successfully" });
  } catch (error) {
    console.error("Error adding stock:", error); // Logs for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
async function sellStock(req, res) {
  const { buyer_name, model, quantity, price, total_price, payment_type } =
    req.body;
  try {
    if (
      !buyer_name ||
      !model ||
      !quantity ||
      !price ||
      !payment_type ||
      !total_price
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (quantity <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity and price must be positive numbers" });
    }
    //check if stock is available
    const stock = await isStockAvailable(model);
    if (!stock) {
      res.status(404).json({ message: "Stock is not found" });
    }
    const availableQuantity = stock.quantity;
    // check if there is enough quantity
    if (availableQuantity < quantity) {
      return res.status(400).json({ message: "Not enough quantity" });
    }
    //add selling to the sales_record table
    const result = await addSalesRecord(
      buyer_name,
      model,
      quantity,
      price,
      total_price,
      payment_type
    );
    //add to credit record
    const sellId = result.insertId;
    if (payment_type === "credit") {
      await addCreditRecord(
        sellId,
        total_price,
        (paid_amount = 0),
        (remaining_amount = total_price)
      );
    }
    //update stock quantity after selling
    await updateStockQuantity(model, -quantity);

    res.status(200).json({ message: "Stock sold successfully" });
  } catch (error) {
    console.error("Error adding stock:", error); // Logs for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
async function summary(req, res) {
  try {
    const [bestSelling, totalStock] = await getSummary();
    console.log(bestSelling, totalStock)
    res.status(201).json({bestSelling, totalStock});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
module.exports = {
  listStocks,
  restock,
  sellStock,
  summary,
};
