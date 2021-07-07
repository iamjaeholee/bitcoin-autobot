import { Method } from "axios";
import Excel from "exceljs";
import {
  GetItemCommandOutput,
  PutItemCommandOutput,
  TagResourceCommand,
} from "@aws-sdk/client-dynamodb";
import DbManager from "../database";
import apiHandler from "./api-handler";
import { format, add, sub } from "date-fns";
import { getDayCandleConfig, getQuarterCandleConfig } from "../utils";
import { ETHTABLE, ETHTABLE_QUARTER } from "../config";
import EmsComputer from "./ems-computer";
import {logDayCandle, logQuarterCandle} from '../utils/log-cloudwatch';

interface inputDate {
  year: number;
  month: number;
  date: number;
}

interface quarterInputDate {
  year: number;
  month: number;
  date: number;
  hour: number;
}

class DataHandler {
  constructor() {}

  public async putTenData(startDate: inputDate) {
    let dateInstance = new Date(
      Date.UTC(startDate.year, startDate.month, startDate.date)
    );

    try {
      for await (let result of this.putTenDataGenerator(dateInstance)) {
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private async *putTenDataGenerator(
    date: Date
  ): AsyncGenerator<PutItemCommandOutput | undefined> {
    let dateInstance = date;

    let i = 0;
    while (i < 10) {
      // make config
      const daysCandleConfig =
        getDayCandleConfig(dateInstance).ethDaysCandleConfig;

      // fetch API
      const result = await apiHandler.getInformation(daysCandleConfig);

      // set params for DB
      const params = {
        TableName: "Ethereum",
        Item: {
          date: { S: format(dateInstance, "yyyy-MM-dd") },
          data: { S: JSON.stringify(result[0]) },
        },
      };

      // put item
      const output = yield await DbManager.putItem(params);

      // add day
      dateInstance = add(dateInstance, { days: 1 });
      i++;
    }
  }

  public async putDataWithEms(startDate: inputDate, endDate: inputDate) {
    let startDateInstance = new Date(
      Date.UTC(startDate.year, startDate.month, startDate.date)
    );
    let endDateInstance = new Date(
      Date.UTC(endDate.year, endDate.month, endDate.date)
    );

    try {
      for await (let result of this.putDataWithEmsGenerator(
        startDateInstance,
        endDateInstance
      )) {
      }

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  private async *putDataWithEmsGenerator(
    startDate: Date,
    endDate: Date
  ): AsyncGenerator<PutItemCommandOutput | undefined> {
    let startDateInstance = startDate;
    let endDateInstance = endDate;

    while (startDateInstance < endDateInstance) {
      // make config
      const startDaysCandleConfig =
        getDayCandleConfig(startDateInstance).ethDaysCandleConfig;

      // fetch API
      const result = (await new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(await apiHandler.getInformation(startDaysCandleConfig)),
          1100
        )
      )) as any[];

      // fetch yester days info from DB
      let yesterDayInstance = new Date(sub(startDateInstance, { days: 1 }));
      const getParams = {
        TableName: ETHTABLE,
        Key: {
          date: { S: format(yesterDayInstance, "yyyy-MM-dd") },
        },
      };

      // get item
      const yesterdayData = await DbManager.getItem(getParams);
      const yesterdayEms = Number(yesterdayData?.Item?.ems?.N);

      const params = [result[0].trade_price, yesterdayEms];
      const ems = EmsComputer.computeEms(...params);

      // logging
      logDayCandle(result[0], ems);

      // set params for putting DB
      const putParams = {
        TableName: "Ethereum",
        Item: {
          date: { S: format(startDateInstance, "yyyy-MM-dd") },
          data: { S: JSON.stringify(result[0]) },
          ems: { N: ems.toString() },
        },
      };

      // put item
      const output = yield await DbManager.putItem(putParams);

      // add day
      startDateInstance = add(startDateInstance, { days: 1 });
    }
  }

  public async putDataWithAverEms(startDate: inputDate) {
    let startDateInstance = new Date(
      Date.UTC(startDate.year, startDate.month, startDate.date)
    );

    // summation
    let sum = 0;
    for await (let result of this.putDataWithAverEmsGenerator(
      startDateInstance
    )) {
      const outputData = result?.Item?.data?.S as string;

      sum += Number(JSON.parse(outputData).trade_price);
    }

    const averEms = sum / 10;

    // set params for putting DB
    // make config
    const startDaysCandleConfig =
      getDayCandleConfig(startDateInstance).ethDaysCandleConfig;

    // fetch API
    const result = await apiHandler.getInformation(startDaysCandleConfig);

    const putParams = {
      TableName: ETHTABLE,
      Item: {
        date: { S: format(startDateInstance, "yyyy-MM-dd") },
        data: { S: JSON.stringify(result[0]) },
        ems: { N: averEms.toString() },
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

  private async *putDataWithAverEmsGenerator(
    date: Date
  ): AsyncGenerator<GetItemCommandOutput | undefined> {
    let i = 0;
    let startDateInstance = date;

    // loop ten times
    while (i < 10) {
      startDateInstance = sub(startDateInstance, { days: 1 });

      // get item
      const getParams = {
        TableName: ETHTABLE,
        Key: {
          date: { S: format(startDateInstance, "yyyy-MM-dd") },
        },
      };
      const result = yield await DbManager.getItem(getParams);

      // increase value
      i++;
    }
  }

  public async putDataToExcel() {
    // construct a streaming XLSX workbook writer with styles and shared strings
    // const options = {
    //   filename: './streamed-workbook.xlsx',
    //   useStyles: true,
    //   useSharedStrings: true
    // };
    // const workbook = new Excel.stream.xlsx.WorkbookWriter(options);

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("test");
    worksheet.columns = [
      { header: "market", key: "market", width: 10 },
      { header: "candle_date_time_utc", key: "candle_date_time_utc", width: 10 },
      { header: "candle_date_time_kst", key: "candle_date_time_kst", width: 10 },
      { header: "opening_price", key: "opening_price", width: 10 },
      { header: "high_price", key: "high_price", width: 10 },
      { header: "low_price", key: "low_price", width: 10 },
      { header: "trade_price", key: "trade_price", width: 10 },
      { header: "timestamp", key: "timestamp", width: 10 },
      { header: "candle_acc_trade_price", key: "candle_acc_trade_price", width: 10 },
      { header: "candle_acc_trade_volume", key: "candle_acc_trade_volume", width: 10 },
      { header: "unit", key: "unit", width: 10 },
    ];

    try {
      for await (let result of this.putDataToExcelGenerator()) {
        result.forEach((row) => worksheet.addRow(row).commit());
      }

      // write to a file
      await workbook.xlsx.writeFile("test.xlsx");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private async *putDataToExcelGenerator() {
    let startDateInstance = new Date(Date.UTC(2021, 5, 24));
    // let startDateInstance = new Date(Date.UTC(2017, 11, 27));
    const firstDateInstance = new Date(Date.UTC(2017, 8, 26));

    while (startDateInstance > firstDateInstance) {
      const minuitesCandleConfig = {
        method: "get" as Method,
        url: "https://api.upbit.com/v1/candles/minutes/240",
        params: {
          market: "KRW-ETH",
          count: 200,
          to: startDateInstance.toISOString(),
        },
      };

      // fetch API
      yield (await new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(await apiHandler.getInformation(minuitesCandleConfig)),
          1000
        )
      )) as any[];

      startDateInstance = sub(startDateInstance, { minutes: 240 * 200 });
    }
  }


  /**
   * 
   * @param startDate include
   * @param endDate exclude
   * @returns 
   */

  public async putDataQuarterly(startDate: quarterInputDate, endDate: quarterInputDate) {
    let startDateInstance = new Date(
      Date.UTC(startDate.year, startDate.month, startDate.date, startDate.hour)
    );
    let endDateInstance = new Date(
      Date.UTC(endDate.year, endDate.month, endDate.date, endDate.hour)
    );


    try {
      for await (let result of this.putDataQuarterlyGenerator(
        startDateInstance,
        endDateInstance
      )) {
      }

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  private async *putDataQuarterlyGenerator(
    startDate: Date,
    endDate: Date
  ): AsyncGenerator<PutItemCommandOutput | undefined> {
    let startDateInstance = startDate;
    let endDateInstance = endDate;

    while (startDateInstance < endDateInstance) {
      // make config
      const startDaysCandleConfig =
        getQuarterCandleConfig(startDateInstance).ethQuarterCandleConfig;

      // fetch API
      const result = (await new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(await apiHandler.getInformation(startDaysCandleConfig)),
          1100
        )
      )) as any[];

      // logging
      logQuarterCandle(result[0]);

      // set params for putting DB
      const putParams = {
        TableName: ETHTABLE_QUARTER,
        Item: {
          date: { S: format(startDateInstance, "yyyy-MM-dd") },
          data: { S: JSON.stringify(result[0]) },
          hour: { S: startDateInstance.getHours().toString()},
        },
      };

      // put item
      const output = yield await DbManager.putItem(putParams);

      // add quarter
      startDateInstance = add(startDateInstance, { hours: 4 });
    }
  }
}

export default new DataHandler();