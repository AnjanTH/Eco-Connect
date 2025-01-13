import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectSubmission = () => {
  const [title, setTitle] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [extra, setImpactAssessment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/projects/create",
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

      // Toastify notification
      toast.success("Project created successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      // Show EcoCoin popup
      setShowPopup(true);

      // Wait for 3 seconds, then navigate to dashboard
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard");
      }, 3000);

      console.log("Project created:", response.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create project. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
      <div className="max-w-2xl w-full bg-white p-8 shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Submit Your Project
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
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
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
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
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
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
              value={extra}
              onChange={(e) => setImpactAssessment(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              rows="3"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-3 text-white ${
                isLoading ? "bg-gray-400" : "bg-gray-700 hover:bg-gray-600"
              } rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all`}
            >
              {isLoading ? "Submitting..." : "Submit Project"}
            </button>
          </div>
        </form>
      </div>

      {/* Toastify Container */}
      <ToastContainer />

      {/* EcoCoin Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-300 p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <img src="/Images/ecoCoin.jpeg" alt="EcoCoin" className="w-20 h-20 rounded"  />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">10 EcoCoins Added!</h3>
              <p className="text-sm text-gray-600">
                Your project has been submitted successfully, and you have received 10 EcoCoins.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSubmission;
