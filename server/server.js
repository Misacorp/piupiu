const dynamoTest = require('./src/api/dynamoTest')
const getCallbackUrl = require('./lib/getCallbackUrl')
const sendMessageToClient = require('./lib/sendMessageToClient')

const connectionHandler = async (event) => {
    const {requestContext: {connectionId, routeKey}} = event;

    if (routeKey === '$connect') {
        console.log('Client connected with connectionId', connectionId)
        return {
            statusCode: 200,
            body: JSON.stringify('Listener Connected'),
        };
    }

    if (routeKey === '$disconnect') {
        console.log('Client disconnected with connectionId', connectionId)
        return {
            statusCode: 200,
            body: JSON.stringify('Listener Disconnected'),
        };
    }

    return {
        statusCode: 500,
        body: JSON.stringify(`Unknown routeKey: ${routeKey}`)
    }
};

const defaultHandler = async (event) => {
    await sendMessageToClient(getCallbackUrl(event), event.requestContext.connectionId, event);

    return {
        statusCode: 200,
    };
};

module.exports = {
    connectionHandler,
    defaultHandler,
    dynamoTest
}