import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectCard = ({ title, problemStatement, proposedSolution, submittedBy }) => (
  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
    <div className="px-5 pb-5">
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{problemStatement}</p>
      <p className="mt-2 text-gray-500 dark:text-gray-400">{proposedSolution}</p>
      <div className="mt-4 text-sm text-gray-800 dark:text-gray-200">
        Submitted by: <strong>{submittedBy}</strong>
      </div>
    </div>
  </div>
);

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/projects/all-projects");
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching all projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Projects</h2>
      <div className="flex flex-wrap justify-center">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            title={project.title}
            problemStatement={project.problemStatement}
            proposedSolution={project.proposedSolution}
            submittedBy={project.user?.username || project.username}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
