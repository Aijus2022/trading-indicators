import React, { useState } from "react";

const BollingerBands = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [timeframe, setTimeframe] = useState("1d");
  const [length, setLength] = useState(20);
  const [stdDev, setStdDev] = useState(2.5);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBollingerBands = async () => {
    const url = `https://crypto-technical-analysis-indicator-apis-for-trading.p.rapidapi.com/bollinger-bands?symbol=${symbol}&timeframe=${timeframe}&stdDev=${stdDev}&length=${length}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f1bc2f5ce0mshe48349c94c8f8c0p11b50ejsnab48d432745c",
        "x-rapidapi-host": "crypto-technical-analysis-indicator-apis-for-trading.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      setError("");
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Bollinger Bands data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Bollinger Bands</h1>

      <div className="form-group mt-3">
        <label htmlFor="symbol" className="form-label">Symbol:</label>
        <input
          type="text"
          id="symbol"
          className="form-control"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="timeframe" className="form-label">Timeframe:</label>
        <select
          id="timeframe"
          className="form-select"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="1m">1 Minute</option>
          <option value="5m">5 Minutes</option>
          <option value="15m">15 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="1d">1 Day</option>
          <option value="1w">1 Week</option>
        </select>
      </div>

      <div className="form-group mt-3">
        <label htmlFor="length" className="form-label">Length:</label>
        <input
          type="number"
          id="length"
          className="form-control"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="stdDev" className="form-label">Standard Deviation:</label>
        <input
          type="number"
          id="stdDev"
          className="form-control"
          value={stdDev}
          onChange={(e) => setStdDev(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={fetchBollingerBands}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Bollinger Bands"}
      </button>

      {error && <p className="text-danger mt-3">{error}</p>}

      {data && (
        <div className="mt-4">
          <h3 className="text-center">Bollinger Bands Data for {symbol}</h3>
          <pre className="bg-light p-3 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BollingerBands;
