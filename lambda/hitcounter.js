const { DynamoDB, Lambda } = require('aws-sdk');

exports.handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));

    // create AWS SDK clients
    const dynamo = new DynamoDB();
    const lambda = new Lambda();

    // update dynamo entry for "path" with hits++
    await dynamo.updateItem({
        TableName: process.env.HITS_TABLE_NAME,
        Key: { path: { S: event.path } },
        UpdateExpression: 'ADD hits :incr',
        ExpressionAttributeValues: { ':incr': { N: '1' } }
    }).promise();

    // call downstream function & capture respons
    const resp = await lambda.invoke({
        FunctionName: process.env.DDOWNSTREAM_FUNCTION_NAME,
        Payload: JSON.stringify(event)
    }).promise();

    console.log('downstream response:', JSON.stringify(resp, undefined, 2));

    // return response back to upstream caller
    return JSON.parse(resp.Payload);

    /**
     * You'll notice that the code relise on 2 env vars:
     *  - HITS_TABLE_NAME: name of the DynamoDB table to use
     *  - DOWNSTREAM_FUNCTION_NAME: name of downstream AWS Lambda function
     * 
     * Since they will only be decided when we deploy our app, we need to wire up these values from our construct code. 
     */
}