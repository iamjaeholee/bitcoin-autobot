import {Method} from 'axios';
import {ETHEREUM} from '../config';

export const getDayCandleConfig = (toDate: Date) => {
  const ethDaysCandleConfig = {
    method: 'get' as Method,
    url: 'https://api.upbit.com/v1/candles/days',
    params: {
      market: ETHEREUM,
      count: 1,
      to: toDate
    }
  }
  return {ethDaysCandleConfig};
}

export const getQuarterCandleConfig = (toDate: Date) => {
  const ethQuarterCandleConfig = {
    method: 'get' as Method,
    url: 'https://api.upbit.com/v1/candles/minutes/240',
    params: {
      market: ETHEREUM,
      count: 1,
      to: toDate
    }
  }
  return {ethQuarterCandleConfig};
}