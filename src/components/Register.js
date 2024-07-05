//Register.js
import React, {useState} from 'react';
import authService from '../services/authService';

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await authService.register(username, password);
      setMessage('Registration successful');
      console.log(response);
    } catch (error) {
        setMessage('Registration successful');
      console.error(error);
    }
  };

    return (
        <div>
            <form onSubmit={handleRegister}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
      );

}

export default Register;
