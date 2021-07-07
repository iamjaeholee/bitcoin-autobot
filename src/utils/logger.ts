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
  logGroupName: process.env.NODE_ENV === 'production' ? 'ethereum' : 'testing',
  logStreamName: process.env.NODE_ENV === 'production' ? 'ethereum' : 'first'
}));

export default winston;