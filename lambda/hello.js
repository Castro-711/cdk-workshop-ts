exports.handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2))
    return {
        status: 200, 
        headers: { "Content-Type": "text/plain" },
        body: `Good Life, CDK! You've hit ${event.path}\n`
    }
}