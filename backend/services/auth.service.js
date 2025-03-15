const db = require("../config/db.config");

async function addEmployee(full_name, email, password, isActive) {
  try {
    const sql =
      "INSERT INTO `employee`(`full_name`, `email`, `password`, `active`) VALUES (?, ?, ?, ?)";
    const result = await db.query(sql, [full_name, email, password, isActive]);
    return result;
  } catch (error) {
    throw error;
  }
}
async function isEmployeeRegistered(email) {
  const sql = "SELECT * FROM employee WHERE email = ?";
  const result = await db.query(sql, [email]);
  return result.length > 0 ? result[0] : null;
}
module.exports = {
  addEmployee,
  isEmployeeRegistered,
};
