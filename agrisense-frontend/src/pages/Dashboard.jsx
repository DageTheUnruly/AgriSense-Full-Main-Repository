import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusCard from '../components/StatusCard.jsx';
import AlertItem from '../components/AlertItem.jsx';
import { initialAlerts } from '../data/mockData.jsx'; 

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [isSystemActive, setIsSystemActive] = useState(true);
  const [sensors, setSensors] = useState([]); 
  const [alerts, setAlerts] = useState(initialAlerts);

  // --- TASK: LOGOUT LOGIC ---
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the session
    navigate('/'); // Kick back to login
  };

  // --- TASK: FETCH REAL DATA ---
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); 
      
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sensors/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSensors(data);
        } else {
          console.error("Dashboard failed to get data. Status:", response.status);
        }
      } catch (error) {
        console.error("Connection error:", error);
      }
    };

    fetchData();
  }, []);

  const handleTogglePower = (id) => {
    setSensors(prev => prev.map(s => s.id === id ? { ...s, power: !s.power } : s));
  };

  const handleDismiss = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="dashboard-page" style={{ 
      backgroundColor: "#16171D", 
      minHeight: "100vh", 
      padding: "20px",
      fontFamily: "'Inter', sans-serif",
      boxSizing: "border-box"
    }}>
      {/* HEADER AREA */}
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "30px",
        paddingBottom: "10px",
        borderBottom: "1px solid rgba(255,255,255,0.2)"
      }}>
        <h1 style={{ color: "white", fontSize: "1.5rem", margin: 0 }}>AgriSense Dashboard</h1>
        <button 
          onClick={handleLogout}
          style={{ 
            backgroundColor: "#f0f0f0", 
            border: "none", 
            padding: "8px 15px", 
            borderRadius: "8px", 
            fontWeight: "bold",
            cursor: "pointer",
            color: "#333"
          }}
        >
          Logout
        </button>
      </header>

      {/* SYSTEM STATUS BANNER */}
      <section style={{ 
        background: "rgba(255, 255, 255, 0.2)", 
        backdropFilter: "blur(10px)",
        padding: "20px", 
        borderRadius: "15px", 
        marginBottom: "25px", 
        color: "white",
        border: "1px solid rgba(255,255,255,0.3)"
      }}>
        <p style={{ margin: "0 0 10px 0", fontSize: "1.1rem" }}>
          System Gateway: <span style={{ fontWeight: "bold", color: isSystemActive ? "#afffba" : "#ffbaba" }}>
            {isSystemActive ? "● ONLINE" : "● OFFLINE"}
          </span>
        </p>
        <button 
          onClick={() => setIsSystemActive(!isSystemActive)}
          style={{ 
            width: "100%", 
            padding: "10px", 
            borderRadius: "10px", 
            border: "none", 
            backgroundColor: "white", 
            color: "#181b18", 
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {isSystemActive ? "Deactivate System" : "Activate System"}
        </button>
      </section>

      {/* METRICS GRID */}
      <div className="metrics-grid">
        {sensors.length === 0 ? (
          <p style={{ color: "white", textAlign: "center", gridColumn: "1/-1" }}>Scanning for sensors...</p> 
        ) : (
          sensors.map(s => (
            <StatusCard key={s.id} {...s} onToggle={() => handleTogglePower(s.id)} />
          ))
        )}
      </div>

      {/* ALERTS SECTION */}
      <section style={{ marginTop: "40px" }}>
        <h3 style={{ color: "white", marginBottom: "15px" }}>Notifications ({alerts.length})</h3>
        <div className="alerts-list">
          {alerts.map(a => (
            <AlertItem key={a.id} {...a} onDismiss={handleDismiss} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;