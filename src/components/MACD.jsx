import React, { useState } from "react";

const MACD = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [timeframe, setTimeframe] = useState("1d");
  const [short, setShort] = useState(12);
  const [long, setLong] = useState(26);
  const [signal, setSignal] = useState(9);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMACD = async () => {
    const url = `https://crypto-technical-analysis-indicator-apis-for-trading.p.rapidapi.com/macd?symbol=${symbol}&timeframe=${timeframe}&short=${short}&long=${long}&signal=${signal}`;
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
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Failed to fetch MACD data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-primary mb-4 text-center">MACD Indicator</h1>
      {/* Inputs */}
      {/* Similar input setup for `symbol`, `timeframe`, `short`, `long`, and `signal` */}
      {/* Fetch Button */}
      {/* Result Display */}
    </div>
  );
};

export default MACD;
