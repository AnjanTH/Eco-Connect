const Project = require('../models/ProjectModel');

// Controller to create a new project submission
const createProject = async (req, res) => {
  try {
    const { title, problemStatement, proposedSolution, extra } = req.body;
    
    // Check for missing fields
    if (!title || !problemStatement || !proposedSolution||!extra) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Create a new project
    const project = new Project({
      username: req.user.username, 
      user: req.user._id,
      title,
      problemStatement,
      proposedSolution,
      extra
    });
 
    await project.save();
    res.status(201).json({ message: 'Project submitted successfully.', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get all projects for a user
const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate("user", "username"); // Populate username from User model
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching all projects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProject, getUserProjects,getAllProjects };
