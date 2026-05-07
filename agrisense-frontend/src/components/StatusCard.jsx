import React from 'react';

/**
 * Reusable component for displaying environmental metrics.
 * Now includes a power state to visually distinguish between active and inactive sensors.
 */
const StatusCard = ({ label, value, unit, status, icon, power, onToggle }) => {
  // Task 2: Apply conditional styling for a visible UI update
  const cardClass = `status-card ${power ? 'active' : 'inactive'}`;

  return (
    <div className={cardClass}>
      <div className="card-header">
        <span className="icon">{icon}</span>
        <h3>{label}</h3>
      </div>
      <div className="card-body">
        {/* Only show the value if the device is powered on */}
        <p className="value">
          {power ? `${value}${unit}` : "--"}
        </p>
        
        {/* FIXED: Added inline style to force text color visibility */}
        <span 
          className={`status-badge ${power ? 'status-good' : 'status-off'}`}
          style={{ 
            color: power ? "#1b5e20" : "#444", 
            fontWeight: "bold",
            display: "inline-block"
          }}
        >
          {power ? (status || "Active") : "Offline"}
        </span>
      </div>

      {/* Task 3: Interaction to toggle the power state */}
      <button className="power-btn" onClick={onToggle}>
        {power ? "Shutdown" : "Activate"}
      </button>
    </div>
  );
};

export default StatusCard;