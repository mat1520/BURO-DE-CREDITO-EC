import React from "react";
import "./ScoreCircle.css";

const ScoreCircle = ({ score, color = "#8bc34a" }) => (
  <div className="score-circle">
    <svg width="220" height="220" viewBox="0 0 220 220">
      <circle cx="110" cy="110" r="96" stroke="#e0e0e0" strokeWidth="16" fill="none" />
      <circle
        cx="110"
        cy="110"
        r="96"
        stroke={color}
        strokeWidth="16"
        fill="none"
        strokeDasharray={2 * Math.PI * 96}
        strokeDashoffset={2 * Math.PI * 96 - (score / 1000) * 2 * Math.PI * 96}
        strokeLinecap="round"
      />
    </svg>
    <div className="score-value">{score}</div>
  </div>
);

export default ScoreCircle; 