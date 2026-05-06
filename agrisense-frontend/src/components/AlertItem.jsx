import React from 'react';

/**
 * Reusable alert component for system notifications.
 * Includes a button to trigger the dismiss interaction.
 */
const AlertItem = ({ id, message, time, onDismiss }) => {
  return (
    <li className="alert-item">
      <div className="alert-content">
        <span className="alert-time">{time}</span>
        <p>{message}</p>
      </div>
      {/* Interaction: Button triggers a visible UI update by removing the item */}
      <button className="dismiss-btn" onClick={() => onDismiss(id)}>
        Dismiss
      </button>
    </li>
  );
};

export default AlertItem;