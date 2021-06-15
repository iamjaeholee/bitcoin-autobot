import {Method} from 'axios';

export const getDayCandleConfig = (amount: number = 0) => {
  const currentDate = new Date(Date.now() - amount * 24 * 60 * 60 * 1000);

  const toDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toISOString();

  const daysCandleConfig = {
    method: 'get' as Method,
    url: 'https://api.upbit.com/v1/candles/days',
    params: {
      market: 'KRW-BTC',
      count: 1,
      to: toDate
    }
  }

  return daysCandleConfig;
}