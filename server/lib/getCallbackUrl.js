const getCallbackUrl = (event) => {
    const domain = event.requestContext.domainName;
    const stage = event.requestContext.stage;

    return `https://${domain}/${stage}`
}

module.exports = getCallbackUrl;