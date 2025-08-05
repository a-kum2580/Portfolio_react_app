import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
      credentials: 'include'
    });
    const data = await response.json();
    if (data.success) {
      onLogin(true);
      navigate('/'); // Changed from '/manage-results'
    } else {
      setError('Incorrect password');
    }
  } catch (err) {
    setError('Error connecting to server');
  }
};
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome to Anna's Portfolio</h2>
        <p>Please enter the password to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsTyping(true)}
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isTyping && (
          <div className="password-hint">
            a
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;