const mongoose = require('mongoose');


const emissionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  emission: { type: Number, required: true },  
});


const Emission = mongoose.model('Emission', emissionSchema);

module.exports = Emission;