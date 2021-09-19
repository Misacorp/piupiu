import {APIGatewayEvent} from "aws-lambda";
import getCallbackUrl from './getCallbackUrl';
import sendMessageToClient from "./sendMessageToClient";

/**
 * Send a message to the client that caused an event.
 */
async function respondToClient(event: APIGatewayEvent, payload: {}): Promise<{}>
{
    if (event.requestContext.connectionId === undefined) {
        throw new Error('Cannot respond to a client whose connectionId is undefined')
    }

    const connectionId: string = event.requestContext.connectionId;
    return sendMessageToClient(getCallbackUrl(event), event.requestContext.connectionId, payload)
}

export default respondToClient;