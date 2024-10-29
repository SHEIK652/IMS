
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Inventory from './components/Inventory';
import Registration from './components/Registration';
import Login from './components/Login';
import './App.css';

function App() {
  const [page, setPage] = useState('login'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setPage('inventory'); 
  };

  const handleRegisterSuccess = () => {
    setPage('login'); 
  };

  return (
    <div className="App">
      <Navbar setPage={setPage} />
      {page === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {page === 'inventory' && isLoggedIn && <Inventory />}
      {page === 'register' && <Registration onRegisterSuccess={handleRegisterSuccess} />}
    </div>
  );
}

export default App;
