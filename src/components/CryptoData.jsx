import React, { useState } from "react";
import axios from "axios";

const CryptoData = () => {
  const [symbol, setSymbol] = useState("BTCUSDT"); // Default symbol
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCryptoData = async () => {
    const options = {
      method: "GET",
      url: "https://crypto-price-technical-indicators-signals.p.rapidapi.com/getCoinAllData",
      params: { noqueue: "1", symbol },
      headers: {
        "x-rapidapi-key": "3ae636fe26mshc2f8359d260fc59p1cd1d8jsn27515a485dec",
        "x-rapidapi-host":
          "crypto-price-technical-indicators-signals.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      setError("");
      const response = await axios.request(options);
      setData(response.data); // Set API response data
    } catch (err) {
      console.error(err);
      setError("Failed to fetch crypto data. Please try again.");
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
        Crypto Data Viewer
      </h1>

      {/* Dropdown for Crypto Symbols */}
      <div className="mb-4">
        <label
          htmlFor="symbolDropdown"
          className="form-label fw-bold"
          style={{ fontSize: "1.2rem", color: "#DAA520" }}
        >
          Select a Cryptocurrency:
        </label>
        <select
          id="symbolDropdown"
          className="form-select shadow-sm"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={{
            fontSize: "1.1rem",
            borderColor: "#2E8B57",
            backgroundColor: "#F9F9F9",
          }}
        >
          <option value="BTCUSDT">Bitcoin (BTC/USDT)</option>
          <option value="ETHUSDT">Ethereum (ETH/USDT)</option>
          <option value="BNBUSDT">Binance Coin (BNB/USDT)</option>
          <option value="ADAUSDT">Cardano (ADA/USDT)</option>
          <option value="XRPUSDT">Ripple (XRP/USDT)</option>
        </select>
        <button
          className="btn mt-3 shadow"
          onClick={fetchCryptoData}
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

      {/* Crypto Data Display */}
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
              Cryptocurrency Data for {symbol}
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
                    <td>Symbol</td>
                    <td>{data?.symbol || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Current Price</td>
                    <td>${data?.price || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>24h Change</td>
                    <td>{data?.change24h || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Market Cap</td>
                    <td>${data?.marketCap || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Volume (24h)</td>
                    <td>${data?.volume24h || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>RSI</td>
                    <td>{data?.rsi || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Moving Average</td>
                    <td>{data?.movingAverage || "N/A"}</td>
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
            Select a cryptocurrency and click "Fetch Data" to view details.
          </div>
        )}
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default CryptoData;
