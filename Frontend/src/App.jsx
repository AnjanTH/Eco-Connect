import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/AuthPage/SignIn';
import SignUp from './Pages/AuthPage/SignUp';
import ProjectSubmission from './Pages/ProjectPages/CreateProject';
import UserProjects from './Pages/ProjectPages/UserProjects';
import AllProjects from './Pages/ProjectPages/Allprojects';

import DashboardLayoutBasic from './Pages/dashboard/Dashboard';
import EcoConnectHomePage from './Pages/Home/Home';
import ProjectView from './Pages/ProjectPages/View';
import CollaboratePage from './Pages/ProjectPages/Collaborate';

import VideoPage from './Pages/conferencePage/video';
import ChatBot from './Pages/Chatbot/Chatbot';
import Leaderboard from './Pages/LeaderBoard/Leaderboard';
import EventCreationForm from './Pages/LocalInitiatives/Event_creation';
import EventList from './Pages/LocalInitiatives/Event_list';
import Layout from "./components/Layout";
import Profile from './Pages/Profile/Profilepage';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Route (Doesn't need Layout) */}
          <Route path="/" element={<EcoConnectHomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
         
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardLayoutBasic />} />
           
            <Route path="/create" element={<ProjectSubmission />} />
            <Route path="/user/your-projects" element={<UserProjects />} />
            <Route path="/all-projects" element={<AllProjects />} />
            <Route path="/project/:id" element={<ProjectView />} />
            <Route path="/project/:id/collaborate" element={<CollaboratePage />} />
            <Route path="/room/:roomCode" element={<VideoPage />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/create-event" element={<EventCreationForm />} />
            <Route path="/eventlist" element={<EventList />} />
            <Route path="/user/profile/:id" element={<Profile/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
