import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./SearchBox.css";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const scrollableAreaRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the scrollable area whenever the messages array changes
    if (scrollableAreaRef.current) {
      scrollableAreaRef.current.scrollTop =
        scrollableAreaRef.current.scrollHeight -
        scrollableAreaRef.current.clientHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add user's message to the messages array
    const userMessage = { text: searchTerm, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setSearchTerm("");
    setCurrentResponse(""); // Reset current response

    try {
      const response = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      const reader = response.body.getReader();
      let receivedData = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        receivedData += chunk;
        setCurrentResponse(receivedData); // Show current partial response
      }

      // Add chatbot's final response to the messages array
      const chatbotMessage = { text: receivedData, isUser: false };
      setMessages((prevMessages) => [...prevMessages, chatbotMessage]);
      setCurrentResponse(""); // Clear current response after final message is added

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="scrollable-area" ref={scrollableAreaRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? "user-msg" : "chatbot-msg"}`}
          >
            {message.isUser ? (
              message.text
            ) : (
              <ReactMarkdown>{message.text}</ReactMarkdown>
            )}
          </div>
        ))}
        {currentResponse && (
          <div className="message chatbot-msg">
            <ReactMarkdown>{currentResponse}</ReactMarkdown>
          </div>
        )}
      </div>
      <div id="poda">
        <div className="glow"></div>
        <div className="darkBorderBg"></div>
        <div className="darkBorderBg"></div>
        <div className="darkBorderBg"></div>

        <div className="white"></div>

        <div className="border"></div>

        <div id="main">
          <div id="input-mask"></div>
          <div id="pink-mask"></div>
          <div className="filterBorder"></div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
            <button id="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                height="24"
                fill="none"
                className="feather feather-search"
              >
                <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
                <line
                  stroke="url(#searchl)"
                  y2="16.65"
                  y1="22"
                  x2="16.65"
                  x1="22"
                ></line>
                <defs>
                  <linearGradient
                    gradientTransform="rotate(50)"
                    id="search"
                  >
                    <stop stopColor="#f8e7f8" offset="0%"></stop>
                    <stop stopColor="#b6a9b7" offset="50%"></stop>
                  </linearGradient>
                  <linearGradient id="searchl">
                    <stop stopColor="#b6a9b7" offset="0%"></stop>
                    <stop stopColor="#837484" offset="50%"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
