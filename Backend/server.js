const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to the database
mongoose.connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");

// Use routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
