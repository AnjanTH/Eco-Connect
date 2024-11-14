import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming token is stored in localStorage
        const response = await axios.get("http://localhost:8080/api/projects/user-projects", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Your Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.problemStatement}</p>
            <p>{project.proposedSolution}</p>
            <p>{project.extra}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProjects;
