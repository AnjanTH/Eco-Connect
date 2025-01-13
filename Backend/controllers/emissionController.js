const Emission = require('../models/emisson');


const saveEmission = async (req, res) => {
  try {
    const { userId, emission } = req.body;
    console.log(req.body);
    const newEmission = new Emission({ userId, emission });
    await newEmission.save();
    res.status(201).send({ message: 'Emission saved successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to save emission data' });
  }
};


const getEmissions = async (req, res) => {
    console.log(req.params.id);
    const userId  = req.params.id;
    console.log(userId)
    if (!userId) {
        
        return res.status(400).json({ error: "User ID is required." });
    }
    try {
      
        const emissions = await Emission.find({ userId });
        if (!emissions.length) {
            return res.status(404).json({ error: "No emissions data found for this user." });
        }
        console.log(emissions);
        res.status(200).json(emissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

  

module.exports = { saveEmission, getEmissions };
