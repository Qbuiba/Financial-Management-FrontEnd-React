//Login.js
import React, {useState} from 'react';
import authService from '../services/authService';
import '../Auth.css';

function Login({onLogin}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setMessage('');
      try {
        const response = await authService.login(username, password);
        setMessage('Login successful');
        console.log(response);
        onLogin(); // Trigger the authentication state change
      } catch (error) {
        setMessage('Login failed: Invalid credentials');
        console.error(error);
      }
    };
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    );
    }

export default Login;