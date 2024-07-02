const { dynamoDB } = require('../config/config');

const User = {
  create: (user) => {
    const params = {
      TableName: 'Users',
      Item: user
    };
    return dynamoDB.put(params).promise();
  },
  
  update: (userId, updateValues) => {
    const params = {
      TableName: 'Users',
      Key: { userId },
      UpdateExpression: 'set ' + Object.keys(updateValues).map((key, idx) => `#${key} = :${key}`).join(', '),
      ExpressionAttributeNames: Object.keys(updateValues).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {}),
      ExpressionAttributeValues: Object.keys(updateValues).reduce((acc, key) => ({ ...acc, [`:${key}`]: updateValues[key] }), {}),
      ReturnValues: 'UPDATED_NEW'
    };
    return dynamoDB.update(params).promise();
  },
  
  findByEmail: (email) => {
    const params = {
      TableName: 'Users',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :e',
      ExpressionAttributeValues: {
        ':e': email
      }
    };
    return dynamoDB.query(params).promise();
  },
  
  deleteIncomplete: (twoDaysAgo) => {
    const params = {
      TableName: 'Users',
      FilterExpression: 'complete = :c and registrationTime < :time',
      ExpressionAttributeValues: {
        ':c': false,
        ':time': twoDaysAgo
      }
    };
    return dynamoDB.scan(params).promise();
  },
  
  deleteById: (userId) => {
    const params = {
      TableName: 'Users',
      Key: { userId }
    };
    return dynamoDB.delete(params).promise();
  }
};

module.exports = User;