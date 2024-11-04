const express = require('express');
const router = express.Router();

// Dashboard or Landing Page Route
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to the EcoConnect Dashboard!',
        
    });
});

module.exports = router;
