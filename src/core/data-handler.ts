import { PutItemCommandOutput } from "@aws-sdk/client-dynamodb";
import DbManager from '../database';
import apiHandler from './api-handler';
import {format, add, sub} from 'date-fns';
import { getDayCandleConfig } from "../utils";
import {ETHTABLE} from '../config';
import EmsComputer from './ems-computer';

interface inputDate {
  year: number,
  month: number,
  date: number
}

class DataHandler {
  constructor() {}

  public async putTenData(startDate: inputDate) {
    let dateInstance = new Date(Date.UTC(startDate.year, startDate.month, startDate.date));

    for await (let result of this.putTenDataGenerator(dateInstance)) {
      console.log(result); // log the Output Data
    };
  }

  private async *putTenDataGenerator(date: Date): AsyncGenerator<PutItemCommandOutput | undefined>{
    let dateInstance = date;

    let i=0;
    while(i<10){
      // make config
      const daysCandleConfig = getDayCandleConfig(dateInstance).ethDaysCandleConfig;

      // fetch API
      const result = await apiHandler.getInformation(daysCandleConfig);

      // set params for DB
      const params = {
        TableName: "Ethereum",
        Item: {
          date: {S: format(dateInstance, 'yyyy-MM-dd')},
          data: {S: JSON.stringify(result[0]) },
        },
      }

      // put item
      const output = yield await DbManager.putItem(params);

      // add day
      dateInstance = add(dateInstance, {days: 1});
      i++;
    }
  }

  public async putDataWithEms(startDate: inputDate, endDate: inputDate) {
    let startDateInstance = new Date(Date.UTC(startDate.year, startDate.month, startDate.date));
    let endDateInstance = new Date(Date.UTC(endDate.year, endDate.month, endDate.date));

    for await (let result of this.putDataWithEmsGenerator(startDateInstance, endDateInstance)) {
      console.log(result); // log the Output Data
    };
  }

  private async *putDataWithEmsGenerator(startDate: Date, endDate: Date): AsyncGenerator<PutItemCommandOutput | undefined>{
    let startDateInstance = startDate;
    let endDateInstance = endDate;

    while(startDateInstance < endDateInstance){
      // make config
      const startDaysCandleConfig = getDayCandleConfig(startDateInstance).ethDaysCandleConfig;

      // fetch API
      const result = await apiHandler.getInformation(startDaysCandleConfig);
      
      // fetch yester days info from DB
      let yesterDayInstance = new Date(sub(startDateInstance, {days: 1}));
      const getParams = {
        TableName: ETHTABLE,
        Key: {
          date: {S: format(yesterDayInstance, 'yyyy-MM-dd')}
        },
      }

      // get item
      const yesterdayData = await DbManager.getItem(getParams);
      const yesterdayEms = yesterdayData?.Item?.ems;

      const params = [result[0].trade_price, yesterdayEms];

      // set params for putting DB
      const putParams = {
        TableName: "Ethereum",
        Item: {
          date: {S: format(startDateInstance, 'yyyy-MM-dd')},
          data: {S: JSON.stringify(result[0]) },
          ems: {N: EmsComputer.computeEms(...params).toString()},
        },
      }

      // put item
      const output = yield await DbManager.putItem(putParams);

      // add day
      startDateInstance = add(startDateInstance, {days: 1});
    }
  }

  public async putDataWithAverEms(startDate: inputDate){
    let startDateInstance = new Date(Date.UTC(startDate.year, startDate.month, startDate.date));
  }

  private async* putDataWithAverEmsGenerator(){

  }
}

export default new DataHandler();