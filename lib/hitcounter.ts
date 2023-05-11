import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface HitCounterProps {
    // the function for which we want to count url hits
    downstream: lambda.IFunction;
}

export class HitCounter extends Construct {
    constructor(scope: Construct, id: string, props: HitCounterProps) {
        super(scope, id)
    }

    /**
     * Whats goin on here? 
     *  - We delcared a new construct called HitCounter
     *  - As usual it has a constructor with the expected args; scope, id, props & we propagate them to the cdk.Construct base class
     *  - props is of type HitCounterProps which includes a single property downstream of type lambda.IFunction. This is where we are going to "plug in" 
     *      the lambda function created in the previous chaptert so it can be hit-counted
     */

    // TODO
}