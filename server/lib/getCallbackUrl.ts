import {APIGatewayEvent} from "aws-lambda";

const getCallbackUrl = (event: APIGatewayEvent): string => {
    const domain = event.requestContext.domainName;
    const stage = event.requestContext.stage;

    return `https://${domain}/${stage}`
}

export default getCallbackUrl;
