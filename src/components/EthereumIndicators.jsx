import React, { useState } from "react";
import axios from "axios";

const EthereumIndicators = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchIndicatorsData = async () => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/coins/ethereum", // Correct endpoint for Ethereum data
    };

    try {
      setLoading(true);
      setError("");
      const response = await axios.request(options);
      setData(response.data); // Set API response data
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Ethereum indicators. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1
        className="text-center fw-bold mb-4"
        style={{ color: "#6A5ACD", fontSize: "3rem" }}
      >
        Ethereum Indicators Viewer
      </h1>

      <div className="text-center mb-4">
        <button
          className="btn shadow"
          onClick={fetchIndicatorsData}
          disabled={loading}
          style={{
            backgroundColor: "#6A5ACD",
            color: "white",
            fontSize: "1.2rem",
            padding: "10px 20px",
          }}
        >
          {loading ? "Loading..." : "Fetch Indicators"}
        </button>
      </div>

      <div className="mt-4">
        {data ? (
          <div className="card shadow-lg" style={{ backgroundColor: "#F9F9F9" }}>
            <div
              className="card-header text-white"
              style={{
                backgroundColor: "#6A5ACD",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Ethereum Data (ETH)
            </div>
            <div className="card-body">
              <p>
                <strong>Price (USD):</strong> ${data.market_data?.current_price.usd || "N/A"} <br />
                <strong>Symbol:</strong> {data.symbol || "N/A"} <br />
                <strong>Market Cap (USD):</strong> ${data.market_data?.market_cap.usd || "N/A"} <br />
                <strong>24h Trading Volume (USD):</strong> ${data.market_data?.total_volume.usd || "N/A"} <br />
                <strong>Circulating Supply:</strong> {data.market_data?.circulating_supply || "N/A"} ETH <br />
                <strong>All Time High (USD):</strong> ${data.market_data?.ath.usd || "N/A"} <br />
                <strong>Market Cap Rank:</strong> {data.market_cap_rank || "N/A"} <br />
                <strong>High 24h (USD):</strong> ${data.market_data?.high_24h.usd || "N/A"} <br />
                <strong>Low 24h (USD):</strong> ${data.market_data?.low_24h.usd || "N/A"} <br />
                <strong>Price Change Percentage (24h):</strong> {data.market_data?.price_change_percentage_24h || "N/A"}% <br />
                <strong>Price Change (USD):</strong> ${data.market_data?.price_change_24h || "N/A"} <br />
                <strong>Last Updated:</strong> {new Date(data.last_updated).toLocaleString() || "N/A"} <br />
              </p>
            </div>
          </div>
        ) : (
          <div
            className="text-center"
            style={{ fontSize: "1.2rem", color: "#6c757d" }}
          >
            Click "Fetch Indicators" to view Ethereum data.
          </div>
        )}
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default EthereumIndicators;

