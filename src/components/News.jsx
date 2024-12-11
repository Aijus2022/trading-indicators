// File: src/components/News.jsx
import React, { useState } from "react";
const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNewsDetails = async () => {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/arc/outboundfeeds/rss/`; // RSS to JSON converter

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch news");
      const result = await response.json();

      // Map RSS items to a simplified structure
      const newsItems = result.items.map((item) => ({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: new Date(item.pubDate).toLocaleDateString(),
      }));

      setNewsData(newsItems);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#002F6C",
        color: "#FFFFFF",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container">
        <h1 className="text-center" style={{ color: "#FEC20C" }}>
          Latest Crypto News
        </h1>
        <button
          className="btn btn-warning w-100 mt-4"
          onClick={fetchNewsDetails}
          style={{
            backgroundColor: "#FEC20C",
            border: "none",
            fontWeight: "bold",
          }}
        >
          Fetch News
        </button>

        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-danger text-center mt-4">{error}</p>}

        {newsData.length > 0 && (
          <div className="card mt-4">
            <div
              className="card-header"
              style={{ backgroundColor: "#002F6C", color: "#FFFFFF" }}
            >
              Latest Articles
            </div>
            <div className="card-body" style={{ backgroundColor: "#FFFFFF" }}>
              <ul className="list-group">
                {newsData.map((news, index) => (
                  <li
                    key={index}
                    className="list-group-item"
                    style={{ backgroundColor: "#F8F9FA" }}
                  >
                    <h5>
                      <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#002F6C", textDecoration: "none" }}
                      >
                        {news.title}
                      </a>
                    </h5>
                    <p>
                      <small>{news.pubDate}</small>
                    </p>
                    <p>{news.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;







