import React from "react";
import { Link } from "react-router-dom";
import heroImage from "/images/home-page-hero.jpg";

const Home = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#ffffff",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div className="text-center bg-dark bg-opacity-75 p-4 rounded">
        {/* Hero Section */}
        <h1 className="mb-4 text-light fw-bold display-4">
          Welcome to the Stock Market Analyzer
        </h1>
        <p className="mb-5 lead text-light">
          Dive into stock performance, financial data, and expert opinions—all
          in one place.
        </p>

        {/* Navigation Buttons */}
        <div className="d-flex flex-wrap justify-content-center">
          {/* Stock Charts */}
          <Link
            to="/stock-charts"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          >
            <i className="fas fa-chart-line me-2"></i> Stock Charts
          </Link>

          {/* Financial Data */}
          <Link
            to="/financial-data"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          >
            <i className="fas fa-dollar-sign me-2"></i> Financial Data
          </Link>

          {/* Crypto Symbols */}
          <Link
            to="/crypto-indicators"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          >
            <i className="fas fa-chart-pie me-2"></i> Crypto Technical Analysis
          </Link>

          {/* Crypto Fear & Greed */}
          <Link
            to="/crypto-fear-greed"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          >
            <i className="fas fa-balance-scale me-2"></i> Crypto Fear & Greed
          </Link>

          {/* News Details */}
          <Link
            to="/news"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          >
            <i className="fas fa-newspaper me-2"></i> Latest News
          </Link>
          <Link
            to="/options"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          >
            <i className="fas fa-newspaper me-2"></i> Stocks Options
          </Link>
          <Link
            to="/what-analysts-are-saying"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          >
            <i className="fas fa-newspaper me-2"></i> What Analysts Are Saying
            
          </Link> 
          <Link
            to="/chatbot"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          >
            <i className="fas fa-newspaper me-2"></i> Chatbot
            
          </Link>    
          <Link
            to="/crypto-data"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          > <i className="fas fa-newspaper me-2"></i> Crypto Data             
          </Link>  
          <Link
            to="/bitcoin-indicators"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          > <i className="fas fa-newspaper me-2"></i> Bitcoin Indicators            
          </Link>  
          <Link
            to="/ethereum-indicators"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          > <i className="fas fa-newspaper me-2"></i> Ethereum Indicators            
          </Link>  
          <Link
            to="/company-news"
            className="btn btn-primary btn-lg m-2 shadow"
            style={{ minWidth: "200px" }}
          > <i className="fas fa-newspaper me-2"></i> Company News           
          </Link> 


        </div>
      </div>
    </div>
  );
};

export default Home;






