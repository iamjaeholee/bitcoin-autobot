import {fromIni} from '@aws-sdk/credential-provider-ini';
import { REGION } from "../config";
import AWS from 'aws-sdk';
import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

AWS.config.update({
  region: REGION,
	credentials: new AWS.SharedIniFileCredentials({profile: 'leejaeho'})
});

winston.add(new WinstonCloudWatch({
  cloudWatchLogs: new AWS.CloudWatchLogs(),
  logGroupName: 'testing',
  logStreamName: 'first'
}));

export default winston;