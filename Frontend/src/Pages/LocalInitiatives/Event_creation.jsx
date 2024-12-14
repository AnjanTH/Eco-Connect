import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const EventCreationForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const [message, setMessage] = useState(""); // For success or error messages

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Event created successfully!"); // Display success alert
        setEvent({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
        });
        console.log("Event Created:", data);
        navigate("/dashboard"); // Navigate to the dashboard
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Create an Event</h1>
        <p className="text-lg text-gray-600 mt-2">Organize an environmental initiative!</p>
      </header>
      <main className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Title */}
          <div>
            <label htmlFor="title" className="block text-xl font-semibold text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={event.title}
              onChange={handleChange}
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Event Description */}
          <div>
            <label htmlFor="description" className="block text-xl font-semibold text-gray-700">
              Event Description
            </label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              rows="4"
              placeholder="Describe the event details"
              required
            />
          </div>

          {/* Event Date */}
          <div>
            <label htmlFor="date" className="block text-xl font-semibold text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Event Time */}
          <div>
            <label htmlFor="time" className="block text-xl font-semibold text-gray-700">
              Event Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          {/* Event Location */}
          <div>
            <label htmlFor="location" className="block text-xl font-semibold text-gray-700">
              Event Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={event.location}
              onChange={handleChange}
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter event location"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-200"
          >
            Create Event
          </button>
        </form>
      </main>
    </div>
  );
};

export default EventCreationForm;
