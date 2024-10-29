
import React from 'react';

const Navbar = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage('login')}>Login</button>
      <button onClick={() => setPage('register')}>Register</button>
    </nav>
  );
};

export default Navbar;
