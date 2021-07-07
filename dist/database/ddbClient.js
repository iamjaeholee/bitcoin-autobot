"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ddbClient = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var credential_provider_ini_1 = require("@aws-sdk/credential-provider-ini");
var config_1 = require("../config");
var ddbClient = new client_dynamodb_1.DynamoDBClient({ credentials: credential_provider_ini_1.fromIni({ profile: 'leejaeho' }), region: config_1.REGION });
exports.ddbClient = ddbClient;
