import schedule from 'node-schedule';
import {Method} from 'axios';
import dataHandler from '../core/data-handler';
import {format, add, sub} from 'date-fns';
import apiHandler from '../core/api-handler';
import emsComputer from '../core/ems-computer';
import { ETHTABLE, ETHEREUM, ALPHATABLE } from "../config";
import DbManager from "../database";
import { BADQUERY } from 'dns';
import semaphoreHandler from '../core/semaphore-handler';
import {etherLogger, alphaLogger} from '../utils/logger';

// put data
(async () => {
  const result = await dataHandler.putDataWithEms({year: 2021, month: 7, date:12}, {year:2021, month:7, date:13}, 'ethereum');
  // const result = await dataHandler.putTenData({year: 2020, month: 10, date:18}, 'alpha');
  // const result = await dataHandler.putDataWithAverEms({year: 2020, month: 10, date:28}, 'alpha');
  // const result = await dataHandler.putDataQuarterly({year: 2021, month: 6, date:23, hour: 12}, {year:2021, month:6, date:24, hour: 0}, 'alpha');
  // const result = await dataHandler.putDataToExcel();

  // const today = new Date(Date.UTC(2021, 5, 20));
  // const nextDay = add(today, {days:1});


  result ? console.log('success') : console.log('fail');
})();