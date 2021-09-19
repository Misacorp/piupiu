import {APIGatewayEvent} from "aws-lambda";

export default async (event: APIGatewayEvent): Promise<Object> => {
    const {requestContext: {connectionId}} = event;

    console.log('Client connected with connectionId', connectionId)

    // TODO: Save connectionId to DynamoDB

    return {
        statusCode: 200,
        body: JSON.stringify({message: 'You did it! You connected!'})
    }
}
