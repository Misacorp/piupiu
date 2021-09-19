import {APIGatewayEvent} from "aws-lambda";
import respondToClient from "../../lib/respondToClient";

export default async (event: APIGatewayEvent): Promise<void> => {
    const {requestContext: {connectionId}} = event;

    console.log('Default request handler running for connectionId', connectionId)

    await respondToClient(event, {
        message: 'Your request was handled by the default request handler that basically does nothing'
    })
}
