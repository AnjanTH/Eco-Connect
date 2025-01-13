const Project = require('../models/ProjectModel');
const User = require('../models/User'); // Import the User model

// Controller to create a new project submission
const createProject = async (req, res) => {
  try {
    const { title, problemStatement, proposedSolution, extra } = req.body;

    // Check for missing fields
    if (!title || !problemStatement || !proposedSolution || !extra) {
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

    // Save the project
    await project.save();

    // Add 10 ecoCoins to the user
    const user = await User.findById(req.user._id);
    user.ecocoins += 10; // Add 10 ecoCoins to the user's account
    await user.save(); // Save the updated user data

    res.status(201).json({ message: 'Project submitted successfully and ecoCoins added.', project });
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
const updateProject = async (req, res) => {
  try {
    const { title, problemStatement, proposedSolution, extra } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, problemStatement, proposedSolution, extra },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller to delete a project
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createProject, getUserProjects,getAllProjects,updateProject,deleteProject};
