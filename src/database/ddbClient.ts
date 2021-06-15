import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {fromIni} from '@aws-sdk/credential-provider-ini';
import { REGION } from "../config";

const ddbClient = new DynamoDBClient({ credentials: fromIni({profile: 'leejaeho'}), region: REGION });

export { ddbClient };