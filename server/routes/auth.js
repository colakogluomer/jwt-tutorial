const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();
//Register Router
router.post("/register", authController.register);
//Login Router
router.post("/login", authController.login);

module.exports = router;
