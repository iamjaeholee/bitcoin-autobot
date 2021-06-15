import { PutItemCommand, PutItemCommandInput, GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import {ddbClient} from './ddbClient';

/**
 * This class manage all about database
 */


class DbManager {
  constructor() {}

  /**
   * 
   * @param {PutItemCommandInput} params 
   * @returns {PutItemCommandOutput}
   */

  public async putItem(params: PutItemCommandInput) {
    try {
      const data = await ddbClient.send(new PutItemCommand(params));

      return data;
    } catch(err) {
      console.error(err);
    }
  }


  /**
   * 
   * @param {GetItemCommandInput} params 
   * @returns {GetItemCommandOutput}
   */

  public async getItem(params: GetItemCommandInput) {
    try {
      const data = await ddbClient.send(new GetItemCommand(params));

      return data;
    } catch(err) {
      console.error(err);
    }
  }
}

const dbManager = new DbManager();
export default dbManager;
