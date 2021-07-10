import schedule from 'node-schedule';
import {Method} from 'axios';
import dataHandler from './core/data-handler';
import {format, add, sub} from 'date-fns';
import apiHandler from './core/api-handler';
import emsComputer from './core/ems-computer';
import { ETHTABLE } from "./config";
import DbManager from "./database";
import { BADQUERY } from 'dns';
import logger from './utils/logger';


// put data
// (async () => {
//   const result = await dataHandler.putDataWithEms({year: 2021, month: 5, date:19}, {year:2021, month:5, date:20});
//   // const result = await dataHandler.putDataQuarterly({year: 2021, month: 6, date:3, hour: 4}, {year:2021, month:6, date:3, hour: 16});
//   // const result = await dataHandler.putDataToExcel();

//   const today = new Date(Date.UTC(2021, 5, 20));
//   const nextDay = add(today, {days:1});


//   result ? console.log('success') : console.log('fail');
// })();

// scheduler

// TODO ScheduleJob to UTC time
// UTC 9
const sellAll = () => {}; // mock function
const setSemaphore = () => {}; // mock function
const buy = () => {}; // mock function

logger.info('service has been started');
schedule.scheduleJob('0 0 0 * * *', async () => {
  const today = new Date(Date.now());
  const nextDay = add(today, {days:1});

  await dataHandler.putDataWithEms(
    {year:today.getUTCFullYear(), month:today.getUTCMonth(), date: today.getUTCDate()},
    {year:nextDay.getUTCFullYear(), month:nextDay.getUTCMonth(), date: nextDay.getUTCDate()},
  )

  // 판단 플로우
  const getParams = {
    TableName: ETHTABLE,
    Key: {
      date: { S: format(today, "yyyy-MM-dd") },
    },
  };
  
  const prevGetParams = {
    TableName: ETHTABLE,
    Key: {
      date: { S: format(sub(today, {days:1}), "yyyy-MM-dd") },
    },
  };

  // get item
  try{
    // yesterDayData
    const yesterdayData = await DbManager.getItem(getParams);
    const parsedData = JSON.parse(yesterdayData?.Item?.data?.S as string);
    const yesterdayEms = Number(yesterdayData?.Item?.ems?.N);

    // beforeYesterDayData
    const beforeYesterDayData = await DbManager.getItem(prevGetParams);
    const beforeYesterDayParsedData = JSON.parse(beforeYesterDayData?.Item?.data?.S as string);
    const beforeYesterDayEms = Number(beforeYesterDayData?.Item?.ems?.N);

    // trade_price <= ems sell all ETH
    logger.info(`====== 판단 플로우 ======`);
    if(parsedData.trade_price < yesterdayEms) {
      logger.info(`trade_price: ${parsedData.trade_price}`);
      logger.info(`ema: ${yesterdayEms}`);
      logger.info(`====== trade_price < ema ======`);
      logger.info(`2일전 trade_price: ${beforeYesterDayParsedData.trade_price}`);
      const diff = parsedData.trade_price - beforeYesterDayParsedData.trade_price;
      logger.info(`1일전 trade_price - 2일전 trade_price: ${diff}`);
      const diffRate = diff / beforeYesterDayParsedData.trade_price;
      logger.info(`변화율: ${diffRate}`);

      if(diffRate <= -0.1) {
        logger.info(`변화율 <= -10%`);
        logger.info(`&&&&&&&&&&&&&&& 오늘은 사는 날인 갑다 ~! *매수플로우 진행*`);
      } else {
        logger.info(`변화율 > -10%`);
        logger.info(`&&&&&&&&&&&&&&& 오늘은 김대기하는 날인 갑다 ~! *김대기*`);
      }
    }
    else {
      logger.info(`trade_price: ${parsedData.trade_price}`);
      logger.info(`ema: ${yesterdayEms}`);
      logger.info(`====== trade_price >= ema ======`);
      logger.info(`====== Min Max 구현 예정`);
    }
  } catch(e) {
    console.error(e);
  }
});

// every 4 hours schedule
schedule.scheduleJob('0 0 */4 * * *', async () => {
  const today = new Date(Date.now());
  const nextDay = add(today, {hours:4});

  dataHandler.putDataQuarterly(
    {year:today.getUTCFullYear(), month:today.getUTCMonth(), date: today.getUTCDate(), hour: today.getUTCHours()},
    {year:nextDay.getUTCFullYear(), month:nextDay.getUTCMonth(), date: nextDay.getUTCDate(), hour: nextDay.getUTCHours()},
  )
});