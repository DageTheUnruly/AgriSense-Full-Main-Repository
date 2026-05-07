import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(''); // To show if login fails
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear old errors

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // 1. Save the token (The Bouncer in App.jsx looks for this)
        localStorage.setItem('token', data.token);
        
        // 2. Save the username for a greeting (Optional)
        localStorage.setItem('username', data.user);

        // 3. Move to the dashboard
        navigate('/dashboard');
      } else {
        // Show the error from Django (e.g., "Invalid Credentials")
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Cannot connect to server. Is the Django backend running?');
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>AgriSense Login</h2>
        
        {/* Error message display */}
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Access Dashboard</button>
      </form>
    </div>
  );
};

export default Login; 