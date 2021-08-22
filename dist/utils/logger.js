"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var config_1 = require("../config");
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var winston_1 = __importDefault(require("winston"));
var winston_cloudwatch_1 = __importDefault(require("winston-cloudwatch"));
aws_sdk_1.default.config.update({
    region: config_1.REGION,
    credentials: new aws_sdk_1.default.SharedIniFileCredentials({ profile: "leejaeho" }),
});
winston_1.default.add(new winston_cloudwatch_1.default({
    cloudWatchLogs: new aws_sdk_1.default.CloudWatchLogs(),
    logGroupName: process.env.NODE_ENV === "production" ? "ethereum" : "testing",
    logStreamName: process.env.NODE_ENV === "production" ? "ethereum" : "first",
}));
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
var cloudLogger = winston_1.default.createLogger({
    transports: [
        new winston_cloudwatch_1.default({
            cloudWatchLogs: new aws_sdk_1.default.CloudWatchLogs(),
            logGroupName: process.env.NODE_ENV === "production"
                ? process.env.MARKET
                : "testing",
            logStreamName: process.env.NODE_ENV === "production" ? process.env.MARKET : "first",
        }),
    ],
});
var testLogger = winston_1.default.createLogger();
exports.default = winston_1.default;
// setup Logger
var logger = process.env.NODE_ENV === "production" ? cloudLogger : testLogger;
exports.logger = logger;
