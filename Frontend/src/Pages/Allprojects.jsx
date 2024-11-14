import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>All Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.problemStatement}</p>
            <p>{project.proposedSolution}</p>
            <p>Submitted by: {project.user?.username || project.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProjects;
