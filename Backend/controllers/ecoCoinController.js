const EcoCoin = require('../models/EcoCoins');
const User = require('../models/User');

const registerForEvent = async (req, res) => {
    try {
      const { userId } = req.body;  // assuming userId is in the body
      const { eventId } = req.params;  // eventId from URL params
  
      const ecoCoin = await EcoCoin.findOne({ userId });
      if (!ecoCoin) {
        return res.status(400).json({ error: 'User EcoCoin record not found' });
      }
  
      ecoCoin.coins += 10;  // Add 10 coins for event registration
      await ecoCoin.save();
  
      return res.status(200).json({ coins: ecoCoin.coins });
    } catch (error) {
      console.error("Error during event registration:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
  registerForEvent,
};
