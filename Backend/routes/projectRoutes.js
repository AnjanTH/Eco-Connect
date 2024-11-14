const express = require('express');
const { createProject, getUserProjects,getAllProjects } = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware'); // Authentication middleware

const router = express.Router();


router.post('/create', protect, createProject);


router.get('/user-projects', protect, getUserProjects);
router.get('/all-projects',protect, getAllProjects);

module.exports = router;
