import React, { useState } from "react";
import axios from "axios";
import stockSymbols from "../data/stockSymbols.json"; // Import JSON file

const Options = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(stockSymbols[0].value); // Default to the first symbol
  const [optionsData, setOptionsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch options data
  const fetchOptionsData = async () => {
    const options = {
      method: "GET",
      url: "https://yh-finance.p.rapidapi.com/stock/v3/get-options",
      params: {
        symbol: selectedSymbol,
        region: "US", // Default region
        lang: "en-US", // Default language
        straddle: "true", // Include straddle data
      },
      headers: {
        "x-rapidapi-key": "3ae636fe26mshc2f8359d260fc59p1cd1d8jsn27515a485dec",
        "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      setError("");
      const response = await axios.request(options);
      setOptionsData(response.data?.optionChain?.result || []);
    } catch (err) {
      console.error("Error fetching options data:", err);
      setError("Failed to fetch options data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {/* Page Title */}
      <h1 className="text-center fw-bold mb-4" style={{ color: "#2E8B57", fontSize: "3rem" }}>
        Options Data
      </h1>

      {/* Dropdown for Stock Symbols */}
      <div className="mb-4">
        <label
          htmlFor="symbolDropdown"
          className="form-label fw-bold"
          style={{ fontSize: "1.2rem", color: "#DAA520" }}
        >
          Select a Stock:
        </label>
        <select
          id="symbolDropdown"
          className="form-select shadow-sm"
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
          style={{
            fontSize: "1.1rem",
            borderColor: "#2E8B57",
            backgroundColor: "#F9F9F9",
          }}
        >
          {stockSymbols.map((stock) => (
            <option key={stock.value} value={stock.value}>
              {stock.label}
            </option>
          ))}
        </select>
        <button
          className="btn mt-3 shadow"
          onClick={fetchOptionsData}
          disabled={loading}
          style={{
            backgroundColor: "#2E8B57",
            color: "white",
            fontSize: "1.2rem",
            padding: "10px 20px",
          }}
        >
          {loading ? "Loading..." : "Fetch Options"}
        </button>
      </div>

      {/* Options Data Display */}
      <div className="mt-4">
        {optionsData && optionsData.length > 0 ? (
          optionsData.map((option, index) => (
            <div
              className="card shadow-lg mb-3"
              key={index}
              style={{
                borderColor: "#DAA520",
                backgroundColor: "#F9F9F9",
              }}
            >
              <div
                className="card-header text-white"
                style={{
                  backgroundColor: "#2E8B57",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Options Data for {selectedSymbol}
              </div>
              <div className="card-body">
                <p>
                  <strong>Symbol:</strong> {option.quote?.symbol || "N/A"}
                </p>
                <p>
                  <strong>Expiration Dates:</strong>{" "}
                  {option.expirationDates
                    ? option.expirationDates.map((date) =>
                        new Date(date * 1000).toLocaleDateString()
                      ).join(", ")
                    : "No expiration dates available"}
                </p>
                <p>
                  <strong>Region:</strong> {option.quote?.region || "N/A"}
                </p>
                <p>
                  <strong>Quote Type:</strong> {option.quote?.quoteType || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            className="text-center"
            style={{ fontSize: "1.2rem", color: "#6c757d" }}
          >
            Select a stock and click "Fetch Options" to view options data.
          </div>
        )}
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default Options;
