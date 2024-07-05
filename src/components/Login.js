//Login.js
import React, {useState} from 'react';
import authService from '../services/authService';

function Login(){
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
      } catch (error) {
        setMessage('Login failed: Invalid credentials');
        console.error(error);
      }
    };
    return (
        <div>
        <form onSubmit={handleLogin}>
            <div>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
            {message && <p>{message}</p>}
        </div>
      );
    }

export default Login;