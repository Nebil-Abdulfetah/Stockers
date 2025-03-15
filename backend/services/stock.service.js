const db = require("../config/db.config");

async function getAllStock() {
  try {
    const results = db.query("SELECT * FROM stock");
    return results;
  } catch (err) {
    throw err;
  }
}

async function addStock(brand_name, model, location, quantity, price, date) {
  try {
    const sql =
      "INSERT INTO `stock`(`brand_name`, `model`, `location`, `quantity`, `price`, `date`) VALUES (?,?,?,?,?,?)";
    const results = db.query(sql, [
      brand_name,
      model,
      location,
      quantity,
      price,
      date,
    ]);
    return results;
  } catch (error) {
    throw err;
  }
}
module.exports = {
  getAllStock,
  addStock,
};
