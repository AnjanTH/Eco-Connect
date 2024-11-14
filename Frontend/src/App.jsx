import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/AuthPage/SignIn';
import SignUp from './Pages/AuthPage/SignUp';
import ProjectSubmission from './Pages/CreateProject';
import UserProjects from './Pages/UserProjects';
import AllProjects from './Pages/Allprojects';
import Navbar from './components/Header/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <div className="app-container">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<ProjectSubmission />} />
          <Route path="/user/your-projects" element={<UserProjects />} />
          <Route path="/all-projects" element={<AllProjects />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
