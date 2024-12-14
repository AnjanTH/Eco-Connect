const express = require("express");
const { getUserById } = require("../controllers/userController");

const router = express.Router();

// Route to get user details by ID
router.get("/user/:id", getUserById);

module.exports = router;
