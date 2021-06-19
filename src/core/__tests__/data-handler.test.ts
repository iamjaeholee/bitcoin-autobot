import {Method} from 'axios';
import dataHandler from '../data-handler';
import apiHandler from '../api-handler';
import {formatISO} from 'date-fns';


// const ust = '2021-06-18 00:00:00';
// const kst = '2021-06-18 09:00:00';

// const daysCandleConfig = {
//   method: 'get' as Method,
//   url: 'https://api.upbit.com/v1/candles/days',
//   params: {
//     market: 'KRW-ETH',
//     count: 1,
//     to: ust
//   }
// }

// const kstDaysCandleConfig = {
//   method: 'get' as Method,
//   url: 'https://api.upbit.com/v1/candles/days',
//   params: {
//     market: 'KRW-ETH',
//     count: 1,
//     to: kst
//   }
// }

describe('DataHandler class', () => {
  // it('get information', async () => {
  //   const ustRe = await apiHandler.getInformation(daysCandleConfig);
  //   const kstRe = await apiHandler.getInformation(kstDaysCandleConfig);
  //   console.log(ustRe[0]);
  //   console.log(kstRe[0]);

  //   const UTCDate = new Date(Date.UTC(2021, 5, 18));
  //   console.log(UTCDate);

  //   const test = {
  //     method: 'get' as Method,
  //     url: 'https://api.upbit.com/v1/candles/days',
  //     params: {
  //       market: 'KRW-ETH',
  //       count: 1,
  //       to: UTCDate.toISOString()
  //     }
  //   }
    
  //   const testRe = await apiHandler.getInformation(test);

  //   console.log(testRe[0]);
  // })

  it('should put 10 items from start date', async () => {
    try{
      await dataHandler.putTenData({year: 2021, month: 5, date: 7});
      console.log('data input success');
    } catch {
      console.error('something wrong');
    }
  })

  it('should put item with calc EMS until ')
})