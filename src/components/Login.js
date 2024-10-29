
import React, { useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database'; 
import { db } from '../firebase'; 
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      const userRef = ref(db, 'users/' + email.replace('.', ',')); 
      const snapshot = await get(userRef); 

      if (snapshot.exists()) {
        const userData = snapshot.val();

        if (userData.password === password) {
          onLoginSuccess(); 
        } else {
          alert('Incorrect password. Please try again.'); 
        }
      } else {
        alert('No user found with this email. Please register.'); 
      }
    } catch (error) {
      setErrorMessage('Error logging in. Please try again later.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
