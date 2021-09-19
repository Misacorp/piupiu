import {APIGatewayEvent} from "aws-lambda";

const disconnect = async (event: APIGatewayEvent): Promise<Object> => {
    const {requestContext: {connectionId}} = event;

    console.log('Client disconnected with connectionId', connectionId)

    // TODO: Set client status to disconnected in DynamoDB etc.
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'You disconnected! Sad to see you go :('})
    }
}

export default disconnect;
