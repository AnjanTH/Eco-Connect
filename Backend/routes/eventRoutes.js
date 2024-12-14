const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/eventController");
const router = express.Router();

router.post("/", createEvent); 
router.get("/", getAllEvents);

module.exports = router;
