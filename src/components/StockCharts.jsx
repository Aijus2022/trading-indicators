import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import stockSymbols from "../data/stockSymbols.json"; // Import JSON file

const StockCharts = () => {
  const [ticker, setTicker] = useState(stockSymbols[0].value); // Default to the first symbol
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchChartData = async () => {
    const url = `https://yh-finance.p.rapidapi.com/stock/v3/get-chart`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f1bc2f5ce0mshe48349c94c8f8c0p11b50ejsnab48d432745c", // Replace with your RapidAPI key
        "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      },
      params: {
        interval: "1mo",
        symbol: ticker,
        range: "5y",
        region: "US",
        includePrePost: "false",
        useYfid: "true",
        includeAdjustedClose: "true",
        events: "capitalGain,div,split",
      },
    };

    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `${url}?interval=${options.params.interval}&symbol=${ticker}&range=${options.params.range}&region=${options.params.region}&includePrePost=${options.params.includePrePost}&useYfid=${options.params.useYfid}&includeAdjustedClose=${options.params.includeAdjustedClose}&events=${options.params.events}`,
        options
      );
      const result = await response.json();
      if (result.chart?.result) {
        setChartData(formatChartData(result));
      } else {
        setError("No chart data available for the selected ticker.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch chart data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatChartData = (data) => {
    const timestamps = data.chart.result[0].timestamp.map((ts) =>
      new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    );
    const prices = data.chart.result[0].indicators.adjclose[0].adjclose;

    return {
      labels: timestamps,
      datasets: [
        {
          label: "Stock Price (USD)",
          data: prices,
          borderColor: "#2E8B57", // Royal Green
          backgroundColor: "rgba(46, 139, 87, 0.2)", // Light Green
          tension: 0.1,
        },
      ],
    };
  };

  const handleFetch = () => {
    fetchChartData();
  };

  return (
    <div className="container mt-5">
      {/* Page Title */}
      <h1
        className="text-center fw-bold mb-4"
        style={{ color: "#2E8B57", fontSize: "3rem" }}
      >
        Stock Price Charts
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
          onClick={handleFetch}
          disabled={loading}
          style={{
            backgroundColor: "#2E8B57",
            color: "white",
            fontSize: "1.2rem",
            padding: "10px 20px",
          }}
        >
          {loading ? "Loading..." : "Fetch Chart"}
        </button>
      </div>

      {/* Chart Display */}
      <div
        className="border rounded-3 p-4 shadow"
        style={{ backgroundColor: "#F9F9F9", borderColor: "#DAA520" }}
      >
        {chartData ? (
          <Line data={chartData} options={{ responsive: true }} />
        ) : (
          <div
            className="text-center"
            style={{ fontSize: "1.2rem", color: "#6c757d" }}
          >
            Select a stock and click "Fetch Chart" to see the chart.
          </div>
        )}
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default StockCharts;

