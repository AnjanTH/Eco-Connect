const User = require("../models/User");


const getLeaderboard = async (req, res) => {
    try {
        
        const leaderboard = await User.find()
            .sort({ ecocoins: -1 }) 
            .select("username ecocoins");

       
        const rankedLeaderboard = leaderboard.map((user, index) => ({
            rank: index + 1, 
            username: user.username,
            ecocoins: user.ecocoins,
        }));
        
        res.status(200).json(rankedLeaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: "Server error while fetching leaderboard" });
    }
};

module.exports = getLeaderboard;
