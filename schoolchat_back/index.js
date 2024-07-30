const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();

const allowedOrigins = ['https://localhost:4200', 'http://localhost:4200', 'https://18.222.28.159', 'https://ec2-18-222-28-159.us-east-2.compute.amazonaws.com']; // Agrega los orígenes permitidos aquí

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Habilita el intercambio de cookies (si es necesario)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/groups', groupRoutes);

const PORT = process.env.PORT || 3000;

// Create HTTPS server
try {
  // Read SSL certificate files
  const privateKey = fs.readFileSync('/etc/nginx/ssl/nginx.key', 'utf8');
  const certificate = fs.readFileSync('/etc/nginx/ssl/nginx.crt', 'utf8');
  
  const options = {
    key: privateKey,
    cert: certificate,
    secureOptions: require('constants').SSL_OP_NO_TLSv1 | require('constants').SSL_OP_NO_TLSv1_1
  };
  var httpsServer = https.createServer(options, app);
  httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
  });
}
catch (e) {
  
  console.log('\x1b[33m%s\x1b[0m', 'No se pudo crear un servidor HTTPS, se usará HTTP');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
