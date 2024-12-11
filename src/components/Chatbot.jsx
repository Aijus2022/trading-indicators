// File: src/components/Chatbot.jsx
import React, { useState } from "react";
import { fetchData } from "../utils/api"; // Utility function for API calls

const Chatbot = () => {
  const [userInput, setUserInput] = useState(""); // User input state
  const [messages, setMessages] = useState([]); // Chat messages state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Function to fetch chatbot response
  const fetchChatResponse = async (input) => {
    const url = "https://yahoo-finance160.p.rapidapi.com/finbot"; // Chatbot API endpoint
    const host = "yahoo-finance160.p.rapidapi.com"; // RapidAPI host
    const apiKey = "3ae636fe26mshc2f8359d260fc59p1cd1d8jsn27515a485dec"; // Your RapidAPI key

    const body = {
      messages: [{ role: "user", content: input }],
      stock: "TSLA", // Example stock
      conversation_id: "", // Empty for new conversations
      period: "1mo", // Example period
    };

    try {
      setLoading(true);
      setError("");
      const response = await fetchData(url, {}, host, apiKey, body);
      const chatbotMessage =
        response.messages?.[0]?.content || "The chatbot couldn't process your request.";
      setMessages((prev) => [...prev, { sender: "bot", text: chatbotMessage }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for user input
  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add the user's message to the chat
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    fetchChatResponse(userInput); // Fetch chatbot response
    setUserInput(""); // Clear the input field
  };

  return (
    <div
      className="container"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#002F6C",
        color: "#FFFFFF",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 className="text-center" style={{ color: "#FEC20C" }}>
        Finance Chatbot
      </h1>
      <div
        className="card mt-4"
        style={{
          backgroundColor: "#FFFFFF",
          color: "#000000",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {/* Chat Window */}
        <div
          className="chat-window"
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                margin: "10px 0",
                textAlign: msg.sender === "user" ? "right" : "left",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor:
                    msg.sender === "user" ? "#002F6C" : "#FEC20C",
                  color: msg.sender === "user" ? "#FFFFFF" : "#000000",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        {loading && <p className="text-center text-primary mt-2">Loading...</p>}
        {error && <p className="text-danger text-center mt-2">{error}</p>}
        {/* User Input Form */}
        <form onSubmit={handleUserSubmit} className="mt-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Ask about a stock (e.g., Should I buy Tesla?)"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#FEC20C",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;


