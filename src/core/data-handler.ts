import { GetItemCommandOutput, PutItemCommandOutput, TagResourceCommand } from "@aws-sdk/client-dynamodb";
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

    try{
      for await (let result of this.putTenDataGenerator(dateInstance)) {
        console.log(result); // log the Output Data
      };
      return true;
    } catch(error){
      console.error(error);
      return false;
    }
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


    try {
      for await (let result of this.putDataWithEmsGenerator(startDateInstance, endDateInstance)) {
        console.log(result); // log the Output Data
      };

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  private async *putDataWithEmsGenerator(startDate: Date, endDate: Date): AsyncGenerator<PutItemCommandOutput | undefined>{
    let startDateInstance = startDate;
    let endDateInstance = endDate;

    while(startDateInstance < endDateInstance){
      // make config
      const startDaysCandleConfig = getDayCandleConfig(startDateInstance).ethDaysCandleConfig;

      // fetch API
      const result = await new Promise(resolve => setTimeout(async () => resolve(await apiHandler.getInformation(startDaysCandleConfig)), 1100)) as any[];
      
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
      const parsedData = JSON.parse(yesterdayData?.Item?.data?.S as string);
      console.log(parsedData);

      const yesterdayEms = parsedData.trade_price;

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

    // summation
    let sum=0;
    for await (let result of this.putDataWithAverEmsGenerator(startDateInstance)) {
      const outputData = result?.Item?.data?.S as string;
      console.log(outputData);

      sum += Number(JSON.parse(outputData).trade_price);
    };

    const averEms = sum / 10;

    // set params for putting DB
    // make config
    const startDaysCandleConfig = getDayCandleConfig(startDateInstance).ethDaysCandleConfig;

    // fetch API
    const result = await apiHandler.getInformation(startDaysCandleConfig);

    const putParams = {
      TableName: ETHTABLE,
      Item: {
        date: {S: format(startDateInstance, 'yyyy-MM-dd')},
        data: {S: JSON.stringify(result[0]) },
        ems: {N: averEms.toString()},
      },
    };

    // put item
    try {
      await DbManager.putItem(putParams);
      return true;
    } catch {
      return false;
    }
  }

  private async* putDataWithAverEmsGenerator(date: Date): AsyncGenerator<GetItemCommandOutput | undefined> {
    let i=0;
    let startDateInstance = date;

    // loop ten times
    while(i < 10){
      startDateInstance = sub(startDateInstance, {days: 1});

      // get item
      const getParams = {
        TableName: ETHTABLE,
        Key: {
          date: {S: format(startDateInstance, 'yyyy-MM-dd')}
        },
      }
      const result = yield await DbManager.getItem(getParams);

      // increase value
      i++;
    }
  }
}

export default new DataHandler();