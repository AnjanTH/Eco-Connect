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

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; 
    const { username, email, phone, address } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;

  

    const updatedUser = await user.save();

    const { password, ...userDetails } = updatedUser.toObject();
    res.status(200).json({
      message: "Profile updated successfully",
      user: userDetails,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getUserById,updateUserProfile
};
