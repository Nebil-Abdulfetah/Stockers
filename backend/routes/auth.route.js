const express = require("express")
const router = express.Router();
const {addEmployee, login, logout} = require("../controllers/auth.controller")


router.post("/add", addEmployee)
router.post("/login", login)
router.post("/logout", logout)
module.exports = router;