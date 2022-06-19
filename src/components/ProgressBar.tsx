import React from "react";
import "./ProgressBar.css";

interface Props {
  progress: number;
  blue?: boolean;
}

export const ProgressBar: React.FC<Props> = ({ progress, blue }) => {
  return (
    <div className="progress-bar-component">
      <div className="tooltip">{Math.floor(progress * 10000) / 100}%</div>
      <div
        className={`bar ${blue ? "blue" : ""}`}
        style={{ width: `${Math.floor(progress * 100)}%` }}
      />
    </div>
  );
};
