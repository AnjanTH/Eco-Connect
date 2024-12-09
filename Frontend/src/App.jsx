import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/AuthPage/SignIn';
import SignUp from './Pages/AuthPage/SignUp';
import ProjectSubmission from './Pages/CreateProject';
import UserProjects from './Pages/UserProjects';
import AllProjects from './Pages/Allprojects';
import Navbar from './components/Header/Navbar';
import DashboardLayoutBasic from './Pages/dashboard/Dashboard';
import EcoConnectHomePage from './Pages/Home/Home';

const App = () => {
  return (
    <Router>
      
      <div className="app-container">
        <Routes>
          <Route path="/" element={<EcoConnectHomePage/>}/>
          <Route path="/dashboard" element={<DashboardLayoutBasic/>}/>
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
