const { dynamoDB } = require('../config/config');

const Group = {
  create: async (group) => {
    const params = {
      TableName: 'Groups',
      Item: group
    };
    try {
      await dynamoDB.put(params).promise();
      console.log('Grupo creado:', group);
    } catch (error) {
      console.error('Error al crear grupo:', error);
      throw error;
    }
  },

  findById: async (groupId) => {
    const params = {
      TableName: 'Groups',
      Key: { groupId }
    };
    try {
      const result = await dynamoDB.get(params).promise();
      return result.Item;
    } catch (error) {
      console.error('Error al buscar grupo por ID:', error);
      throw error;
    }
  },

  findByInviteCode: async (inviteCode) => {
    const params = {
      TableName: 'Groups',
      IndexName: 'InviteCodeIndex',
      KeyConditionExpression: 'inviteCode = :inviteCode',
      ExpressionAttributeValues: {
        ':inviteCode': inviteCode
      }
    };
    try {
      const result = await dynamoDB.query(params).promise();
      return result.Items;
    } catch (error) {
      console.error('Error al buscar grupo por código de invitación:', error);
      throw error;
    }
  },

  update: async (groupId, updateValues) => {
    const params = {
      TableName: 'Groups',
      Key: { groupId },
      UpdateExpression: 'set ' + Object.keys(updateValues).map((key, idx) => `#${key} = :${key}`).join(', '),
      ExpressionAttributeNames: Object.keys(updateValues).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {}),
      ExpressionAttributeValues: Object.keys(updateValues).reduce((acc, key) => ({ ...acc, [`:${key}`]: updateValues[key] }), {}),
      ReturnValues: 'UPDATED_NEW'
    };
    try {
      const result = await dynamoDB.update(params).promise();
      console.log('Grupo actualizado:', result);
      return result;
    } catch (error) {
      console.error('Error al actualizar grupo:', error);
      throw error;
    }
  },

  deleteById: async (groupId) => {
    const params = {
      TableName: 'Groups',
      Key: { groupId }
    };
    try {
      await dynamoDB.delete(params).promise();
      console.log('Grupo eliminado:', groupId);
    } catch (error) {
      console.error('Error al eliminar grupo:', error);
      throw error;
    }
  },

  listAll: async () => {
    const params = {
      TableName: 'Groups'
    };
    try {
      const result = await dynamoDB.scan(params).promise();
      return result.Items;
    } catch (error) {
      console.error('Error al listar grupos:', error);
      throw error;
    }
  },

  findByUserId: async (userId) => {
    const params = {
      TableName: 'Groups',
      FilterExpression: 'contains(members, :userId)',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };
    try {
      const result = await dynamoDB.scan(params).promise();
      // Extraer groupId de cada grupo encontrado
      const groupsWithIds = result.Items.map(group => ({
        groupId: group.groupId,
        name: group.name, // puedes incluir otros atributos si lo deseas
        photoUrl: group.photoUrl,
        inviteCode: group.inviteCode,
        createdBy: group.createdBy,
        members: group.members,
        channels: group.channels || [] // Agregar canales
      }));

      return groupsWithIds;
    } catch (error) {
      console.error('Error al buscar grupos por ID de usuario:', error);
      throw error;
    }
  }
};

module.exports = Group;
