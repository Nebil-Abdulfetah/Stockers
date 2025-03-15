const authServices = require("../services/auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
async function addEmployee(req, res) {
  const { full_name, email, password } = req.body;
  try {
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isEmployeeRegistered = await authServices.isEmployeeRegistered(email); //check if employee exists
    if (isEmployeeRegistered) {
      return res.status(500).json({ message: "Employee already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //hashing the password
    const result = await authServices.addEmployee(
      full_name,
      email,
      hashedPassword,
      (isActive = true)
    );
    const token = await generateToken(result.insertId, res);
    res.status(201).json({ message: "Employee added successfully", token });
  } catch (error) {
    console.error("Error registering employee:", error); // Logs for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const employee = await authServices.isEmployeeRegistered(email); //check if employee exists
    if (!employee) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //check the password
    const hashedPassword = employee.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    //generate token

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await generateToken(employee.id, res);
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function logout(req, res) {
  try {
    res.cookie("stockers", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  addEmployee,
  login,
  logout,
};
