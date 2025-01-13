import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { id } = useParams(); // Get user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          ecocoins:data.ecocoins,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setUser(updatedUser); // Update the user data
      setEditing(false); // Exit edit mode

      // Show success toast
      toast.success("Profile updated successfully!");

      // Re-fetch user data to ensure the profile is updated
      const refreshedUserResponse = await fetch(`http://localhost:8080/api/user/${id}`);
      const refreshedUserData = await refreshedUserResponse.json();
      setUser(refreshedUserData);
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to update profile. Please try again.");
    }
  };

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
        <div className="w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-2xl">
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
        <ToastContainer position="top-center" autoClose={3000} />
        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center">
              {renderProfileImage()}
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                {user?.username || "Unknown User"}
              </h2>
              <p className="text-gray-600">{user?.email || "No email provided"}</p>
            </div>
            <div className="mt-6">
              <p className="text-md">
                <strong>Phone:</strong> {user?.phone || "No phone number provided"}
              </p>
              <p className="text-md">
                <strong>Address:</strong> {user?.address || "No address provided"}
              </p>
              <div className="flex items-center justify-center mt-10">
                
                 
                 <span>
                 <p className="text-8xl">
                <strong></strong> {user?.ecocoins || "No address provided"}
              </p>
                 </span>

                 <img src="/Images/ecoCoin.jpeg" alt="" srcset="" className="h-10 w-10" />
              <p>co Eoins</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
