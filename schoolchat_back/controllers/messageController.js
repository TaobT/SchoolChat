const Message = require('../models/messageModel');
const { v4: uuidv4 } = require('uuid');

const createMessage = async (req, res) => {
  const { channelId, userId, username, avatar, text } = req.body;
  const timestamp = new Date().toISOString();
  const messageId = uuidv4();

  const message = {
    messageId,
    channelId,
    userId,
    username,
    avatar,
    text,
    timestamp
  };

  try {
    await Message.create(message);
    res.status(201).send({ message: 'Mensaje creado.', message });
  } catch (error) {
    res.status(500).send({ error: 'Error al crear el mensaje. Razón: ' + error });
  }
};

const getMessagesByChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const result = await Message.findByChannel(channelId);
    res.status(200).send(result.Items);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener mensajes. Razón: ' + error });
  }
};

const getMessagesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Message.findByUser(userId);
    res.status(200).send(result.Items);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener mensajes. Razón: ' + error });
  }
};

module.exports = {
  createMessage,
  getMessagesByChannel,
  getMessagesByUser
};
