import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        if (Array.isArray(data)) setEvents(data);
        else throw new Error("Invalid API response format");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = ((hours % 12) || 12).toString();
    return `${formattedHours}:${minutes} ${period}`;
  };

  const sortedEvents = Array.isArray(events)
    ? events
        .map((event) => ({
          ...event,
          status: new Date(event.date) > new Date() ? "Upcoming" : "Closed",
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    : [];

  const handleRegister = (eventId) => {
    setRegisteredEvents((prev) => new Set(prev.add(eventId)));
    setPopupMessage("You have registered successfully and earned 10 EcoCoins!");

    setTimeout(() => setPopupMessage(null), 3000);

    fetch(`http://localhost:8080/api/eco-coins/register-event/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: "user_id" }), // Replace with actual user ID
    })
      .then((response) => response.json())
      .then((data) => setPopupMessage(`You have ${data.coins} EcoCoins!`))
      .catch((error) => console.error("Error registering for event:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Events</h1>
          <Link to="/create-event">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
              Create New Event
            </button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-lg text-blue-600">Loading events...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600">Error: {error}</p>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                  >
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600">{event.description}</p>
                      <p className="mt-4 text-lg text-gray-800">
                        <strong>Date:</strong> {event.date}{" "}
                        <strong>Time:</strong> {formatTime(event.time)}
                      </p>
                      <p className="mt-2 text-lg text-gray-800">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p
                        className={`mt-4 ${
                          event.status === "Upcoming"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {event.status === "Upcoming"
                          ? "This event is upcoming!"
                          : "This event is closed."}
                      </p>

                      {event.status === "Upcoming" &&
                        !registeredEvents.has(event._id) && (
                          <button
                            onClick={() => handleRegister(event._id)}
                            className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                          >
                            Register
                          </button>
                        )}

                      {event.status === "Upcoming" &&
                        registeredEvents.has(event._id) && (
                          <button
                            disabled
                            className="mt-auto bg-gray-500 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                          >
                            Registered
                          </button>
                        )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-lg text-gray-600">
                  No events scheduled.
                </p>
              )}
            </div>
          </div>
        )}

        {popupMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-lg">
              <p className="text-center text-blue-600">{popupMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
