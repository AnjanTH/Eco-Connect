import React, { useState } from 'react';
import axios from 'axios';

const ProjectSubmission = () => {
  const [title, setTitle] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [impactAssessment, setImpactAssessment] = useState(''); // New state

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in local storage after login
      const response = await axios.post(
        'http://localhost:8080/api/projects/create',
        {
          title,
          problemStatement,
          proposedSolution,
          impactAssessment, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        }
      );
  
      console.log('Project created:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="project-submission-container">
      <h2>Submit Your Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Problem Statement"
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          required
        />
        <textarea
          placeholder="Proposed Solution"
          value={proposedSolution}
          onChange={(e) => setProposedSolution(e.target.value)}
          required
        />
        <textarea
          placeholder="Impact Assessment" 
          value={impactAssessment}
          onChange={(e) => setImpactAssessment(e.target.value)}
          required
        />
        <button type="submit">Submit Project</button>
      </form>
    </div>
  );
};

export default ProjectSubmission;
