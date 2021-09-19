import {ApiGatewayManagementApi} from 'aws-sdk'

const sendMessageToClient = (url: string, connectionId: string, payload: {}): Promise<{}> =>
    new Promise((resolve, reject) => {
        const apiGatewayManagementApi = new ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: url,
        });

        apiGatewayManagementApi.postToConnection(
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

export default sendMessageToClient;