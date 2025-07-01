import { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const correctPassword = "anna"; // Correct password

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      onLogin(true);
    } else {
      alert('Incorrect password');
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

