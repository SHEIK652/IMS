
import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase'; 
import './Registration.css';

const Registration = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
   
      const newUser = {
        email,
        password, 
      };

      const userRef = ref(db, 'users/' + email.replace('.', ','));
      await set(userRef, newUser);

   
      alert('Registration successful! Please log in.'); 
      onRegisterSuccess(); 
    } catch (error) {
      setErrorMessage('Error registering user. Please try again later.');
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleRegister} className="registration-form">
        <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
