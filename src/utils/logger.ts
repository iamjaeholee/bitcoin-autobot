import { fromIni } from "@aws-sdk/credential-provider-ini";
import { REGION } from "../config";
import AWS from "aws-sdk";
import winston from "winston";
import WinstonCloudWatch from "winston-cloudwatch";

AWS.config.update({
  region: REGION,
  credentials: new AWS.SharedIniFileCredentials({ profile: "leejaeho" }),
});

winston.add(
  new WinstonCloudWatch({
    cloudWatchLogs: new AWS.CloudWatchLogs(),
    logGroupName:
      process.env.NODE_ENV === "production" ? "ethereum" : "testing",
    logStreamName: process.env.NODE_ENV === "production" ? "ethereum" : "first",
  })
);

// const alphaLogger = winston.createLogger({
//   transports:[
//     new WinstonCloudWatch({
//       cloudWatchLogs: new AWS.CloudWatchLogs(),
//       logGroupName: process.env.NODE_ENV === 'production' ? 'alpha' : 'testing',
//       logStreamName: process.env.NODE_ENV === 'production' ? 'alpha' : 'first'
//     })
//   ]
// })

// const etherLogger = winston.createLogger({
//   transports:[
//     new WinstonCloudWatch({
//       cloudWatchLogs: new AWS.CloudWatchLogs(),
//       logGroupName: process.env.NODE_ENV === 'production' ? 'ethereum' : 'testing',
//       logStreamName: process.env.NODE_ENV === 'production' ? 'ethereum' : 'first'
//     })
//   ]
// })

const cloudLogger = winston.createLogger({
  transports: [
    new WinstonCloudWatch({
      cloudWatchLogs: new AWS.CloudWatchLogs(),
      logGroupName:
        process.env.NODE_ENV === "production"
          ? (process.env.MARKET as string)
          : "testing",
      logStreamName:
        process.env.NODE_ENV === "production" ? process.env.MARKET : "first",
    }),
  ],
});

const testLogger = winston.createLogger();

export default winston;

// setup Logger
const logger = process.env.NODE_ENV === "production" ? cloudLogger : testLogger;

export { logger };
