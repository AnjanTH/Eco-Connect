const express = require('express');
const { createProject, getUserProjects,getAllProjects,updateProject,deleteProject } = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware'); // Authentication middleware

const router = express.Router();


router.post('/create', protect, createProject);


router.get('/user-projects', protect, getUserProjects);
router.get('/all-projects', getAllProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
module.exports = router;
