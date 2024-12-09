import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from "react-router-dom";

function EcoConnectHomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1
            className="text-3xl font-bold text-white cursor-pointer hover:text-teal-200 transition-colors"
            onClick={() => navigate("/")}
          >
            EcoConnect
          </h1>
          <nav className="flex-grow flex justify-center gap-6 text-lg">
            <button
              className="text-white hover:text-teal-200 transition-colors"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="text-white hover:text-teal-200 transition-colors"
              onClick={() => navigate("/about")}
            >
              About
            </button>
            <button
              className="text-white hover:text-teal-200 transition-colors"
              onClick={() => navigate("/projects")}
            >
              Projects
            </button>
            <button
              className="text-white hover:text-teal-200 transition-colors"
              onClick={() => navigate("/contact")}
            >
              Contact
            </button>
          </nav>
          <div className="ml-auto">
            <button
              className="text-white hover:text-teal-200 transition-colors mr-4"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="text-white hover:text-teal-200 transition-colors"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section
        className="relative bg-cover bg-center text-white py-36"
        style={{
          backgroundImage: "url('https://www.w3schools.com/w3images/mountains.jpg')", // Replace with your background image URL
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-2xl mx-auto text-center z-10">
          <h2 className="text-5xl font-extrabold tracking-tight">
            <Typewriter
              words={['Welcome to EcoConnect']}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <p className="text-xl mt-4">A Crowdsourced Platform for Collective Climate Action</p>
          <button
            className="mt-8 px-10 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl shadow-md transform hover:scale-105 transition-all"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-teal-600">Collaborate</h3>
            <p>Connect with others to drive environmental projects and make an impact together.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-teal-600">Fundraise</h3>
            <p>Support climate initiatives by raising funds for disaster relief and sustainable development.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-teal-600">Engage</h3>
            <p>Join discussions, participate in events, and contribute your skills to climate action.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-700 text-white py-8 mt-16 text-center">
        <p>&copy; {new Date().getFullYear()} EcoConnect. All rights reserved.</p>
        <div className="mt-3">
          <a href="#" className="mx-4 hover:text-teal-200 transition-colors">Privacy Policy</a>
          <a href="#" className="mx-4 hover:text-teal-200 transition-colors">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default EcoConnectHomePage;
