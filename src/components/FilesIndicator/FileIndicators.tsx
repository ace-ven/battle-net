import React from "react";
import "./FileIndicators.scss";

const FileIndicators = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const active = 2;
  return (
    <div className="indicators-container">
      {arr.map((file) => (
        <div className={`${file === active ? "active" : ""}`}>
          <span>file fiename.ts</span>
          <span>x</span>
        </div>
      ))}
    </div>
  );
};

export default FileIndicators;
