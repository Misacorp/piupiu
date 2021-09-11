const AWS = require('aws-sdk');

const sendMessageToClient = (url, connectionId, payload) =>
    new Promise((resolve, reject) => {
        const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: url,
        });
        apigatewaymanagementapi.postToConnection(
            {
                ConnectionId: connectionId, // connectionId of the receiving ws-client
                Data: JSON.stringify(payload),
            },
            (err, data) => {
                if (err) {
                    console.log('err is', err);
                    reject(err);
                }
                resolve(data);
            }
        );
    });

const connectionHandler = async (event) => {
    const { requestContext: { connectionId, routeKey } } = event;

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

const getCallbackUrl = (event) => {
    const domain = event.requestContext.domainName;
    const stage = event.requestContext.stage;

    return `https://${domain}/${stage}`
}

const defaultHandler = async (event) => {
    await sendMessageToClient(getCallbackUrl(event), event.requestContext.connectionId, event);

    return {
        statusCode: 200,
    };
};

const dynamoTest = async (event) => {
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    var params = {
        TableName: 'LobbyTable',
        Item: {
            'joinCode' : {S: 'XD'}
        }
    };

// Call DynamoDB to add the item to the table
    ddb.putItem(params, async function(err, data) {
        if (err) {
            console.log("Error", err);
            await sendMessageToClient(getCallbackUrl(event), event.requestContext.connectionId, { result: 'error', error: err } )
        } else {
            console.log("Success", data);
            await sendMessageToClient(getCallbackUrl(event), event.requestContext.connectionId, { result: 'success' } )
        }
    });


    return {
        statusCode: 200,
    }
}

module.exports = {
    connectionHandler,
    defaultHandler,
    dynamoTest
}