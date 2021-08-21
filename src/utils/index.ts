import {Method} from 'axios';
import {ETHEREUM, ALPHA} from '../config';

export const getDayCandleConfig = (toDate: Date, market: string = '') => {
  const daysCandleConfig = {
    method: 'get' as Method,
    url: 'https://api.upbit.com/v1/candles/days',
    params: {
      market: market === 'ethereum' ? ETHEREUM : market === 'alpha' ? ALPHA : ETHEREUM,
      count: 1,
      to: toDate
    }
  }
  return {daysCandleConfig};
}

export const getQuarterCandleConfig = (toDate: Date, market: string = '') => {
  const ethQuarterCandleConfig = {
    method: 'get' as Method,
    url: 'https://api.upbit.com/v1/candles/minutes/240',
    params: {
      market: market === 'ethereum' ? ETHEREUM : market === 'alpha' ? ALPHA : ETHEREUM,
      count: 1,
      to: toDate
    }
  }
  return {ethQuarterCandleConfig};
}