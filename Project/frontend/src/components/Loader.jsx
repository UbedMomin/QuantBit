import React from 'react';
import './Loader.css';  // If Loader.css is in src/ and Loader.jsx in components/; // We'll create this CSS file

const Loader = ({ size = 'medium', text = 'Loading Inventory...' }) => {
  return (
    <div className="loader-container">
      {/* Main 3D Rotating Cube */}
      <div className="scene">
        <div className="cube-wrapper">
          <div className="cube">
            <div className="cube-face cube-face-front"></div>
            <div className="cube-face cube-face-back"></div>
            <div className="cube-face cube-face-right"></div>
            <div className="cube-face cube-face-left"></div>
            <div className="cube-face cube-face-top"></div>
            <div className="cube-face cube-face-bottom"></div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              '--i': i,
              '--color': `hsl(${i * 30}, 70%, 60%)`
            }}
          ></div>
        ))}
      </div>

      {/* Animated Text */}
      <div className="loader-text">
        <span className="text-gradient">{text}</span>
        <div className="text-dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <div className="progress-stats">
          <span className="stat">Analyzing Stock Levels</span>
          <span className="percentage">87%</span>
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="glow-effect-1"></div>
      <div className="glow-effect-2"></div>
      <div className="glow-effect-3"></div>
    </div>
  );
};

export default Loader;