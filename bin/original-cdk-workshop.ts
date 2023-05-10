#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { OriginalCdkWorkshopStack } from '../lib/original-cdk-workshop-stack';

const app = new cdk.App();
new OriginalCdkWorkshopStack(app, 'OriginalCdkWorkshopStack');
