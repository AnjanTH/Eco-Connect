import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from "react-router-dom";

function EcoConnectHomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">

      {/* Header with Background Image */}
      <section
  className="relative bg-cover bg-center text-white h-screen"
  style={{
    backgroundImage: "url('/Images/earths.jpg')",
    backgroundSize: 'contain', // Adjust the size of the image
    backgroundRepeat: 'no-repeat', // Prevent image repetition
    backgroundPosition: 'center', // Keep the image centered
  }}
>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <header className="relative z-10 p-6">
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
          onClick={() => window.scrollTo(0, 0)} // Scroll to top (Home)
        >
          Home
        </button>
        <button
          className="text-white hover:text-teal-200 transition-colors"
          onClick={() => document.getElementById("about-section").scrollIntoView({ behavior: "smooth" })}
        >
          About
        </button>
        <button
          className="text-white hover:text-teal-200 transition-colors"
          onClick={() => document.getElementById("environment-section").scrollIntoView({ behavior: "smooth" })}
        >
          Environment
        </button>
        <button
          className="text-white hover:text-teal-200 transition-colors"
          onClick={() => document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" })}
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

  {/* Hero Section Content */}
  <div className="relative flex items-center justify-center h-full text-center z-10">
    <div>
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
  </div>
</section>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {/* Collaborate */}
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-teal-600">Collaborate</h3>
            <p>Connect with others to drive environmental projects and make an impact together.</p>
          </div>
          {/* Gamification */}
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-teal-600">Gamification</h3>
            <p>Earn points and badges by participating in environmental initiatives and completing challenges.</p>
          </div>
          {/* Leaderboard */}
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-teal-600">Leaderboard</h3>
            <p>See where you stand among top contributors and earn recognition for your climate actions.</p>
          </div>
        </div>
      </section>

      {/* Environment Section */}
      <section id="environment-section" className="py-20 bg-green-100 text-center">
  <h2 className="text-4xl font-semibold text-teal-600 mb-6">Our Environment is at Risk</h2>
  <p className="text-lg mb-6">
    Carbon emissions and pollution are contributing to global warming, climate change, and natural disasters.
    It's crucial to take collective action to protect our environment for future generations.
  </p>
  <img
    src="/Images/risks.png" // Replace with an appropriate environmental image
    alt="Environment"
    className="mx-auto w-2/3 h-auto object-cover rounded-lg" // Decrease width to 66% and maintain aspect ratio
  />
</section>

      {/* About Section */}
      <section id="about-section" className="py-20 bg-white text-center">
        <h2 className="text-4xl font-semibold text-teal-600 mb-6">About EcoConnect</h2>
        <p className="text-lg">
          EcoConnect is a platform that empowers individuals and communities to collaborate on environmental initiatives.
          By joining forces, we aim to create a sustainable future through collective climate action and community-driven projects.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl font-semibold text-teal-600 mb-6">Contact Us</h2>
        <p className="text-lg mb-6">
          Have any questions or suggestions? Reach out to us, and we'll be happy to connect with you.
        </p>
        <button
          className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg"
          onClick={() => navigate("/contact")}
        >
          Contact Form
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white w-full py-4 text-center mt-10">
        <p>&copy; 2024 EcoConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default EcoConnectHomePage;
