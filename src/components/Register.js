//Register.js
import React, {useState} from 'react';
import authService from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css';

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    //Function to validate username
    const validateUsername = (username) => {
      const regex = /^[a-zA-Z0-9]{3,15}$/;
      return regex.test(username);
    };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validation the validate username and password
    if (!validateUsername(username)) {
      setMessage('Username must be 3-15 characters long and contain no special characters.');
      return;
    }

    if (password.length < 6 || password.length > 8) {
      setMessage('Password must be between 6 and 8 characters.');
      return;
    }

    try {
      const response = await authService.register(username, password);
      setMessage('Registration successful. Redirecting to login...');
      console.log(response);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p className="info-message">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Register;
