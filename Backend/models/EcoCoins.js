const mongoose = require('mongoose');

const ecoCoinSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coins: {
    type: Number,
    default: 0,
  },
});

const EcoCoin = mongoose.model('EcoCoin', ecoCoinSchema);
module.exports = EcoCoin;
