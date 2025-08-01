// App.jsx
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DonateForm from './pages/DonationForm';
import Receive from './pages/Receive';
import DonationDetail from './pages/DonationDetail';
import DonationLocation from './pages/DonationLocation';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token, userInfo) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(userInfo);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard user={user} token={token} />} />
        <Route path="/donate" element={<DonateForm />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/donation/:id" element={<DonationDetail />} />
        <Route path="/donation/:id/location" element={<DonationLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
