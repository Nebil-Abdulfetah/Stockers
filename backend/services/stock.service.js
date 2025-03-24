const db = require("../config/db.config");

async function getAllStock() {
  try {
    const results = await db.query("SELECT * FROM stock");
    return results;
  } catch (err) {
    throw err;
  }
}
async function isStockAvailable(model) {
  try {
    const sql = "SELECT * FROM stock WHERE model = ?";
    const result = await db.query(sql, [model]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    throw error;
  }
}
async function addStock(model, quantity) {
  try {
    const sql = "INSERT INTO `stock`(`model`, `quantity`) VALUES (?,?)";
    const results = await db.query(sql, [model, quantity]);
    return results;
  } catch (error) {
    throw err;
  }
}
async function updateStockQuantity(model, quantiy) {
  try {
    const sql = "UPDATE stock SET quantity = quantity + ? WHERE model = ?";
    const results = await db.query(sql, [quantiy, model]);
    return results;
  } catch (error) {
    throw error;
  }
}
async function addBuyRecord(model, quantity, price) {
  try {
    const sql =
      "INSERT INTO `buy_record`(`model`, `quantity`, `price`) VALUES (?,?,?)";
    const results = await db.query(sql, [model, quantity, price]);
    return results;
  } catch (error) {
    throw error;
  }
}
async function addSalesRecord(buyer_name, model, quantity, price, total_price, payment_type) {
  try {
    const sql = "INSERT INTO `sales_record`(`buyer_name`, `model`, `quantity`, `price`, `total_price`, `payment_type`) VALUES (?,?,?,?,?,?)";
    const results = await db.query(sql, [buyer_name, model, quantity, price, total_price, payment_type]);
    return results;
  } catch (error) {
    throw error
  }
}
module.exports = {
  getAllStock,
  isStockAvailable,
  addStock,
  updateStockQuantity,
  addBuyRecord,
  addSalesRecord,
};
