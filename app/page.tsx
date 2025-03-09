// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function HomePage() {
  // Loading state
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Slight delay before showing main content
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-bar-background">
          <div
            className="loading-bar-fill"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p className="loading-text">Loading... {loadingProgress}%</p>

        {/* Local styles for loading screen */}
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #c0c0c0;
          }
          .loading-bar-background {
            width: 60%;
            max-width: 500px;
            height: 30px;
            background: #fff;
            border: 2px solid #000;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
            margin-bottom: 10px;
          }
          .loading-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #0000ff 0%, #87cefa 100%);
            transition: width 0.1s ease;
          }
          .loading-text {
            font-family: "MS Sans Serif", sans-serif;
            font-size: 14px;
            color: #000;
          }
        `}</style>
      </div>
    );
  }

  // Main content (four full-screen sections)
  return (
    <div className="container">
      {/* Wallet connect button (top-right corner) */}
      <div className="wallet-button">
        <WalletMultiButton />
      </div>

      {/* Section 1 */}
      <section className="section" id="page1">
        <img src="/logo.png" alt="Logo" className="logo" />
      </section>

      {/* Section 2 */}
      <section className="section" id="page2">
        <h2>Page 2</h2>
      </section>

      {/* Section 3 */}
      <section className="section" id="page3">
        <h2>Page 3</h2>
      </section>

      {/* Section 4 */}
      <section className="section" id="page4">
        <h2>Page 4</h2>
      </section>

      {/* Local styles for the main page */}
      <style jsx>{`
        /* Prevent horizontal scrollbar */
        html,
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        .container {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100vh;
          width: 100%;
        }
        .section {
          scroll-snap-align: start;
          height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: sans-serif;
        }
        /* Background colors for demonstration */
        #page1 {
          background-color: #f5f5f5;
        }
        #page2 {
          background-color: #e0e0e0;
        }
        #page3 {
          background-color: #cccccc;
        }
        #page4 {
          background-color: #b3b3b3;
        }
        .logo {
          width: 200px;
          height: auto;
        }
        .wallet-button {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 100;
        }
        @media (max-width: 768px) {
          .logo {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
}
