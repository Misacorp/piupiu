import {APIGatewayEvent} from "aws-lambda";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import respondToClient from "../../lib/respondToClient";

const AWS = require("aws-sdk");

const dynamoTest = async (event: APIGatewayEvent): Promise<void> => {
    if (process.env.TABLE_NAME === undefined) {
        throw new Error('TABLE_NAME environment variable is not defined');
    }
    if (event.body === null) {
        await respondToClient(event, {message: 'Dynamo test exited early: no body in request'});
        return;
    }

    const docClient = new AWS.DynamoDB.DocumentClient();
    const params: DocumentClient.PutItemInput = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'joinCode': `${Math.random() * 1000}A`,
            'message': JSON.parse(event.body).message,
        }
    };

    console.log("Adding a new item...", params);
    const result = await docClient.put(params).promise()

    await respondToClient(event, {message: 'Done', result});
}

export default dynamoTest;