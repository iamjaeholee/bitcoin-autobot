import DbManager from '../';
import ApiHandler from '../../core/api-handler';
import {Method} from 'axios';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

const date = '2021-06-15 00:00:00';

const daysCandleConfig = {
  method: 'get' as Method,
  url: 'https://api.upbit.com/v1/candles/days',
  params: {
    market: 'KRW-ETH',
    count: 1,
    to: date
  }
}

describe('DbManager class putItem function', () => {
  it('should put item specified above', async () => {
    const getEthereumData = await ApiHandler.getInformation(daysCandleConfig);

    const params = {
      TableName: "Ethereum",
      Item: {
        date: {S: date},
        data: {S: typeof getEthereumData === 'string' ? getEthereumData : JSON.stringify(getEthereumData)},
      },
    }

    const result = await DbManager.putItem(params);

    console.log(result);

    expect(result).not.toBe(undefined);
    expect(result?.$metadata.httpStatusCode).toBe(200);
  })

})

describe('DbManager class getItem function', () => {
  it('should fetch item specified key', async () => {
    const params = {
      TableName: "Ethereum",
      Key: {
        date: {S: date}
      },
    }

    const result = await DbManager.getItem(params);

    console.log(result);
    expect(result).not.toBe(undefined);
    expect(result?.$metadata.httpStatusCode).toBe(200);
  })
})

afterAll(async () => {
  const params = {
    TableName: "Ethereum",
    Key: {
      date: {S: date}
    },
  }

  const result = await DbManager.deleteItem(params);
})