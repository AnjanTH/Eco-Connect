const express = require("express");
const { getUserById,updateUserProfile} = require("../controllers/userController");

const router = express.Router();

// Route to get user details by ID
router.get("/user/:id", getUserById);
router.put("/user/:id",updateUserProfile);

module.exports = router;
