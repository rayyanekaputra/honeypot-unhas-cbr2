// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      // alert('Login attempt recorded.');
    } catch (error) {
      alert("An error occurred.");
    }
  };

  return (
    <div className="App">
      <h1>
        UNHAS's <br />
        Admin Panel
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
