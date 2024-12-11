import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CryptoIndicators from "./components/CryptoIndicators";
import StandardDeviation from "./components/StandardDeviation";
import MACD from "./components/MACD";
import BollingerBands from "./components/BollingerBands";
import StochasticOscillator from "./components/StochasticOscillator";
import FinancialData from "./components/FinancialData";
import StockCharts from "./components/StockCharts";
import CryptoFearGreed from "./components/CryptoFearGreed";
import News from "./components/News";
import Options from "./components/Options.jsx";
import WhatAnalystsAreSaying from "./components/WhatAnalystsAreSaying.jsx";
import CryptoData  from "./components/CryptoData";
import BitcoinIndicators from "./components/BitcoinIndicators";
import EthereumIndicators from "./components/EthereumIndicators";
import CompanyNews from "./components/CompanyNews";
import RSI from "./components/RSI";

const App = () => {
  return (
    <Router>
      <div
        className="d-flex flex-column min-vh-100"
        style={{
          backgroundColor: "#001b47", // William Hill's navy blue
          color: "#ffffff", // White text
        }}
      >
        {/* Header */}
        <header>
          <nav
            className="navbar navbar-expand-lg"
            style={{
              backgroundColor: "#004a9f", // Lighter navy blue
              color: "#ffffff",
            }}
          >
            <div className="container">
              <Link
                className="navbar-brand fw-bold"
                to="/"
                style={{ color: "#f5d000", fontSize: "1.5rem" }} // Gold logo
              >
                Stock Market Analyzer
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ borderColor: "#f5d000" }}
              >
                <span
                  className="navbar-toggler-icon"
                  style={{
                    backgroundImage:
                      "url('data:image/svg+xml;charset=utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 30 30%22 fill=%22%23f5d000%22><path stroke=%22rgba%28255,%20255,%20255,%200.5%29%22 stroke-width=%222%22 d=%22M4 7h22M4 15h22M4 23h22%22/></svg>')",
                  }}
                ></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/stock-charts" style={{ color: "#ffffff" }}>
                      Stock Charts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/financial-data" style={{ color: "#ffffff" }}>
                      Financial Data
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/company-news" style={{ color: "#ffffff" }}>
                    Company News
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/options" style={{ color: "#ffffff" }}>
                     Stock options
                    </Link>                    
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/what-analysts-are-saying" style={{ color: "#ffffff" }}>
                    What Analysts Are Saying
                    </Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link className="nav-link" to="/crypto-indicators" style={{ color: "#ffffff" }}>
                      Crypto Indicators
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/crypto-fear-greed" style={{ color: "#ffffff" }}>
                      Fear & Greed Index
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/news" style={{ color: "#ffffff" }}>
                    Crypto News
                    </Link>
                  </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/bitcoin-indicators" style={{ color: "#ffffff" }}>
                    Bitcoin Indicators
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/ethereum-indicators" style={{ color: "#ffffff" }}>
                    Ethereum Indicators
                    </Link>
                    </li>
                                                                    
                  
                 </ul>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow-1" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crypto-indicators" element={<CryptoIndicators />} />
            <Route path="/standard-deviation" element={<StandardDeviation />} />
            <Route path="/macd" element={<MACD />} />
            <Route path="/bollinger-bands" element={<BollingerBands />} />
            <Route path="/stochastic-oscillator" element={<StochasticOscillator />} />
            <Route path="/financial-data" element={<FinancialData />} />
            <Route path="/stock-charts" element={<StockCharts />} />
            <Route path="/crypto-fear-greed" element={<CryptoFearGreed />} />    
            <Route path="/news" element={<News />} />  
            <Route path="/options" element={<Options />} />  
            <Route path="/what-analysts-are-saying" element={< WhatAnalystsAreSaying/>} /> 
            <Route path="/crypto-data" element={< CryptoData />} /> 
            <Route path="/bitcoin-indicators" element={< BitcoinIndicators />} /> 
            <Route path="/ethereum-indicators" element={<EthereumIndicators />} />   
            <Route path="/company-news" element={<CompanyNews />} />     
            <Route path="/rsi" element={<RSI />} />      
           </Routes>

        </main>

        {/* Footer */}
        <footer
          className="footer text-center py-3"
          style={{
            backgroundColor: "#004a9f",
            color: "#ffffff",
            borderTop: "2px solid #f5d000",
          }}
        >
          &copy; {new Date().getFullYear()} Stock Market Analyzer. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;







