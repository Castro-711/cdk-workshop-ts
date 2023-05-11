import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs';

export interface HitCounterProps {
    // the function for which we want to count url hits
    downstream: lambda.IFunction;
}

export class HitCounter extends Construct {
    /**
     * Whats goin on here? 
     *  - We delcared a new construct called HitCounter
     *  - As usual it has a constructor with the expected args; scope, id, props & we propagate them to the cdk.Construct base class
     *  - props is of type HitCounterProps which includes a single property downstream of type lambda.IFunction. This is where we are going to "plug in" 
     *      the lambda function created in the previous chaptert so it can be hit-counted
     */

    // TODO

    // now let's add our Lambda & Dynamo Resources to our HitCounter Construct

    // allows accessing the counter function
    public readonly handler: lambda.Function;

    constructor(scope: Construct, id: string, props: HitCounterProps) {
        super(scope, id)

        const table = new dynamodb.Table(this, 'Hits', {
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
        })

        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });

        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.handler);
    }

    /**
     * What did we do here?
     *  - defined a DynamoDB table with path as the partition key
     *  - defined a Lambda func which is bound to the lambda/hitcounter.handler code
     *  - wired the Lambdas env vars to the functionName & tableName of our resources
     * 
     * Late-bound values
     *  The functionName & tableName properties are values that only resolve when we deploy our stack (notice that we haven't configured these physical names when we 
     *      defined the table/function only logical IDs). This means that if you print their values during syntheses, you will get a "TOKEN", which is how the CDK represents these 
     *      late-bound values. You should treat TOKENS as opaque strings. 
     *      This means you can concatenate them together for example, but don't be tempted to parse them in your code !!!!
     */
}