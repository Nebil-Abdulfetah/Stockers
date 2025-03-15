const jwt = require("jsonwebtoken");

async function generateToken(id, res) {
  try {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("stockers", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return token;
  } catch (error) {
    console.error("error creating token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  generateToken,
};
