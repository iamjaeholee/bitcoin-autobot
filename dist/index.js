"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_handler_1 = __importDefault(require("./core/data-handler"));
// put data
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, data_handler_1.default.putDataWithEms({ year: 2020, month: 10, date: 28 }, { year: 2021, month: 6, date: 23 }, 'alpha')];
            case 1:
                result = _a.sent();
                // const result = await dataHandler.putTenData({year: 2020, month: 10, date:18}, 'alpha');
                // const result = await dataHandler.putDataWithAverEms({year: 2020, month: 10, date:28}, 'alpha');
                // const result = await dataHandler.putDataQuarterly({year: 2021, month: 6, date:3, hour: 4}, {year:2021, month:6, date:3, hour: 16});
                // const result = await dataHandler.putDataToExcel();
                // const today = new Date(Date.UTC(2021, 5, 20));
                // const nextDay = add(today, {days:1});
                result ? console.log('success') : console.log('fail');
                return [2 /*return*/];
        }
    });
}); })();
// scheduler
// TODO ScheduleJob to UTC time
// UTC 9
var sellAll = function () { }; // mock function
var setSemaphore = function () { }; // mock function
var buy = function () { }; // mock function
// logger.info('service has been started');
// schedule.scheduleJob('0 0 0 * * *', async () => {
//   const today = new Date(Date.now());
//   const nextDay = add(today, {days:1});
//   await dataHandler.putDataWithEms(
//     {year:today.getUTCFullYear(), month:today.getUTCMonth(), date: today.getUTCDate()},
//     {year:nextDay.getUTCFullYear(), month:nextDay.getUTCMonth(), date: nextDay.getUTCDate()},
//   )
//   // 판단 플로우
//   const getParams = {
//     TableName: ETHTABLE,
//     Key: {
//       date: { S: format(today, "yyyy-MM-dd") },
//     },
//   };
//   const prevGetParams = {
//     TableName: ETHTABLE,
//     Key: {
//       date: { S: format(sub(today, {days:1}), "yyyy-MM-dd") },
//     },
//   };
//   // get item
//   try{
//     // yesterDayData
//     const yesterdayData = await DbManager.getItem(getParams);
//     const parsedData = JSON.parse(yesterdayData?.Item?.data?.S as string);
//     const yesterdayEms = Number(yesterdayData?.Item?.ems?.N);
//     // beforeYesterDayData
//     const beforeYesterDayData = await DbManager.getItem(prevGetParams);
//     const beforeYesterDayParsedData = JSON.parse(beforeYesterDayData?.Item?.data?.S as string);
//     const beforeYesterDayEms = Number(beforeYesterDayData?.Item?.ems?.N);
//     // trade_price <= ems sell all ETH
//     logger.info(`====== 판단 플로우 ======`);
//     if(parsedData.trade_price < yesterdayEms) {
//       logger.info(`trade_price: ${parsedData.trade_price}`);
//       logger.info(`ema: ${yesterdayEms}`);
//       logger.info(`====== trade_price < ema ======`);
//       logger.info(`2일전 trade_price: ${beforeYesterDayParsedData.trade_price}`);
//       const diff = parsedData.trade_price - beforeYesterDayParsedData.trade_price;
//       logger.info(`1일전 trade_price - 2일전 trade_price: ${diff}`);
//       const diffRate = diff / beforeYesterDayParsedData.trade_price;
//       logger.info(`변화율: ${diffRate}`);
//       if(diffRate <= -0.1) {
//         logger.info(`변화율 <= -10%`);
//         logger.info(`&&&&&&&&&&&&&&& 오늘은 사는 날인 갑다 ~! *매수플로우 진행*`);
//       } else {
//         logger.info(`변화율 > -10%`);
//         logger.info(`&&&&&&&&&&&&&&& 오늘은 김대기하는 날인 갑다 ~! *김대기*`);
//       }
//     }
//     else {
//       logger.info(`trade_price: ${parsedData.trade_price}`);
//       logger.info(`ema: ${yesterdayEms}`);
//       logger.info(`====== trade_price >= ema ======`);
//       logger.info(`====== Min Max 구현 예정`);
//     }
//   } catch(e) {
//     console.error(e);
//   }
// });
// // every 4 hours schedule
// schedule.scheduleJob('0 0 */4 * * *', async () => {
//   const today = new Date(Date.now());
//   const nextDay = add(today, {hours:4});
//   dataHandler.putDataQuarterly(
//     {year:today.getUTCFullYear(), month:today.getUTCMonth(), date: today.getUTCDate(), hour: today.getUTCHours()},
//     {year:nextDay.getUTCFullYear(), month:nextDay.getUTCMonth(), date: nextDay.getUTCDate(), hour: nextDay.getUTCHours()},
//   )
// });
