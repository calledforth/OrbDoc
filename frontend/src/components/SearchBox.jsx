import React from "react";
import "./SearchBox.css";

export default function SearchBox() {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [responseTerm, setResponseTerm] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm);
        fetch('http://127.0.0.1:5000/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: searchTerm }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setResponseTerm(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  return (
    <div className="container">
    <div className="response-box">
      {responseTerm}
    </div>
    <div id="poda">
      <div class="glow"></div>
      <div class="darkBorderBg"></div>
      <div class="darkBorderBg"></div>
      <div class="darkBorderBg"></div>

      <div class="white"></div>

      <div class="border"></div>

      <div id="main">
        <div id="input-mask"></div>
        <div id="pink-mask"></div>
        <div class="filterBorder"></div>
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
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
            height="24"
            fill="none"
            class="feather feather-search"
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
              <linearGradient gradientTransform="rotate(50)" id="search">
                <stop stop-color="#f8e7f8" offset="0%"></stop>
                <stop stop-color="#b6a9b7" offset="50%"></stop>
              </linearGradient>
              <linearGradient id="searchl">
                <stop stop-color="#b6a9b7" offset="0%"></stop>
                <stop stop-color="#837484" offset="50%"></stop>
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