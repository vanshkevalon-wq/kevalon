import { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading → ready → exit

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Accelerating progress curve
        const increment = prev < 50 ? 2 : prev < 80 ? 3 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    // When progress hits 100, mark as ready
    const readyTimer = setTimeout(() => {
      setPhase('ready');
    }, 2200);

    // Exit animation
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 3000);

    // Complete
    const doneTimer = setTimeout(() => {
      onDone();
    }, 3600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(readyTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash splash--${phase}`}>
      
      {/* Animated gradient background */}
      <div className="splash__bg">
        <div className="splash__bg-layer splash__bg-layer--1" />
        <div className="splash__bg-layer splash__bg-layer--2" />
        <div className="splash__bg-layer splash__bg-layer--3" />
      </div>

      {/* Floating orbs */}
      <div className="splash__orbs" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="splash__orb" style={{ '--orb-i': i }} />
        ))}
      </div>

      {/* Main content */}
      <div className="splash__content">
        
        {/* Liquid morphing logo container */}
        <div className="splash__logo-container">
          
          {/* Glass card with logo */}
          <div className="splash__glass-card">
            <div className="splash__logo-bg-blur" />
            
            <div className="splash__logo-wrap">
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/9Pyj6mPiWW/p4s798c4_expires_30_days.png"
                alt="Kevalon Technology"
                className="splash__logo"
              />
            </div>

            {/* Liquid morphing border */}
            <svg className="splash__liquid-border" viewBox="0 0 300 300">
              <defs>
                <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#61BBC5" />
                  <stop offset="50%" stopColor="#034665" />
                  <stop offset="100%" stopColor="#61BBC5" />
                </linearGradient>
                <filter id="gooey">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" 
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="gooey" />
                  <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
                </filter>
              </defs>
              <circle className="splash__liquid-circle" cx="150" cy="150" r="140" 
                stroke="url(#liquidGrad)" strokeWidth="3" fill="none" filter="url(#gooey)" />
            </svg>

            {/* Rotating rings */}
            <div className="splash__ring splash__ring--1" />
            <div className="splash__ring splash__ring--2" />
            <div className="splash__ring splash__ring--3" />
          </div>

        </div>

        {/* Brand name with animated gradient */}
        <h1 className="splash__brand">
          <span className="splash__brand-text">KEVALON</span>
          <span className="splash__brand-glow">KEVALON</span>
        </h1>

        {/* Tagline */}
        <p className="splash__tagline">
          Building technology that turns ideas into products
        </p>

        {/* Progress section */}
        <div className="splash__progress-section">
          <div className="splash__progress-bar">
            <div 
              className="splash__progress-fill" 
              style={{ width: `${progress}%` }}
            />
            <div className="splash__progress-shimmer" />
          </div>
          <div className="splash__progress-text">
            <span className="splash__progress-label">Loading Experience</span>
            <span className="splash__progress-percent">{progress}%</span>
          </div>
        </div>

      </div>

      {/* Scan line effect */}
      <div className="splash__scanline" aria-hidden="true" />
      
    </div>
  );
}
