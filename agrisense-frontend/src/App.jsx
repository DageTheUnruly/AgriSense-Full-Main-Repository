import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";

// --- THE BOUNCER (Protected Route) ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token exists
  
  if (!token) {
    // No token? Kick them tf out to the login page
    return <Navigate to="/" replace />;
  }
  
  return children; // Has token? Let them in
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Route - The bouncer wraps the Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Redirect any unknown paths back to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;