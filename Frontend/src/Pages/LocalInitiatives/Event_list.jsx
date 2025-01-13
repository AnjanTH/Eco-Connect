import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [popupMessage, setPopupMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
          setFilteredEvents(data); // Initialize filtered events
        } else {
          throw new Error("Invalid API response format");
        }
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

  const handleSearch = (query) => {
    setSearchQuery(query);

    const lowerCaseQuery = query.toLowerCase();
    const filtered = events.filter(
      (event) =>
        event.location.toLowerCase().includes(lowerCaseQuery) ||
        event.date.includes(lowerCaseQuery)
    );

    setFilteredEvents(filtered);
  };

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

  const sortedEvents = filteredEvents.map((event) => ({
    ...event,
    status: new Date(event.date) > new Date() ? "Upcoming" : "Closed",
  }));

  const upcomingEvents = sortedEvents.filter(
    (event) => event.status === "Upcoming"
  );
  const closedEvents = sortedEvents.filter((event) => event.status === "Closed");

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Events</h1>
          <Link to="/create-event">
            <button className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200">
              Create New Event
            </button>
          </Link>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by location or date..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <p className="text-center text-lg text-blue-600">Loading events...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600">Error: {error}</p>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 ${
                      event.location.toLowerCase().includes(
                        searchQuery.toLowerCase()
                      )
                        ? "border-2 border-gray-500"
                        : ""
                    }`}
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
                      <p className="mt-4 text-green-600">
                        This event is upcoming!
                      </p>
                      <button
                        onClick={() => handleRegister(event._id)}
                        className="mt-5 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-lg text-gray-600">
                  No upcoming events found.
                </p>
              )}
            </div>

            <h2 className="text-3xl font-semibold text-gray-700 mt-10 mb-6">
              Closed Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {closedEvents.length > 0 ? (
                closedEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
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
                      <p className="mt-4 text-gray-500">This event is closed.</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-lg text-gray-600">
                  No closed events found.
                </p>
              )}
            </div>
          </>
        )}

       
      </div>
    </div>
  );
};

export default EventList;
