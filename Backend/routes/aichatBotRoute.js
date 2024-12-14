const express = require("express");
const { generateContent } = require("../controllers/aichatbotController");

const router = express.Router();

// Route to handle chatbot functionality
router.post("/chatbot", generateContent);

module.exports = router;
