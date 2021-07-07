"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var winston_1 = __importDefault(require("winston"));
var winston_cloudwatch_1 = __importDefault(require("winston-cloudwatch"));
aws_sdk_1.default.config.update({
    region: config_1.REGION,
    credentials: new aws_sdk_1.default.SharedIniFileCredentials({ profile: 'leejaeho' })
});
winston_1.default.add(new winston_cloudwatch_1.default({
    cloudWatchLogs: new aws_sdk_1.default.CloudWatchLogs(),
    logGroupName: process.env.NODE_ENV === 'production' ? 'ethereum' : 'testing',
    logStreamName: process.env.NODE_ENV === 'production' ? 'ethereum' : 'first'
}));
exports.default = winston_1.default;