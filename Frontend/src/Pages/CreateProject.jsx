import React, { useState } from "react";
import axios from "axios";

const ProjectSubmission = () => {
  const [title, setTitle] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [impactAssessment, setImpactAssessment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/projects/create",
        {
          title,
          problemStatement,
          proposedSolution,
          impactAssessment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Project created:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6">
      <div className="max-w-1xl w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">Submit Your Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-700">
              Problem Statement
            </label>
            <textarea
              id="problemStatement"
              placeholder="Describe the problem"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label htmlFor="proposedSolution" className="block text-sm font-medium text-gray-700">
              Proposed Solution
            </label>
            <textarea
              id="proposedSolution"
              placeholder="Propose your solution"
              value={proposedSolution}
              onChange={(e) => setProposedSolution(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label htmlFor="impactAssessment" className="block text-sm font-medium text-gray-700">
              Impact Assessment
            </label>
            <textarea
              id="impactAssessment"
              placeholder="Assess the potential impact"
              value={impactAssessment}
              onChange={(e) => setImpactAssessment(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              rows="3"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
            >
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectSubmission;
