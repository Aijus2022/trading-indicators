import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoFearGreed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFearGreedIndex = async () => {
    const options = {
      method: "GET",
      url: "https://api.alternative.me/fng/",
      params: { format: "json" },
    };

    try {
      setLoading(true);
      setError("");
      const response = await axios.request(options);
      setData(response.data.data || []); // Assuming data is an array
    } catch (err) {
      console.error("Error fetching data:", err.response || err.message);
      setError(
        `Failed to fetch Fear and Greed Index: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFearGreedIndex();
  }, []);

  return (
    <div className="container mt-5">
      <h1
        className="text-center fw-bold mb-4"
        style={{ color: "#FF4500", fontSize: "3rem" }}
      >
        Crypto Fear & Greed Index
      </h1>

      {loading ? (
        <div
          className="text-center"
          style={{ fontSize: "1.5rem", color: "#6c757d" }}
        >
          Loading...
        </div>
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : (
        <div className="card shadow-lg" style={{ backgroundColor: "#F9F9F9" }}>
          <div
            className="card-header text-white"
            style={{
              backgroundColor: "#FF4500",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Fear & Greed History
          </div>
          <div className="card-body">
            <table className="table table-bordered" style={{ fontSize: "1rem" }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Value</th>
                  <th>Classification</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.timestamp ? new Date(item.timestamp * 1000).toLocaleDateString() : "N/A"}</td>
                    <td>{item.value || "N/A"}</td>
                    <td>{item.value_classification || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoFearGreed;

