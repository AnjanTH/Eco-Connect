
const Event=require("../models/EventModel");


// Create Event
const createEvent = async (req, res) => {
  const { title, description, date, time, location } = req.body;

  // Validation
  if (!title || !description || !date || !time || !location) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const newEvent = new Event({ title, description, date, time, location });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ error: "Failed to create event. Please try again." });
  }
};

// Get All Events (with Pagination)
const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { createEvent, getAllEvents };
