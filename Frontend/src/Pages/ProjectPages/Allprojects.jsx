import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ id, title, problemStatement, proposedSolution, extra, submittedBy }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${id}`, {
      state: {
        id,
        title,
        problemStatement,
        proposedSolution,
        extra,
        submittedBy,
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="relative bg-white px-6 py-10 sm:py-16 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
        <p className="mt-4 text-gray-600">
          <strong>Problem Statement:</strong> {problemStatement}
        </p>
        <p className="mt-4 text-gray-600">
          <strong>Proposed Solution:</strong> {proposedSolution}
        </p>
        <div className="mt-6 text-sm text-gray-800">
          Submitted by: <strong>{submittedBy}</strong>
        </div>
        <button
          onClick={handleClick}
          className="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/projects/all-projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching all projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative bg-gray-50 px-6 py-24 sm:py-32 lg:px-0">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          All Projects
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Discover the innovative solutions submitted by our users.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-8 mx-auto max-w-2xl text-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Projects Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-10 mt-16">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              title={project.title}
              problemStatement={project.problemStatement}
              proposedSolution={project.proposedSolution}
              extra={project.extra}
              submittedBy={project.user?.username || project.username}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
