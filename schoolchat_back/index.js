const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true  // Habilita el intercambio de cookies (si es necesario)
}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});