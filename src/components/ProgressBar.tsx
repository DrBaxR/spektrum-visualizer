import React from "react";
import "../styles/ProgressBar.css";

interface Props {
  progress: number;
}

export const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <div className="progress-bar-component">
      <div
        className="bar"
        style={{ width: `${Math.floor(progress * 100)}%` }}
      />
    </div>
  );
};
