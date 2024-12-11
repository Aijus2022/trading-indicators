import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import cryptoSymbols from "../data/cryptoSymbols.json"; // Import cryptoSymbols.json

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CryptoIndicators = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(cryptoSymbols[0]?.id || ""); // Default to the first symbol
  const [cryptoData, setCryptoData] = useState(null); // API data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data for the selected cryptocurrency
  useEffect(() => {
    if (!selectedSymbol) return;

    const fetchCryptoData = async () => {
      setLoading(true);
      setError(null);
      setCryptoData(null);

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedSymbol}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: 7, // Data for the last 7 days
            },
          }
        );
        setCryptoData(response.data);
      } catch (error) {
        setError("Error fetching cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [selectedSymbol]);

  // Prepare data for charts
  const prepareChartData = (data, label) => {
    return {
      labels: data.map((item) => new Date(item[0]).toLocaleString()), // Convert timestamps to readable format
      datasets: [
        {
          label: label,
          data: data.map((item) => item[1]),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(45, 122, 182, 0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  return (
    <div className="container mt-4">
       <h1 className="text-center fw-bold mb-4" style={{ color: "#2E8B57", fontSize: "3rem" }}>Cryptocurrency Indicators</h1>

      {/* Dropdown for Selecting Cryptocurrency */}
      <div className="mb-3">
        <label htmlFor="cryptoDropdown" className="form-label fw-bold">
          Select a Cryptocurrency:
        </label>
        <select
          id="cryptoDropdown"
          className="form-select shadow-sm"
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
        >
          {cryptoSymbols.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.label}
            </option>
          ))}
        </select>
      </div>

      {/* Display Cryptocurrency Data */}
      <div className="mt-4">
        {loading ? (
          <div className="text-center text-muted">
            <div className="spinner-border" role="status"></div>
            <p>Loading data...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : cryptoData ? (
          <>
            {/* Line Chart for Prices */}
            <div style={{ width: "80%", margin: "2rem auto" }}>
              <h2>Price Trends (USD)</h2>
              <Line data={prepareChartData(cryptoData.prices, "Prices (USD)")} />
            </div>

            {/* Bar Chart for Market Caps */}
            <div style={{ width: "80%", margin: "2rem auto" }}>
              <h2>Market Caps (USD)</h2>
              <Bar data={prepareChartData(cryptoData.market_caps, "Market Caps (USD)")} />
            </div>

            {/* Bar Chart for Total Volumes */}
            <div style={{ width: "80%", margin: "2rem auto" }}>
              <h2>Total Volumes (USD)</h2>
              <Bar data={prepareChartData(cryptoData.total_volumes, "Total Volumes (USD)")} />
            </div>
          </>
        ) : (
          <p className="text-center text-muted">Select a cryptocurrency to view data.</p>
        )}
      </div>
    </div>
  );
};

export default CryptoIndicators;
















