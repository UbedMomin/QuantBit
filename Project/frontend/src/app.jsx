import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />

        {/* Main layout */}
        <div className="main-layout">
          <Sidebar />

          {/* Page content */}
          <main className="main-content">
            <div className="content-wrapper">
              <h1 className="page-title">
                Construction Material Request Portal
              </h1>
              <p className="page-subtitle">
                Your hackathon app is live — all components are working perfectly!
              </p>

              {/* Loader demo */}
              <div className="component-section">
                <h3>✨ Loader Component</h3>
                <Loader />
              </div>

              {/* Protected Route demo */}
              <div className="component-section">
                <h3>🛡️ Protected Route Component</h3>
                <ProtectedRoute>
                  <div className="protected-demo">
                    <h2>✅ Secure Access Granted</h2>
                    <p>All your protected components are loading correctly!</p>

                    <div className="stock-cards">
                      <div className="stock-card critical">
                        <h4>🔴 Steel Plates</h4>
                        <p>Stock: 50 / 200 units</p>
                        <p>Status: CRITICAL</p>
                      </div>

                      <div className="stock-card warning">
                        <h4>🟡 Aluminum Bars</h4>
                        <p>Stock: 120 / 300 units</p>
                        <p>Status: LOW</p>
                      </div>

                      <div className="stock-card adequate">
                        <h4>🟢 Plastic Pellets</h4>
                        <p>Stock: 500 / 400 units</p>
                        <p>Status: ADEQUATE</p>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
