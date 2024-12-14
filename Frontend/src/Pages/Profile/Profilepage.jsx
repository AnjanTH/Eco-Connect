import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams(); // Get user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        

        const response = await fetch(`http://localhost:8080/api/user/${id}`); // Use the dynamic ID here
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log(data)
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]); // Re-run the effect when the ID changes

  const renderProfileImage = () => {
    if (user?.profileImage) {
      return (
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
      );
    } else {
      return (
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
          {user?.username ? user.username.charAt(0).toUpperCase() : "?"}
        </div>
      );
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!user) {
    return <p className="text-center text-red-600">No user data available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          {renderProfileImage()}
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user?.username || "Unknown User"}</h2>
          <p className="text-gray-600">{user?.email || "No email provided"}</p>
        </div>

        <div className="mt-6">
          <p className="text-lg">
            <strong>Phone:</strong> {user?.phone || "No phone number provided"}
          </p>
          <p className="text-lg">
            <strong>Address:</strong> {user?.address || "No address provided"}
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => alert("Edit Profile")}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
