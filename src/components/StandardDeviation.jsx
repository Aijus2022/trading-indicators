import React, { useState } from "react";

const StandardDeviation = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [timeframe, setTimeframe] = useState("1d");
  const [periods, setPeriods] = useState(5);
  const [deviations, setDeviations] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStandardDeviation = async () => {
    const url = `https://crypto-technical-analysis-indicator-apis-for-trading.p.rapidapi.com/sd?timeframe=${timeframe}&symbol=${symbol}&periods=${periods}&deviations=${deviations}`;
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
      setError("Failed to fetch Standard Deviation data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Standard Deviation</h1>

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
        <label htmlFor="periods" className="form-label">Periods:</label>
        <input
          type="number"
          id="periods"
          className="form-control"
          value={periods}
          onChange={(e) => setPeriods(e.target.value)}
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="deviations" className="form-label">Deviations:</label>
        <input
          type="number"
          id="deviations"
          className="form-control"
          value={deviations}
          onChange={(e) => setDeviations(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={fetchStandardDeviation}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Standard Deviation"}
      </button>

      {error && <p className="text-danger mt-3">{error}</p>}

      {data && (
        <div className="mt-4">
          <h3 className="text-center">Standard Deviation Data for {symbol}</h3>
          <pre className="bg-light p-3 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StandardDeviation;
