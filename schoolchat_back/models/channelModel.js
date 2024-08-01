const { dynamoDB } = require('../config/config');

const Channel = {
  create: async (channel) => {
    const params = {
      TableName: 'Channels',
      Item: channel
    };
    try {
      await dynamoDB.put(params).promise();
      console.log('Canal creado:', channel);
    } catch (error) {
      console.error('Error al crear canal:', error);
      throw error;
    }
  },

  findById: async (channelId) => {
    const params = {
      TableName: 'Channels',
      Key: { channelId }
    };
    try {
      const result = await dynamoDB.get(params).promise();
      return result.Item;
    } catch (error) {
      console.error('Error al buscar canal por ID:', error);
      throw error;
    }
  },

  findByGroupId: async (groupId) => {
    const params = {
      TableName: 'Channels',
      IndexName: 'ChannelsByGroup',
      KeyConditionExpression: 'groupId = :groupId',
      ExpressionAttributeValues: {
        ':groupId': groupId
      }
    };
    try {
      const result = await dynamoDB.query(params).promise();
      return result.Items;
    } catch (error) {
      console.error('Error al buscar canales por ID de grupo:', error);
      throw error;
    }
  },

  update: async (channelId, updateValues) => {
    const params = {
      TableName: 'Channels',
      Key: { channelId },
      UpdateExpression: 'set ' + Object.keys(updateValues).map((key, idx) => `#${key} = :${key}`).join(', '),
      ExpressionAttributeNames: Object.keys(updateValues).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {}),
      ExpressionAttributeValues: Object.keys(updateValues).reduce((acc, key) => ({ ...acc, [`:${key}`]: updateValues[key] }), {}),
      ReturnValues: 'UPDATED_NEW'
    };
    try {
      const result = await dynamoDB.update(params).promise();
      console.log('Canal actualizado:', result);
      return result;
    } catch (error) {
      console.error('Error al actualizar canal:', error);
      throw error;
    }
  },

  deleteById: async (channelId) => {
    const params = {
      TableName: 'Channels',
      Key: { channelId }
    };
    try {
      await dynamoDB.delete(params).promise();
      console.log('Canal eliminado:', channelId);
    } catch (error) {
      console.error('Error al eliminar canal:', error);
      throw error;
    }
  },

  listByGroupId: async (groupId) => {
    const params = {
      TableName: 'Channels',
      IndexName: 'ChannelsByGroup',
      KeyConditionExpression: 'groupId = :groupId',
      ExpressionAttributeValues: {
        ':groupId': groupId
      }
    };
    try {
      const result = await dynamoDB.query(params).promise();
      return result.Items;
    } catch (error) {
      console.error('Error al listar canales por ID de grupo:', error);
      throw error;
    }
  }
  
};

module.exports = Channel;
