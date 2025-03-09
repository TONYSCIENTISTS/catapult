"use client";

import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Window98 from "./components/Window98";
import Window98NFTFetcher from "./components/Window98NFTFetcher";

// Default wallet adapter UI styles
require("@solana/wallet-adapter-react-ui/styles.css");

export default function Home() {
  // LOADING SCREEN STATES
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Single-page ref (only Page 1)
  const pageRef = useRef<HTMLDivElement>(null);

  // Start menu toggle state (for the bottom Start button)
  const [showStartMenu, setShowStartMenu] = useState(false);

  // Track which popup window is open (e.g., "cmd", "userProfile", etc.)
  const [openWindow, setOpenWindow] = useState<string | null>(null);

  // Generate a random total loading time between 4 and 8 seconds (in ms)
  const totalTimeRef = useRef(Math.random() * (8000 - 4000) + 4000);
  const increment = 10000 / totalTimeRef.current;

  // SIMULATE WINDOWS 98–STYLE BLOCK LOADING
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + increment;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [increment]);

  // Once loading is done, show the page
  useEffect(() => {
    if (!loading && pageRef.current) {
      pageRef.current.style.opacity = "1";
      pageRef.current.style.pointerEvents = "auto";
    }
  }, [loading]);

  // Handler for desktop icon clicks
  const handleIconClick = (iconName: string) => {
    setOpenWindow(iconName);
  };

  // Close any open popup and the Start menu
  const handleClose = () => {
    setOpenWindow(null);
    setShowStartMenu(false);
  };

  // Render the loading screen if still loading
  if (loading) {
    const totalBlocks = 15;
    const filledBlocks = Math.floor((loadingProgress / 100) * totalBlocks);
    return (
      <div className="loading-container">
        <div className="loading-bar">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div key={i} className={`block ${i < filledBlocks ? "filled" : ""}`} />
          ))}
        </div>
        <p className="loading-text">Loading... {Math.floor(loadingProgress)}%</p>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #c0c0c0;
          }
          .loading-bar {
            display: flex;
            background: #dcdcdc;
            padding: 4px;
            border: 2px solid #000;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
            margin-bottom: 10px;
          }
          .block {
            width: 16px;
            height: 30px;
            margin-right: 2px;
            background-color: #c0c0c0;
            border: 1px solid #000;
          }
          .block.filled {
            background-color: #0000ff;
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

  return (
    <>
      <Head>
        <title>Windows 98 Style</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="container" onClick={handleClose}>
        {/* Top-right Connect Wallet Button */}
        <div className="top-wallet-button" onClick={(e) => e.stopPropagation()}>
          <WalletMultiButton />
        </div>

        {/* Page 1: background, logo, and desktop icons on the LEFT */}
        <div
          className="page"
          ref={pageRef}
          style={{ backgroundImage: `url("/page1.png")` }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src="/logo.png" alt="Logo" className="logo" />
          <div className="desktop-icons-left">
            <button
              className="desktop-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick("myComputer");
              }}
            >
              <img src="/icon1.png" alt="My Computer" />
              <span>My Computer</span>
            </button>
            <button
              className="desktop-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick("myBriefcase");
              }}
            >
              <img src="/icon2.png" alt="My Briefcase" />
              <span>My Briefcase</span>
            </button>
            <button
              className="desktop-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick("cmd");
              }}
            >
              <img src="/icon3.png" alt="Cmd" />
              <span>Cmd</span>
            </button>
            <button
              className="desktop-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick("onlineServices");
              }}
            >
              <img src="/icon4.png" alt="Online Services" />
              <span>Online Services</span>
            </button>
            <button
              className="desktop-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick("userProfile");
              }}
            >
              <img src="/icon5.png" alt="User Profile" />
              <span>User Profile</span>
            </button>
            <button
              className="desktop-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick("recycleBin");
              }}
            >
              <img src="/icon6.png" alt="Recycle Bin" />
              <span>Recycle Bin</span>
            </button>
            <button
              className="desktop-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick("discord");
              }}
            >
              <img src="/icon7.png" alt="Discord" />
              <span>Discord</span>
            </button>
            <button
              className="desktop-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleIconClick("backDoor");
              }}
            >
              <img src="/icon8.png" alt="Back Door" />
              <span>Back Door</span>
            </button>
          </div>
        </div>

        {/* Windows 9x–style taskbar */}
        <div className="taskbar" onClick={(e) => e.stopPropagation()}>
          <button
            className="start-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowStartMenu(!showStartMenu);
            }}
          >
            <img src="/logo.png" alt="WinLogo" className="winlogo" />
            Start
          </button>
          <div className="taskbar-separator" />
          <div className="taskbar-item">MyPlaceStart</div>
        </div>

        {/* Start Menu (5 items) */}
        {showStartMenu && (
          <div className="start-menu" onClick={(e) => e.stopPropagation()}>
            <div className="start-menu-item">
              <img src="/item1.png" alt="Item1" />
              <span>Programs</span>
            </div>
            <div className="start-menu-item">
              <img src="/item2.png" alt="Item2" />
              <span>Favorites</span>
            </div>
            <div className="start-menu-item">
              <img src="/item3.png" alt="Item3" />
              <span>Documents</span>
            </div>
            <div className="start-menu-item">
              <img src="/item4.png" alt="Item4" />
              <span>Settings</span>
            </div>
            <div className="start-menu-item">
              <img src="/item5.png" alt="Item5" />
              <span>Find</span>
            </div>
          </div>
        )}

        {/* Popup Panels controlled by Window98 component */}
        {openWindow === "myComputer" && (
          <Window98 title="My Computer" onClose={handleClose}>
            <p>This panel shows your computer drives and folders.</p>
          </Window98>
        )}
        {openWindow === "myBriefcase" && (
          <Window98 title="My Briefcase" onClose={handleClose}>
            <p>This panel shows your briefcase contents.</p>
          </Window98>
        )}
        {openWindow === "cmd" && (
          <Window98 title="Command Prompt" onClose={handleClose}>
            <p>This is a retro command prompt window. Type some DOS commands!</p>
          </Window98>
        )}
        {openWindow === "onlineServices" && (
          <Window98 title="Online Services" onClose={handleClose}>
            <p>This panel provides access to online services.</p>
          </Window98>
        )}
        {openWindow === "userProfile" && (
          <Window98 title="User Profile" onClose={handleClose}>
            {/* NFT fetcher panel */}
            <Window98NFTFetcher onClose={handleClose} />
          </Window98>
        )}
        {openWindow === "recycleBin" && (
          <Window98 title="Recycle Bin" onClose={handleClose}>
            <p>This panel shows deleted files.</p>
          </Window98>
        )}
        {openWindow === "discord" && (
          <Window98 title="Discord" onClose={handleClose}>
            <p>This panel is for Discord integration.</p>
          </Window98>
        )}
        {openWindow === "backDoor" && (
          <Window98 title="Back Door" onClose={handleClose}>
            <p>This panel is a secret back door.</p>
          </Window98>
        )}

        {/* Overlay to capture clicks outside popup and start menu */}
        {(openWindow || showStartMenu) && (
          <div className="overlay" onClick={handleClose}></div>
        )}
      </div>

      <style jsx>{`
        /* Container for main content */
        .container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          margin: 0;
          padding: 0;
          background: #c0c0c0;
        }
        /* Top-right Connect Wallet Button */
        .top-wallet-button {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }
        /* OVERRIDE the default wallet adapter button for a Windows 98 style */
        .top-wallet-button .wallet-adapter-button {
          background: #c0c0c0;
          border: 2px solid #fff;
          box-shadow: inset -1px -1px #000;
          font-family: "MS Sans Serif", sans-serif;
          color: #000;
          cursor: pointer;
          font-size: 14px;
          padding: 4px 12px;
        }
        .top-wallet-button .wallet-adapter-button:active {
          border: 2px solid #000;
          box-shadow: inset 1px 1px #fff;
        }
        /* Single page styling */
        .page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-size: cover;
          background-position: center;
          transition: opacity 0.5s ease;
          opacity: 0;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #000;
          font-family: sans-serif;
        }
        .page img.logo {
          width: 200px;
          height: auto;
          margin-bottom: 40px;
        }
        /* Desktop icons aligned on the LEFT side */
        .desktop-icons-left {
          position: absolute;
          left: 30px;
          top: 80px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .desktop-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: "MS Sans Serif", sans-serif;
        }
        .desktop-icon img {
          width: 48px;
          height: 48px;
        }
        .desktop-icon span {
          font-size: 12px;
          margin-top: 4px;
          color: #000;
          text-shadow: 1px 1px #fff;
        }
        /* Windows 9x-style Taskbar */
        .taskbar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40px;
          background: linear-gradient(180deg, #dfdfdf 0%, #b0b0b0 100%);
          border-top: 2px solid #fff;
          border-bottom: 2px solid #000;
          display: flex;
          align-items: center;
          font-family: "MS Sans Serif", sans-serif;
          z-index: 999;
          padding: 0 8px;
          box-sizing: border-box;
        }
        .start-btn {
          display: flex;
          align-items: center;
          margin-left: 4px;
          padding: 0 8px;
          height: 28px;
          background: #c0c0c0;
          border: 2px solid #fff;
          box-shadow: inset -1px -1px #000;
          cursor: pointer;
          font-size: 14px;
        }
        .start-btn:active {
          border: 2px solid #000;
          box-shadow: inset 1px 1px #fff;
        }
        .winlogo {
          width: 16px;
          height: 16px;
          margin-right: 6px;
        }
        .taskbar-separator {
          width: 2px;
          height: 24px;
          margin: 0 8px;
          background: #888;
        }
        .taskbar-item {
          color: #000;
          margin-right: auto;
        }
        /* Start Menu Popup */
        .start-menu {
          position: absolute;
          bottom: 40px;
          left: 0;
          width: 200px;
          background: #c0c0c0;
          border: 2px solid #000;
          box-shadow: 2px 2px #fff, inset -1px -1px #000;
          font-family: "MS Sans Serif", sans-serif;
          padding: 6px 0;
          z-index: 1000;
        }
        .start-menu-item {
          display: flex;
          align-items: center;
          padding: 4px 8px;
          cursor: pointer;
        }
        .start-menu-item:hover {
          background: #0a246a;
          color: #fff;
        }
        .start-menu-item img {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
        .start-menu-item span {
          font-size: 14px;
        }
        /* Overlay to capture clicks outside popup and start menu */
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1500;
          background: transparent;
        }
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .logo {
            width: 150px;
          }
          .desktop-icons-left {
            left: 10px;
            top: 60px;
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
}
