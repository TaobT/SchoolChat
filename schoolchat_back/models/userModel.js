const { dynamoDB } = require('../config/config');

const User = {
  create: async (user) => {
    const params = {
      TableName: 'Users',
      Item: user
    };
    try {
      await dynamoDB.put(params).promise();
      console.log('Usuario creado:', user);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },

  update: async (userId, updateValues) => {
    const params = {
      TableName: 'Users',
      Key: { userId },
      UpdateExpression: 'set ' + Object.keys(updateValues).map((key, idx) => `#${key} = :${key}`).join(', '),
      ExpressionAttributeNames: Object.keys(updateValues).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {}),
      ExpressionAttributeValues: Object.keys(updateValues).reduce((acc, key) => ({ ...acc, [`:${key}`]: updateValues[key] }), {}),
      ReturnValues: 'UPDATED_NEW'
    };
    try {
      const result = await dynamoDB.update(params).promise();
      console.log('Usuario actualizado:', result);
      return result;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  },

  findById: async (userId) => {
    const params = {
      TableName: 'Users',
      Key: { userId }
    };
    try {
      const result = await dynamoDB.get(params).promise();
      return result.Item;
    } catch (error) {
      console.error('Error al buscar usuario por ID:', error);
      throw error;
    }
  },

  findByEmail: async (email) => {
    const params = {
      TableName: 'Users',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :e',
      ExpressionAttributeValues: {
        ':e': email
      }
    };
    try {
      const result = await dynamoDB.query(params).promise();
      console.log('Usuario encontrado por email:', result);
      return result;
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw error;
    }
  },

  deleteIncomplete: async (twoDaysAgo) => {
    const params = {
      TableName: 'Users',
      FilterExpression: 'complete = :c and registrationTime < :time',
      ExpressionAttributeValues: {
        ':c': false,
        ':time': twoDaysAgo
      }
    };
    try {
      const result = await dynamoDB.scan(params).promise();
      console.log('Usuarios incompletos encontrados:', result);
      return result;
    } catch (error) {
      console.error('Error al buscar usuarios incompletos:', error);
      throw error;
    }
  },

  deleteById: async (userId) => {
    const params = {
      TableName: 'Users',
      Key: { userId }
    };
    try {
      await dynamoDB.delete(params).promise();
      console.log('Usuario eliminado:', userId);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }
};

module.exports = User;
