import React from "react";
import "./StatsSummary.css";

const StatsSummary = ({ stats }) => {
  return (
    <div className="stats-summary">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-value">{item.value}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsSummary;
