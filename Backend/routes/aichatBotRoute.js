const express = require("express");
const { generateContent } = require("../controllers/aichatbotController");
const {protect}=require('../middlewares/authMiddleware')
const router = express.Router();

// Route to handle chatbot functionality
router.post("/chatbot", generateContent,protect);

module.exports = router;
