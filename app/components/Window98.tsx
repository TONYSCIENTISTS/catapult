// app/components/Window98.tsx
"use client";

import React, { useState, useRef } from "react";

interface Window98Props {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Window98({ title, onClose, children }: Window98Props) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // When mouse is pressed on the title bar, start dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  // When moving mouse while dragging, update window position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || !windowRef.current) return;
    const newLeft = e.clientX - offset.x;
    const newTop = e.clientY - offset.y;
    windowRef.current.style.left = `${newLeft}px`;
    windowRef.current.style.top = `${newTop}px`;
  };

  // End dragging on mouse up or leave
  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="window98"
      ref={windowRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <span className="title-text">{title}</span>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <div className="content">
        {children}
      </div>

      <style jsx>{`
        .window98 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          background: #c0c0c0;
          border: 2px solid #000;
          box-shadow: 2px 2pxrgba(0, 0, 0, 0.16), inset -1px -1px #000;
          font-family: "MS Sans Serif", sans-serif;
          color: #000;
          z-index: 2000;
          user-select: none;
          cursor: ${dragging ? "move" : "default"};
        }
        .title-bar {
          background: #000080;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          color: #fff;
          box-shadow: inset 1px 1px #fff;
          cursor: move;
        }
        .title-text {
          font-size: 14px;
        }
        .close-btn {
          background: #c0c0c0;
          border: 2px solid #000000;
          box-shadow: inset -1px -1px #000;
          cursor: pointer;
          font-size: 12px;
          width: 20px;
          height: 20px;
          line-height: 16px;
          padding: 0;
        }
        .close-btn:active {
          border: 2px solid #000;
          box-shadow: inset 1px 1px #fff;
        }
        .content {
          padding: 8px;
          min-height: 100px;
        }
      `}</style>
    </div>
  );
}
