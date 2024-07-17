const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();

const allowedOrigins = ['https://localhost:4200', 'https://18.222.28.159', 'https://ec2-18-222-28-159.us-east-2.compute.amazonaws.com']; // Agrega los orígenes permitidos aquí

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

const PORT = process.env.PORT || 3000;

// Read SSL certificate files
const privateKey = fs.readFileSync('./https/nginx.key', 'utf8');
const certificate = fs.readFileSync('./https/nginx.crt', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate
};

// Create HTTPS server
try {
  // Read SSL certificate files
  const privateKey = fs.readFileSync('./https/nginx.key', 'utf8');
  const certificate = fs.readFileSync('./https/nginx.crt', 'utf8');
  
  const credentials = {
    key: privateKey,
    cert: certificate
  };
  var httpsServer = https.createServer(credentials, app);
}
catch (e) {
  
  console.log('\x1b[33m%s\x1b[0m', 'No se pudo crear un servidor HTTPS, se usará HTTP');
  var httpsServer = https.createServer(app);
}

httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});