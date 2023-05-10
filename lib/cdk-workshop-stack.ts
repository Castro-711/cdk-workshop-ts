import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'

<<<<<<< HEAD:lib/original-cdk-workshop-stack.ts
export class OriginalCdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'OriginalCdkWorkshopQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'OriginalCdkWorkshopTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));
=======
export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,    // execution env
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" dir
      handler: 'hello.handler'                // file is "hello", function is "handler"
    })

>>>>>>> 15d85fb (Started Hello Lambda before forking to my own repo):lib/cdk-workshop-stack.ts
  }
}
