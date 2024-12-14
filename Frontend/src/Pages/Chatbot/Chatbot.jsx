import React, { useState } from "react";
import axios from "axios";

function ChatBot() {
  const [messages, setMessages] = useState([]); // Messages between user and AI
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper function to format AI responses
  const formatResponse = (response) => {
    // Example: Replace `*` for bold and `\n` for line breaks
    return response
      .replace(/\*/g, "") // Remove asterisks
      .replace(/\n/g, "<br />") // Replace newlines with HTML line breaks
      .trim(); // Remove leading/trailing whitespace
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      alert("Please enter a message.");
      return;
    }

    // Add user's message to the chat
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true); // Start loading

    try {
      const { data } = await axios.post("http://localhost:8080/api/chatbot", { prompt: input });

      // Format the AI response
      const formattedResponse = formatResponse(data.response);

      // Add AI's formatted response to the chat
      const aiMessage = { text: formattedResponse, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = { text: "Failed to fetch response. Please try again.", sender: "ai" };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false); // End loading
    }

    setInput(""); // Clear input field
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center mt-5">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 border border-gray-300 flex flex-col">
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">AI Assistant</h1>
          <p className="text-gray-600">Ask anything and get instant assistance!</p>
        </header>

        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg space-y-4 border border-gray-200">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                dangerouslySetInnerHTML={{ __html: message.text }} // Render formatted text
              />
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs p-3 bg-gray-200 text-gray-800 rounded-lg">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Field */}
        <form onSubmit={handleSendMessage} className="mt-4 flex">
          <input
            type="text"
            className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
