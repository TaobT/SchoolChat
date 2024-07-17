const { dynamoDB } = require('../config/config');

const Message = {
    
  create: (message) => {
    const params = {
      TableName: 'Messages',
      Item: message
    };
    return dynamoDB.put(params).promise();
  },

  findByChannel: (channelId) => {
    const params = {
      TableName: 'Messages',
      IndexName: 'MessagesByChannel',
      KeyConditionExpression: 'channelId = :channelId',
      ExpressionAttributeValues: {
        ':channelId': channelId
      }
    };
    return dynamoDB.query(params).promise();
  },

  findByUser: (userId) => {
    const params = {
      TableName: 'Messages',
      IndexName: 'MessagesByUser',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };
    return dynamoDB.query(params).promise();
  }
};

module.exports = Message;
