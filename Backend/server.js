const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("./config/db");
const cors = require('cors');
const morgan = require('morgan');


// Load environment variables
dotenv.config();

// Connect to the database
mongoose.connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to EcoConnect! Your platform for collective climate action.'
    });
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require('./routes/dashboardRoutes');
const projectRoutes = require('./routes/projectRoutes');
const aichatbot=require('./routes/aichatBotRoute')
const eventRoutes=require('./routes/eventRoutes')
const ecoCoinRoutes = require('./routes/ecoCoinRoutes');
const userRoutes = require("./routes/userRoutes");
const emissionRoutes = require('./routes/emissionRoutes');
const leaderboardRoutes=require('./routes/leaderboardRoute')
// Use routes
app.use("/api/auth", authRoutes);
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/projects', projectRoutes);
app.use("/api", aichatbot);
app.use("/api/events", eventRoutes);
app.use("/api", userRoutes);
app.use('/api/eco-coins', ecoCoinRoutes);
app.use('/api/emissions', emissionRoutes);
app.use('/api',leaderboardRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', () => {
    console.log("Shutting down gracefully...");
    mongoose.connection.close(() => {
        console.log("MongoDB connection closed.");
        process.exit(0);
    });
});
