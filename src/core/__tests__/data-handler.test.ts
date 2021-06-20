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
  let firstTenData: boolean;

  beforeAll(async () => {
    firstTenData = await dataHandler.putTenData({year: 2017, month: 8, date: 26});
  })

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
    expect(firstTenData).toBe(true);
  })

  it('should put first ems from 10 items before start date', async () => {

    const result = await dataHandler.putDataWithAverEms({year: 2017, month: 9, date: 6});
    expect(result).toBe(true);
  })

  it('should put data from startDate to endDate with ems value using putDataWithEms', async () => {
    const result = await dataHandler.putDataWithEms({year: 2017, month: 9, date:15}, {year:2017, month:9, date:18});

    expect(result).toBe(true);
  })
})