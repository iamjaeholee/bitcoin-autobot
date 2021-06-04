import {Method} from 'axios';
import ApiHandler from '../api-handler';
import {accessKey, secretKey} from '../../config/key';

const apiHandler = new ApiHandler();
const tickerConfig = {
  method: 'get' as Method,
  url: 'https://api.upbit.com/v1/ticker',
  params: {
    markets: 'KRW-BTC',
  }
}

const daysCandleConfig = {
  method: 'get' as Method,
  url: 'https://api.upbit.com/v1/candles/days',
  params: {
    market: 'KRW-BTC',
    count: 2
  }
}

describe('TickerGetter function', () => {
  it('should get daysCandle information from get method', async () => {
    const tickerPromise = apiHandler.getInformation(tickerConfig);

    await tickerPromise.then((data: Array<any>) => {
      console.log(data);
      expect(typeof data).toEqual('object');
    })
  })


  it('should get ticker information from get method', async () => {
    const daysCandlePromise = apiHandler.getInformation(daysCandleConfig);

    await daysCandlePromise.then((data: Array<any>) => {
      console.log(data);
      console.log(new Date(data[0].timestamp));
      console.log(new Date(data[1].timestamp));
      expect(typeof data).toEqual('object');
    })
  })
})