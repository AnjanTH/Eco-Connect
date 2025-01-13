import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EnvironmentalImpactChart from "../Graphs/Graph";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS animations
    AOS.refresh();

    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem("userId"); // Get the user id from localStorage
        if (!id) {
          console.error("User ID not found in localStorage");
          navigate("/signin"); // Redirect if user ID is not found
          return;
        }

        // Make the API call to fetch the user data
        const response = await fetch(`http://localhost:8080/api/user/${id}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          console.error("Failed to fetch user data:", data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row mt-20 p-6 md:p-8 bg-white rounded-lg shadow-md items-center">
        <div className="welcome-section flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Welcome, {userData?.username || "User"}!
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Welcome to your EcoConnect dashboard.
          </p>
        </div>
        <div className="image-section flex-1 mt-6 md:mt-0">
          <img
            src="/Images/EcoConnect.jpg"
            alt="Welcome"
            className="mx-auto rounded-lg"
            style={{ maxWidth: "300px", height: "auto" }}
          />
        </div>
      </div>

      {/* Environmental Impact Chart */}
      <div className="environment-impact-chart mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-center text-green-700 mb-6">
          Environmental Impact Breakdown
        </h2>
        <EnvironmentalImpactChart />
      </div>

      {/* How Our Planet is Being Affected */}
      <div className="environment-section mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="image-container flex justify-center">
          <img
            src="/Images/world.avif"
            alt="Save Environment"
            className="rounded-lg shadow-md"
            style={{ width: "100%", maxWidth: "400px", height: "auto" }}
          />
        </div>
        <div className="content-container flex flex-col justify-center">
          <h2 className="text-lg md:text-2xl font-bold text-green-700 mb-4">
            How Our Planet is Being Affected
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Earth is facing unprecedented challenges due to human activities.
            Deforestation, pollution, and climate change are disrupting ecosystems
            and threatening biodiversity. Rising sea levels and extreme weather
            events are directly impacting millions of lives.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Addressing these challenges requires immediate action and
            collaboration. Every small step contributes to building a sustainable
            future for generations to come.
          </p>
        </div>
      </div>

      {/* Action Blocks */}
      <div className="environment-section mt-12 space-y-12">
        {/* Action Block 1 */}
        <div className="action-block bg-green-50 p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-bold text-green-600 mb-4 text-center">
            "The Earth is what we all have in common."
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Create impactful projects to tackle environmental challenges like
            pollution and climate change. Share your ideas to inspire others.
          </p>
          <div className="text-center">
            <Link
              to="/create"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Create a Project
            </Link>
          </div>
        </div>

        {/* Action Block 2 */}
        <div className="action-block bg-blue-50 p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4 text-center">
            "Coming together is a beginning, staying together is progress."
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Collaborate with others to create sustainable solutions. Join hands
            with like-minded individuals.
          </p>
          <div className="text-center">
            <Link
              to="/all-projects"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Collaborate on Projects
            </Link>
          </div>
        </div>

        {/* Action Block 3 */}
        <div className="action-block bg-purple-50 p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-purple-600 mb-4 text-center">
            "The best way to predict the future is to create it."
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Organize community events like tree planting drives or cleanup
            campaigns. Lead the change and inspire others to act.
          </p>
          <div className="text-center">
            <Link
              to="/create-event"
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Create an Event
            </Link>
          </div>
        </div>

        {/* Action Block 4 */}
        <div className="action-block bg-yellow-50 p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-yellow-600 mb-4 text-center">
            "Never doubt that a small group of thoughtful, committed citizens
            can change the world."
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Participate in local initiatives to make an impact. Join efforts in
            your community and contribute to a greener planet.
          </p>
          <div className="text-center">
            <Link
              to="/eventlist"
              className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
            >
              Join Local Initiatives
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
