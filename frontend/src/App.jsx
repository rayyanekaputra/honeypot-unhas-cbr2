// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/login`, {
        username,
        password,
      });
      setMessage(res.data.message)
      // alert('Login attempt recorded.');
    } catch (error) {
      alert("Failed to POST from FE");
    }
  };

  return (
    <div className="App">
      <h1>
        UNHAS <br />
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
        {message && <p>Incorrect password</p>}
      </form>
    </div>
  );
}

export default App;
