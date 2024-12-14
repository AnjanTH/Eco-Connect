import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProjects = () => {
  const [projects, setProjects] = useState([]);

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
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Projects
      </h2>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProjects;
