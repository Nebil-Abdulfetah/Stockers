const db = require("../config/db.config");

async function addCreditRecord(
  sellId,
  total_amount,
  paid_amount,
  remaining_amount
) {
  try {
    const sql =
      "INSERT INTO `credits`(`sell_id`, `total_amount`, `paid_amount`, `remaining_amount`) VALUES (?,?,?,?)";
    const results = await db.query(sql, [
      sellId,
      total_amount,
      paid_amount,
      remaining_amount,
    ]);
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addCreditRecord,
};
