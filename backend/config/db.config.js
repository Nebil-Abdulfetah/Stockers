const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const pool = mysql.createPool(dbConfig);

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection successful!");
    connection.release(); // Release connection back to the pool
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}
testConnection();

async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
module.exports = {
  query,
};
