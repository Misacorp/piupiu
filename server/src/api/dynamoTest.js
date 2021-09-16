const AWS = require("aws-sdk");
const getCallbackUrl = require('../../lib/getCallbackUrl')
const sendMessageToClient = require('../../lib/sendMessageToClient')

const dynamoTest = async (event) => {
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'joinCode': `${Math.random() * 1000}A`,
            'message': JSON.parse(event.body).message,
        }
    };

    console.log("Adding a new item...", params);
    const result = await docClient.put(params).promise()

    await sendMessageToClient(getCallbackUrl(event), event.requestContext.connectionId, result)

    return {statusCode: 200, body: JSON.stringify(result)}
}

module.exports = dynamoTest