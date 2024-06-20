// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/login', { username, password });
      // alert('Login attempt recorded.');
    } catch (error) {
      alert('An error occurred.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Honeypot Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </header>
    </div>
  );
}

export default App;
