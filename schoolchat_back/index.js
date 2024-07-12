const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();

app.use(cors());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true  // Habilita el intercambio de cookies (si es necesario)
}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Read SSL certificate files
const privateKey = fs.readFileSync('./https/nginx.key', 'utf8');
const certificate = fs.readFileSync('./https/nginx.crt', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate
};

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});