const express = require('express');
const { saveEmission, getEmissions } = require('../controllers/emissionController');
const router = express.Router();


router.post('/save-emission', saveEmission);
router.get('/get-emissions/:id', getEmissions);

module.exports = router;
