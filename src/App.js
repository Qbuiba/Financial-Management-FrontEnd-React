import React, { useEffect, useState } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.token){
      setIsAuthenticated(true);
    }
  },[]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const location = useLocation();

  return (
    <div className="App">
      <nav>
        <ul>
          {!isAuthenticated ? (
            <>
              {location.pathname !== '/login' && location.pathname !== '/register' && (
                <>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              {location.pathname !== '/dashboard' && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}