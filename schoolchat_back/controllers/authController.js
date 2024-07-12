const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
  const { email, socialLogin } = req.body;
  const userId = uuidv4();
  const registrationTime = new Date().toISOString();

  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '2d' }); // TODO: Notificar al usuario si su token expiro

  try {
    await User.create({
      userId,
      email,
      socialLogin,
      registrationTime,
      complete: false
    });
    res.status(201).send({ message: 'Usuario creado.', token });
  } catch (err) {
    res.status(500).send({ err});
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.status(200).send({ userId: decoded.userId });
  } catch (error) {
    res.status(401).send({ error: 'Token invalido.' });
  }
}

const completeRegistration = async (req, res) => {
  const { userId, username, realName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    await User.update(userId, { username, realName, password: hashedPassword, complete: true });
    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
    res.status(200).send({ message: 'Registro completado.', token });
  } catch (error) {
    res.status(500).send({ error: 'Error al completar el registro. Razon: ' + error});
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.findByEmail(email);
    if (result.Items.length === 0 || !result.Items[0].complete) {
      return res.status(400).send({ error: 'Usuario no encontrado o registro incompleto.' });
    }

    const user = result.Items[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign({ userId: user.userId }, jwtSecret, { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send({ error: 'Error al iniciar sesión.', err  });
  }
};

module.exports = {
  register,
  completeRegistration,
  verifyToken,
  login
};