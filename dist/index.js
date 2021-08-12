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
var node_schedule_1 = __importDefault(require("node-schedule"));
var data_handler_1 = __importDefault(require("./core/data-handler"));
var date_fns_1 = require("date-fns");
var config_1 = require("./config");
var database_1 = __importDefault(require("./database"));
var semaphore_handler_1 = __importDefault(require("./core/semaphore-handler"));
var logger_1 = require("./utils/logger");
// TODO ScheduleJob to UTC time
// UTC 9
var sellAll = function () { }; // mock function
var buy = function () { }; // mock function
console.log('service has been started');
node_schedule_1.default.scheduleJob('0 0 0 * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
    var market, today, nextDay, logger, getParams, prevGetParams, yesterdayData, parsedData, yesterdayEms, beforeYesterDayData, beforeYesterDayParsedData, beforeYesterDayEms, diff, diffRate, e_1;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                market = process.env.MARKET;
                today = new Date(Date.now());
                nextDay = date_fns_1.add(today, { days: 1 });
                logger = market === 'ethereum' ? logger_1.etherLogger : 'alpha' ? logger_1.alphaLogger : logger_1.etherLogger;
                return [4 /*yield*/, data_handler_1.default.putDataWithEms({ year: today.getUTCFullYear(), month: today.getUTCMonth(), date: today.getUTCDate() }, { year: nextDay.getUTCFullYear(), month: nextDay.getUTCMonth(), date: nextDay.getUTCDate() }, market)
                    // 판단 플로우
                ];
            case 1:
                _j.sent();
                getParams = {
                    TableName: market === 'ethereum' ? config_1.ETHTABLE : 'alpha' ? config_1.ALPHATABLE : config_1.ETHTABLE,
                    Key: {
                        date: { S: date_fns_1.format(today, "yyyy-MM-dd") },
                    },
                };
                prevGetParams = {
                    TableName: market === 'ethereum' ? config_1.ETHTABLE : 'alpha' ? config_1.ALPHATABLE : config_1.ETHTABLE,
                    Key: {
                        date: { S: date_fns_1.format(date_fns_1.sub(today, { days: 1 }), "yyyy-MM-dd") },
                    },
                };
                _j.label = 2;
            case 2:
                _j.trys.push([2, 5, , 6]);
                return [4 /*yield*/, database_1.default.getItem(getParams)];
            case 3:
                yesterdayData = _j.sent();
                parsedData = JSON.parse((_b = (_a = yesterdayData === null || yesterdayData === void 0 ? void 0 : yesterdayData.Item) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.S);
                yesterdayEms = Number((_d = (_c = yesterdayData === null || yesterdayData === void 0 ? void 0 : yesterdayData.Item) === null || _c === void 0 ? void 0 : _c.ems) === null || _d === void 0 ? void 0 : _d.N);
                return [4 /*yield*/, database_1.default.getItem(prevGetParams)];
            case 4:
                beforeYesterDayData = _j.sent();
                beforeYesterDayParsedData = JSON.parse((_f = (_e = beforeYesterDayData === null || beforeYesterDayData === void 0 ? void 0 : beforeYesterDayData.Item) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.S);
                beforeYesterDayEms = Number((_h = (_g = beforeYesterDayData === null || beforeYesterDayData === void 0 ? void 0 : beforeYesterDayData.Item) === null || _g === void 0 ? void 0 : _g.ems) === null || _h === void 0 ? void 0 : _h.N);
                // trade_price <= ems sell all ETH
                logger.info("====== \uD310\uB2E8 \uD50C\uB85C\uC6B0 ======");
                if (parsedData.trade_price < yesterdayEms) {
                    logger.info("trade_price: " + parsedData.trade_price);
                    logger.info("ema: " + yesterdayEms);
                    logger.info("====== trade_price < ema ======");
                    logger.info("2\uC77C\uC804 trade_price: " + beforeYesterDayParsedData.trade_price);
                    diff = parsedData.trade_price - beforeYesterDayParsedData.trade_price;
                    logger.info("1\uC77C\uC804 trade_price - 2\uC77C\uC804 trade_price: " + diff);
                    diffRate = diff / beforeYesterDayParsedData.trade_price;
                    logger.info("\uBCC0\uD654\uC728: " + diffRate);
                    if (diffRate <= -0.1) {
                        logger.info("\uBCC0\uD654\uC728 <= -10%");
                        logger.info("&&&&&&&&&&&&&&& \uC624\uB298\uC740 \uC0AC\uB294 \uB0A0\uC778 \uAC11\uB2E4 ~! *\uB9E4\uC218\uD50C\uB85C\uC6B0 \uC9C4\uD589*");
                    }
                    else {
                        // waiting flow
                        logger.info("\uBCC0\uD654\uC728 > -10%");
                        logger.info("&&&&&&&&&&&&&&& \uC624\uB298\uC740 \uAE40\uB300\uAE30\uD558\uB294 \uB0A0\uC778 \uAC11\uB2E4 ~! *\uAE40\uB300\uAE30*");
                        semaphore_handler_1.default.setSemaphore(today.toISOString().substr(0, 10), market);
                    }
                }
                else {
                    logger.info("trade_price: " + parsedData.trade_price);
                    logger.info("ema: " + yesterdayEms);
                    logger.info("====== trade_price >= ema ======");
                    logger.info("====== Min Max \uAD6C\uD604 \uC608\uC815");
                }
                return [3 /*break*/, 6];
            case 5:
                e_1 = _j.sent();
                console.error(e_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// every 4 hours schedule
node_schedule_1.default.scheduleJob('0 0 */4 * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
    var today, nextDay;
    return __generator(this, function (_a) {
        today = new Date(Date.now());
        nextDay = date_fns_1.add(today, { hours: 4 });
        data_handler_1.default.putDataQuarterly({ year: today.getUTCFullYear(), month: today.getUTCMonth(), date: today.getUTCDate(), hour: today.getUTCHours() }, { year: nextDay.getUTCFullYear(), month: nextDay.getUTCMonth(), date: nextDay.getUTCDate(), hour: nextDay.getUTCHours() }, process.env.MARKET);
        return [2 /*return*/];
    });
}); });
