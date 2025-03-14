const db = require("../config/db.config");

const getAllStock = async () => {
  try {
    const results = db.query("SELECT * FROM stock");
    return results;
  } catch (err) {
    throw err;
  }
};

const addStock = async (brand_name, model, location, quantity, price, date) => {
  console.log(brand_name, model, location, quantity, price, date)
  const sql = "INSERT INTO `stock`(`brand_name`, `model`, `location`, `quantity`, `price`, `date`) VALUES (?,?,?,?,?,?)";
  const results = db.query(sql, [brand_name, model, location, quantity, price, date]);
  return results;
}
module.exports = {
  getAllStock,
  addStock
};
