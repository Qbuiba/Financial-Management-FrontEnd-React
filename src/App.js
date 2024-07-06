import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
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

  return(
  <Router>
    <div className='App'>
      <nav>
        <ul>
          {isAuthenticated ?(
            <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            </>
          ) : (
            <>
              <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
            </>
          )
          }
        </ul>
      </nav>
      <Routes>
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard"/>} />
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
    </div>
  </Router>
  );
}

export default App;
