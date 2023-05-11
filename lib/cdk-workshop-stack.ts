import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,    // execution env
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" dir
      handler: 'hello.handler'                // file is "hello", function is "handler"
    })


    // defines Api Gateway rest api resource backed by our "hello" function
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    })
  }
}
