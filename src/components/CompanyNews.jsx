import React, { useState } from "react";
import stockSymbols from "../data/stockSymbols.json"; // Adjust the path to your JSON file

const CompanyNews = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(""); // For storing the selected company symbol
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanyNews = async () => {
    if (!selectedSymbol) {
      setError("Please select a company.");
      return;
    }
    const apiKey = "ct9qmbhr01quh43on4b0ct9qmbhr01quh43on4bg"; // Replace with your Finnhub API key
    const url = `https://finnhub.io/api/v1/company-news?symbol=${selectedSymbol}&from=2024-01-01&to=2024-12-31&token=${apiKey}`;

    setLoading(true);
    setError(null);
    setNews([]);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        setError("No news found for this company.");
      } else {
        setNews(data);
      }
    } catch (error) {
      setError("Failed to fetch company news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Search Company News</h2>

      {/* Dropdown for Company Names */}
      <div className="mb-3">
        <label htmlFor="companySelect" className="form-label">
          Select a Company:
        </label>
        <select
          id="companySelect"
          className="form-select"
          size="10" // Makes it scrollable
          onChange={(e) => setSelectedSymbol(e.target.value)}
        >
          <option value="">-- Select a Company --</option>
          {stockSymbols.map((stock, index) => (
            <option key={index} value={stock.value}>
              {stock.label}
            </option>
          ))}
        </select>
      </div>

      {/* Fetch News Button */}
      <button
        className="btn btn-primary mb-4"
        onClick={fetchCompanyNews}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get News"}
      </button>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* News Section */}
      {!loading && !error && news.length > 0 && (
        <div>
          <h3 className="text-center mb-4">News for {selectedSymbol}</h3>
          {news.map((article, index) => (
            <div
              key={index}
              className="card mb-3 shadow-sm"
              style={{
                padding: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                {/* Image Section */}
                <div
                  style={{
                    flex: "0 0 50%",
                    marginBottom: "1rem",
                    padding: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={article.image}
                    alt={article.headline}
                    style={{
                      width: "70%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "5px",
                      margin: "auto",
                    }}
                  />
                </div>

                {/* Text Section */}
                <div
                  style={{
                    flex: "1 0 auto",
                    padding: "0.5rem",
                  }}
                >
                  <h5 className="card-title">{article.headline}</h5>
                  <p className="card-text">
                    <strong>Source:</strong> {article.source}
                  </p>
                  <p className="card-text">{article.summary}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    Read Full Article
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyNews;



