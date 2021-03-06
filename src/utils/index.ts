import {Method} from 'axios';
import {ETHEREUM, ALPHA} from '../config';
import { DYN_MARKET } from './mapper';

export const getDayCandleConfig = (toDate: Date) => {
  const daysCandleConfig = {
    method: 'get' as Method,
    url: 'https://api.upbit.com/v1/candles/days',
    params: {
      market: DYN_MARKET,
      count: 1,
      to: toDate
    }
  }
  return {daysCandleConfig};
}

export const getQuarterCandleConfig = (toDate: Date) => {
  const ethQuarterCandleConfig = {
    method: 'get' as Method,
    url: 'https://api.upbit.com/v1/candles/minutes/240',
    params: {
      market: DYN_MARKET,
      count: 1,
      to: toDate
    }
  }
  return {ethQuarterCandleConfig};
}