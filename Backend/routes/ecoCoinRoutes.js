const express = require('express');
const router = express.Router();
const { registerForEvent } = require('../controllers/ecoCoinController');

router.post('/register-event/:eventId', registerForEvent);





// router.get('/eco-coins/:userId');

module.exports = router;
