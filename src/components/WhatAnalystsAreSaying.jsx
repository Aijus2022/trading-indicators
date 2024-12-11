import React, { useState } from "react";
import axios from "axios";
import stockSymbols from "../data/stockSymbols.json"; // Import stock symbols JSON

const WhatAnalystsAreSaying = () => {
  const [selectedSymbols, setSelectedSymbols] = useState(["AAPL"]); // Default selected symbol
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalystData = async () => {
    const symbols = selectedSymbols.join(","); // Combine selected symbols into a comma-separated string
    const options = {
      method: "GET",
      url: "https://yh-finance.p.rapidapi.com/stock/get-what-analysts-are-saying",
      params: {
        symbols, // Dynamically include selected symbols
        region: "US",
        lang: "en-US",
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
      console.log(response.data); // Debugging API response
      setData(response.data?.result?.[0]?.hits || []); // Extract and set the data
    } catch (error) {
      console.error("Error fetching analyst data:", error);
      setError("Failed to fetch analyst data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSymbolChange = (e) => {
    setSelectedSymbols([e.target.value]); // Update selected symbol
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold mb-4" style={{ color: "#2E8B57", fontSize: "3rem" }}>
        What Analysts Are Saying
      </h1>

      {/* Dropdown for Stock Symbols */}
      <div className="mb-4">
        <label
          htmlFor="tickerDropdown"
          className="form-label fw-bold"
          style={{ fontSize: "1.2rem", color: "#DAA520" }}
        >
          Select a Stock:
        </label>
        <select
          id="tickerDropdown"
          className="form-select shadow-sm"
          value={selectedSymbols[0]} // Current selected symbol
          onChange={handleSymbolChange}
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
      </div>

      {/* Fetch Data Button */}
      <div className="text-center mb-4">
        <button
          className="btn mt-3 shadow"
          onClick={fetchAnalystData}
          disabled={loading}
          style={{ backgroundColor: "#2E8B57", color: "white", fontSize: "1.2rem", padding: "10px 20px" }}
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Analyst Data Display */}
      <div className="mt-4">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="card shadow-lg mb-4" style={{ borderColor: "#DAA520", backgroundColor: "#F9F9F9" }}>
              <div className="card-header text-white" style={{ backgroundColor: "#2E8B57", fontSize: "1.5rem" }}>
                {item?.report_title || "Report Title: N/A"}
              </div>
              <div className="card-body">
                <p><strong>Company:</strong> {item?.company_name || "N/A"}</p>
                <p><strong>Author:</strong> {item?.author || "N/A"}</p>
                <p><strong>Report Type:</strong> {item?.report_type || "N/A"}</p>
                <p><strong>Investment Rating:</strong> {item?.investment_rating || "N/A"} ({item?.investment_rating_status || "Status: N/A"})</p>
                <p><strong>Target Price:</strong> {item?.target_price ? `$${item.target_price}` : "N/A"} ({item?.target_price_status || "Status: N/A"})</p>
                <p><strong>Abstract:</strong> {item?.abstract || "N/A"}</p>
                <p><strong>Provider:</strong> {item?.provider || "N/A"}</p>
                <p><strong>Tickers:</strong> {item?.ticker?.join(", ") || "N/A"}</p>
                <p><strong>Report Date:</strong> {item?.report_date ? new Date(item.report_date).toLocaleDateString() : "N/A"}</p>

                {/* Snapshot Image */}
                {item?.snapshot_url && (
                  <div>
                    <img
                      src={item.snapshot_url}
                      alt="Snapshot"
                      style={{ width: "100%", maxWidth: "300px", borderRadius: "8px", marginBottom: "10px" }}
                    />
                  </div>
                )}

                {/* Links */}
                {item?.pdf_url && (
                  <p>
                    <a href={item.pdf_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      View Full Report
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted" style={{ fontSize: "1.2rem" }}>
            {loading ? "Fetching data..." : "No data fetched yet."}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatAnalystsAreSaying;


