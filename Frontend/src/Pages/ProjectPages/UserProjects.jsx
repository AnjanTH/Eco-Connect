import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null); // To manage editing state
  const [title, setTitle] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [extra, setExtra] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming token is stored in localStorage
        const response = await axios.get(
          "http://localhost:8080/api/projects/user-projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Handle project form submission for both add and edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (editingProject) {
        // Edit the project
        await axios.put(
          `http://localhost:8080/api/projects/${editingProject._id}`,
          {
            title,
            problemStatement,
            proposedSolution,
            extra,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Project edited successfully!");
      } else {
        // Create new project
        await axios.post(
          "http://localhost:8080/api/projects",
          {
            title,
            problemStatement,
            proposedSolution,
            extra,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Project submitted successfully!");
      }
      setIsLoading(false);
      setEditingProject(null);
      setTitle("");
      setProblemStatement("");
      setProposedSolution("");
      setExtra("");
      // Refetch the projects after submission
      fetchProjects();
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting project:", error);
    }
  };

  // Handle the edit button click
  const handleEdit = (project) => {
    setEditingProject(project);
    setTitle(project.title);
    setProblemStatement(project.problemStatement);
    setProposedSolution(project.proposedSolution);
    setExtra(project.extra);
  };

  // Handle the delete button click
  const handleDelete = async (projectId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Project deleted successfully!");
      // Remove the deleted project from the state without needing to refetch
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Close the modal
  const closeModal = () => {
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Projects
      </h2>
      {/* If editingProject is null, show the projects list, else show the edit form */}
      {editingProject ? (
        <div className="max-w-2xl w-full bg-white p-8 shadow-xl rounded-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Edit Your Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="problemStatement"
                className="block text-sm font-medium text-gray-700"
              >
                Problem Statement
              </label>
              <textarea
                id="problemStatement"
                placeholder="Describe the problem"
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="proposedSolution"
                className="block text-sm font-medium text-gray-700"
              >
                Proposed Solution
              </label>
              <textarea
                id="proposedSolution"
                placeholder="Propose your solution"
                value={proposedSolution}
                onChange={(e) => setProposedSolution(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="impactAssessment"
                className="block text-sm font-medium text-gray-700"
              >
                Impact Assessment
              </label>
              <textarea
                id="impactAssessment"
                placeholder="Assess the potential impact"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                rows="3"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-3 text-white ${
                  isLoading ? "bg-gray-400" : "bg-gray-700 hover:bg-gray-600"
                } rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all`}
              >
                {isLoading ? "Submitting..." : "Submit Project"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-full px-4 py-3 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>
      ) : (
        // Render the list of projects only if we are not editing
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:-translate-y-2 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="font-medium text-gray-700">Problem: </span>
                {project.problemStatement}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium text-gray-700">Solution: </span>
                {project.proposedSolution}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">Extras: </span>
                {project.extra}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(project)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProjects;
