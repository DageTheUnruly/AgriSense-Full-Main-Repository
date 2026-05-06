import React, { useState, useEffect } from 'react'; // useEffect for API lifecycle
import { useNavigate } from 'react-router-dom';
import StatusCard from '../components/StatusCard.jsx';
import AlertItem from '../components/AlertItem.jsx';
import { initialAlerts } from '../data/mockData.jsx'; 

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [isSystemActive, setIsSystemActive] = useState(true);
  const [sensors, setSensors] = useState([]); // Start empty to wait for DB
  const [alerts, setAlerts] = useState(initialAlerts);

  // Task 3 - Fetching Real Data - (Para di na salig sa mockdata)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sensors/") 
      .then(res => res.json())
      .then(data => {
        setSensors(data); //Overwrites mock data with MySQL data
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleTogglePower = (id) => {
    // Task 4 - Eventually needs a PATCH request to save state
    setSensors(prev => prev.map(s => s.id === id ? { ...s, power: !s.power } : s));
  };

  const handleDismiss = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>AgriSense Dashboard</h1>
        <button onClick={() => navigate('/')}>Logout</button>
      </header>

      <section className="system-banner">
        <p>System Gateway: <strong>{isSystemActive ? "ONLINE" : "OFFLINE"}</strong></p>
        <button onClick={() => setIsSystemActive(!isSystemActive)}>
          {isSystemActive ? "Deactivate" : "Activate"}
        </button>
      </section>

      <div className="metrics-grid">
        {/* [Highlight: Map real DB sensors to UI cards] */}
        {sensors.length === 0 ? (
          <p>Connecting to AgriSense Network...</p> 
        ) : (
          sensors.map(s => (
            <StatusCard key={s.id} {...s} onToggle={() => handleTogglePower(s.id)} />
          ))
        )}
      </div>

      <section className="alerts-section">
        <h3>System Notifications ({alerts.length})</h3>
        {alerts.map(a => (
          <AlertItem key={a.id} {...a} onDismiss={handleDismiss} />
        ))}
      </section>
    </div>
  );
};

export default Dashboard;