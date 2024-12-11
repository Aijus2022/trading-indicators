
    import React, { useState, useEffect } from "react";

    const RSI = ({ selectedSymbol }) => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
    
      const fetchRSIData = async () => {
        const url = `https://crypto-technical-analysis-indicator-apis-for-trading.p.rapidapi.com/rsi?symbol=${symbol}&timeframe=${timeframe}&length=${length}`;
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
          setError("Failed to fetch RSI data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchRSIData();
      }, [selectedSymbol]);
    
      return (
        <div>
          <h2 className="text-primary text-center">Relative Strength Index (RSI)</h2>
          <p className="text-center">Selected Stock: {selectedSymbol}</p>
          {error && <p className="text-danger">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : data ? (
            <div className="card">
              <div className="card-body">
                <h5>RSI Data for {selectedSymbol}</h5>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      );
    };
    
    export default RSI;
    