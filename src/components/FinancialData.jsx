import React, { useState } from "react";
import axios from "axios";
import stockSymbols from "../data/stockSymbols.json"; // Import JSON file

const FinancialData = () => {
  const [ticker, setTicker] = useState(stockSymbols[0].value); // Default to the first symbol
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFinancialData = async () => {
    const options = {
      method: "GET",
      url: "https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules",
      params: { ticker, module: "financial-data" },
      headers: {
        "x-rapidapi-key": "f1bc2f5ce0mshe48349c94c8f8c0p11b50ejsnab48d432745c",
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      setError("");
      const response = await axios.request(options);
      setData(response.data.body);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch financial data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {/* Page Title */}
      <h1
        className="text-center fw-bold mb-4"
        style={{ color: "#2E8B57", fontSize: "3rem" }}
      >
        Financial Data
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
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
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
          onClick={fetchFinancialData}
          disabled={loading}
          style={{
            backgroundColor: "#2E8B57",
            color: "white",
            fontSize: "1.2rem",
            padding: "10px 20px",
          }}
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      {/* Financial Data Display */}
      <div className="mt-4">
        {data ? (
          <div
            className="card shadow-lg"
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
              Financial Data for {ticker}
            </div>
            <div className="card-body">
              <table
                className="table table-striped"
                style={{ fontSize: "1.1rem" }}
              >
                <thead>
                  <tr>
                    <th style={{ color: "#2E8B57" }}>Metric</th>
                    <th style={{ color: "#DAA520" }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Current Price</td>
                    <td>${data?.currentPrice?.fmt || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Target High Price</td>
                    <td>${data?.targetHighPrice?.fmt || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Target Low Price</td>
                    <td>${data?.targetLowPrice?.fmt || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Target Median Price</td>
                    <td>${data?.targetMedianPrice?.fmt || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Recommendation</td>
                    <td>{data?.recommendationKey || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Earnings Growth</td>
                    <td>{data?.earningsGrowth?.fmt || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Revenue Growth</td>
                    <td>{data?.revenueGrowth?.fmt || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Return on Equity</td>
                    <td>{data?.returnOnEquity?.fmt || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Total Cash</td>
                    <td>${data?.totalCash?.fmt || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Total Debt</td>
                    <td>${data?.totalDebt?.fmt || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className="text-center"
            style={{ fontSize: "1.2rem", color: "#6c757d" }}
          >
            Select a stock and click "Fetch Data" to view financial details.
          </div>
        )}
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default FinancialData;


