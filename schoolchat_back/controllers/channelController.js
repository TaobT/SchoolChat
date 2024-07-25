const { v4: uuidv4 } = require('uuid');
const Channel = require('../models/channelModel');

// Controlador para crear un canal
exports.createChannel = async (req, res) => {
  const { groupId, name } = req.body;

  const channel = {
    channelId: uuidv4(),
    groupId,
    name
  };

  try {
    await Channel.create(channel);
    res.status(201).json({ message: 'Canal creado', channel });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear canal', error });
  }
};

// Controlador para obtener canales por ID de grupo
exports.getChannelsByGroupId = async (req, res) => {
  const { groupId } = req.params;
  console.log(`Recibido groupId: ${groupId}`);

  try {
    const channels = await Channel.listByGroupId(groupId);
    console.log(`Canales encontrados: ${channels}`);
    if (!channels) {
      return res.status(404).json({ message: 'No se encontraron canales para este grupo' });
    }
    res.status(200).json(channels);
  } catch (error) {
    console.error(`Error al obtener canales: ${error.message}`);
    res.status(500).json({ message: 'Error al obtener canales', error });
  }
};
