import schedule from 'node-schedule';
import {Method} from 'axios';
import dataHandler from './core/data-handler';
import {format, add, sub} from 'date-fns';
import apiHandler from './core/api-handler';
import emsComputer from './core/ems-computer';
import { ETHTABLE } from "./config";
import DbManager from "./database";
import { BADQUERY } from 'dns';


// // put data
// (async () => {
//   // const result = await dataHandler.putDataWithEms({year: 2021, month: 5, date:19}, {year:2021, month:7, date:2});
//   const result = await dataHandler.putDataQuarterly({year: 2021, month: 6, date:3, hour: 4}, {year:2021, month:6, date:3, hour: 16});
//   // const result = await dataHandler.putDataToExcel();

//   result ? console.log('success') : console.log('fail');
// })();

// scheduler

// TODO ScheduleJob to UTC time
// UTC 9
const sellAll = () => {}; // mock function
const setSemaphore = () => {}; // mock function
const buy = () => {}; // mock function

console.log('scheduling is started every UTC 00 will add ems data')
schedule.scheduleJob('0 0 0 * * *', async () => {
  const today = new Date(Date.now());
  const nextDay = add(today, {days:1});

  dataHandler.putDataWithEms(
    {year:today.getUTCFullYear(), month:today.getUTCMonth(), date: today.getUTCDate()},
    {year:nextDay.getUTCFullYear(), month:nextDay.getUTCMonth(), date: nextDay.getUTCDate()},
  )

  // // fetch yester days info from DB
  // const getParams = {
  //   TableName: ETHTABLE,
  //   Key: {
  //     date: { S: format(today, "yyyy-MM-dd") },
  //   },
  // };
  
  // const prevGetParams = {
  //   TableName: ETHTABLE,
  //   Key: {
  //     date: { S: format(sub(today, {days:1}), "yyyy-MM-dd") },
  //   },
  // };

  // // get item
  // try{
  //   // yesterDayData
  //   const yesterdayData = await DbManager.getItem(getParams);
  //   const parsedData = JSON.parse(yesterdayData?.Item?.data?.S as string);

  //   // beforeYesterDayData
  //   const beforeYesterDayData = await DbManager.getItem(prevGetParams);
  //   const beforeYesterDayParsedData = JSON.parse(beforeYesterDayData?.Item?.data?.S as string);

  //   // trade_price <= ems sell all ETH
  //   if(parsedData.trade_price <= parsedData.ems) sellAll();
  //   else {
  //     // sell when change_rate both are gone
  //     if(parsedData.change_rate < 0 && beforeYesterDayParsedData.change_rate < 0) sellAll();
  //   }
  // } catch(e) {
  //   console.error(e);
  // }
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

// // UTC 04
// schedule.scheduleJob('0 0 4 * * *', async () => {
//   const today = new Date(Date.now());

//   const daysCandleConfig = {
//     method: 'get' as Method,
//     url: 'https://api.upbit.com/v1/candles/days',
//     params: {
//       market: 'KRW-BTC',
//       count: 1,
//     }
//   }

//   const todayDayCandle = await apiHandler.getInformation(daysCandleConfig);

//   // fetch yester days info from DB
//    const getParams = {
//     TableName: ETHTABLE,
//     Key: {
//       date: { S: format(today, "yyyy-MM-dd") },
//     },
//   };

//   // get item
//   try{
//     const yesterdayData = await DbManager.getItem(getParams);
//     const parsedData = JSON.parse(yesterdayData?.Item?.data?.S as string);

//     const todayEms = emsComputer.computeEms(todayDayCandle[0].trade_price, parsedData.ems);

//     // today trade_price < todayEms  or today change_rate < -2.5 sell all and block semaphore
//     if(todayDayCandle[0].trade_price <= todayEms || todayDayCandle[0].change_rate < -2.5) {
//       sellAll();
//       setSemaphore();
//     } else {
//       buy();
//     }
//   } catch(e) {
//     console.error(e);
//   }
// });
// // UTC 13 
// schedule.scheduleJob('0 0 13 * * *', async () => {
//   const today = new Date(Date.now());

//   const daysCandleConfig = {
//     method: 'get' as Method,
//     url: 'https://api.upbit.com/v1/candles/days',
//     params: {
//       market: 'KRW-BTC',
//       count: 1,
//     }
//   }

//   const todayDayCandle = await apiHandler.getInformation(daysCandleConfig);

//   // fetch yester days info from DB
//    const getParams = {
//     TableName: ETHTABLE,
//     Key: {
//       date: { S: format(today, "yyyy-MM-dd") },
//     },
//   };

//   // get item
//   try{
//     const yesterdayData = await DbManager.getItem(getParams);
//     const parsedData = JSON.parse(yesterdayData?.Item?.data?.S as string);

//     const todayEms = emsComputer.computeEms(todayDayCandle[0].trade_price, parsedData.ems);

//     // today trade_price < todayEms  or today change_rate < -2.5 sell all and block semaphore
//     if(todayDayCandle[0].trade_price <= todayEms || todayDayCandle[0].change_rate < -2.5) {
//       sellAll();
//       setSemaphore();
//     } else {
//       buy();
//     }
//   } catch(e) {
//     console.error(e);
//   }
// });

// // UTC 16
// schedule.scheduleJob('0 0 16 * * *', async () => {
//   const today = new Date(Date.now());

//   const daysCandleConfig = {
//     method: 'get' as Method,
//     url: 'https://api.upbit.com/v1/candles/days',
//     params: {
//       market: 'KRW-BTC',
//       count: 1,
//     }
//   }

//   const todayDayCandle = await apiHandler.getInformation(daysCandleConfig);

//   // fetch yester days info from DB
//    const getParams = {
//     TableName: ETHTABLE,
//     Key: {
//       date: { S: format(today, "yyyy-MM-dd") },
//     },
//   };

//   // get item
//   try{
//     const yesterdayData = await DbManager.getItem(getParams);
//     const parsedData = JSON.parse(yesterdayData?.Item?.data?.S as string);

//     const todayEms = emsComputer.computeEms(todayDayCandle[0].trade_price, parsedData.ems);

//     // today trade_price < todayEms  or today change_rate < -2.5 sell all and block semaphore
//     if(todayDayCandle[0].trade_price <= todayEms || todayDayCandle[0].change_rate < -2.5) {
//       sellAll();
//       setSemaphore();
//     } else {
//       buy();
//     }
//   } catch(e) {
//     console.error(e);
//   }
// });