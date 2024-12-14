const User = require("../models/User");


const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request params
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const { password, ...userDetails } = user.toObject();
    res.status(200).json(userDetails);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getUserById,
};
