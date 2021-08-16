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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exceljs_1 = __importDefault(require("exceljs"));
var database_1 = __importDefault(require("../database"));
var api_handler_1 = __importDefault(require("./api-handler"));
var date_fns_1 = require("date-fns");
var utils_1 = require("../utils");
var config_1 = require("../config");
var ems_computer_1 = __importDefault(require("./ems-computer"));
var log_cloudwatch_1 = require("../utils/log-cloudwatch");
var DataHandler = /** @class */ (function () {
    function DataHandler() {
    }
    DataHandler.prototype.putTenData = function (startDate, market) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var dateInstance, _b, _c, result, e_1_1, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        dateInstance = new Date(Date.UTC(startDate.year, startDate.month, startDate.date));
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 14, , 15]);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 13]);
                        _b = __asyncValues(this.putTenDataGenerator(dateInstance, market));
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                        result = _c.value;
                        _d.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(_b)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, true];
                    case 14:
                        error_1 = _d.sent();
                        console.error(error_1);
                        return [2 /*return*/, false];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    DataHandler.prototype.putTenDataGenerator = function (date, market) {
        return __asyncGenerator(this, arguments, function putTenDataGenerator_1() {
            var dateInstance, i, daysCandleConfig, result, params, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dateInstance = date;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 10)) return [3 /*break*/, 6];
                        daysCandleConfig = utils_1.getDayCandleConfig(dateInstance, market).daysCandleConfig;
                        return [4 /*yield*/, __await(api_handler_1.default.getInformation(daysCandleConfig))];
                    case 2:
                        result = _a.sent();
                        params = {
                            TableName: market === 'ethereum' ? config_1.ETHTABLE : 'alpha' ? config_1.ALPHATABLE : config_1.ETHTABLE,
                            Item: {
                                date: { S: dateInstance.toISOString().substr(0, 10) },
                                data: { S: JSON.stringify(result[0]) },
                            },
                        };
                        return [4 /*yield*/, __await(database_1.default.putItem(params))];
                    case 3: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 4: return [4 /*yield*/, _a.sent()];
                    case 5:
                        output = _a.sent();
                        // add day
                        dateInstance = date_fns_1.add(dateInstance, { days: 1 });
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DataHandler.prototype.putDataWithEms = function (startDate, endDate, market) {
        var e_2, _a;
        if (market === void 0) { market = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var startDateInstance, endDateInstance, _b, _c, result, e_2_1, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        startDateInstance = new Date(Date.UTC(startDate.year, startDate.month, startDate.date));
                        endDateInstance = new Date(Date.UTC(endDate.year, endDate.month, endDate.date));
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 14, , 15]);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 13]);
                        _b = __asyncValues(this.putDataWithEmsGenerator(startDateInstance, endDateInstance, market));
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                        result = _c.value;
                        _d.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(_b)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, true];
                    case 14:
                        error_2 = _d.sent();
                        console.error(error_2);
                        return [2 /*return*/, false];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    DataHandler.prototype.putDataWithEmsGenerator = function (startDate, endDate, market) {
        var _a, _b;
        return __asyncGenerator(this, arguments, function putDataWithEmsGenerator_1() {
            var startDateInstance, endDateInstance, _loop_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        startDateInstance = startDate;
                        endDateInstance = endDate;
                        _loop_1 = function () {
                            var startDaysCandleConfig, result, yesterDayInstance, getParams, yesterdayData, yesterdayEms, params, ems, putParams, output;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        startDaysCandleConfig = utils_1.getDayCandleConfig(startDateInstance, market).daysCandleConfig;
                                        return [4 /*yield*/, __await(new Promise(function (resolve) {
                                                return setTimeout(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            _a = resolve;
                                                            return [4 /*yield*/, api_handler_1.default.getInformation(startDaysCandleConfig)];
                                                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                                    }
                                                }); }); }, 1100);
                                            }))];
                                    case 1:
                                        result = (_d.sent());
                                        yesterDayInstance = new Date(date_fns_1.sub(startDateInstance, { days: 1 }));
                                        getParams = {
                                            TableName: market === 'ethereum' ? config_1.ETHTABLE : 'alpha' ? config_1.ALPHATABLE : config_1.ETHTABLE,
                                            Key: {
                                                date: { S: yesterDayInstance.toISOString().substr(0, 10) },
                                            },
                                        };
                                        return [4 /*yield*/, __await(database_1.default.getItem(getParams))];
                                    case 2:
                                        yesterdayData = _d.sent();
                                        yesterdayEms = Number((_b = (_a = yesterdayData === null || yesterdayData === void 0 ? void 0 : yesterdayData.Item) === null || _a === void 0 ? void 0 : _a.ems) === null || _b === void 0 ? void 0 : _b.N);
                                        params = [result[0].trade_price, yesterdayEms];
                                        ems = ems_computer_1.default.computeEms.apply(ems_computer_1.default, params);
                                        // logging
                                        log_cloudwatch_1.logDayCandle(result[0], ems, market);
                                        putParams = {
                                            TableName: market === 'ethereum' ? config_1.ETHTABLE : 'alpha' ? config_1.ALPHATABLE : config_1.ETHTABLE,
                                            Item: {
                                                date: { S: startDateInstance.toISOString().substr(0, 10) },
                                                data: { S: JSON.stringify(result[0]) },
                                                ems: { N: ems.toString() },
                                            },
                                        };
                                        return [4 /*yield*/, __await(database_1.default.putItem(putParams))];
                                    case 3: return [4 /*yield*/, __await.apply(void 0, [_d.sent()])];
                                    case 4: return [4 /*yield*/, _d.sent()];
                                    case 5:
                                        output = _d.sent();
                                        // add day
                                        startDateInstance = date_fns_1.add(startDateInstance, { days: 1 });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _c.label = 1;
                    case 1:
                        if (!(startDateInstance < endDateInstance)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataHandler.prototype.putDataWithAverEms = function (startDate, market) {
        var e_3, _a;
        var _b, _c;
        if (market === void 0) { market = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var startDateInstance, sum, _d, _e, result_1, outputData, e_3_1, averEms, startDaysCandleConfig, result, putParams, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        startDateInstance = new Date(Date.UTC(startDate.year, startDate.month, startDate.date));
                        sum = 0;
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 12]);
                        _d = __asyncValues(this.putDataWithAverEmsGenerator(startDateInstance, market));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _d.next()];
                    case 3:
                        if (!(_e = _g.sent(), !_e.done)) return [3 /*break*/, 5];
                        result_1 = _e.value;
                        outputData = (_c = (_b = result_1 === null || result_1 === void 0 ? void 0 : result_1.Item) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.S;
                        sum += Number(JSON.parse(outputData).trade_price);
                        _g.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_3_1 = _g.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _g.trys.push([7, , 10, 11]);
                        if (!(_e && !_e.done && (_a = _d.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_d)];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        averEms = sum / 10;
                        startDaysCandleConfig = utils_1.getDayCandleConfig(startDateInstance, market).daysCandleConfig;
                        return [4 /*yield*/, api_handler_1.default.getInformation(startDaysCandleConfig)];
                    case 13:
                        result = _g.sent();
                        putParams = {
                            TableName: market === 'ethreum' ? config_1.ETHTABLE : 'alpha' ? config_1.ALPHATABLE : config_1.ETHTABLE,
                            Item: {
                                date: { S: startDateInstance.toISOString().substr(0, 10) },
                                data: { S: JSON.stringify(result[0]) },
                                ems: { N: averEms.toString() },
                            },
                        };
                        _g.label = 14;
                    case 14:
                        _g.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, database_1.default.putItem(putParams)];
                    case 15:
                        _g.sent();
                        return [2 /*return*/, true];
                    case 16:
                        _f = _g.sent();
                        return [2 /*return*/, false];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    DataHandler.prototype.putDataWithAverEmsGenerator = function (date, market) {
        return __asyncGenerator(this, arguments, function putDataWithAverEmsGenerator_1() {
            var i, startDateInstance, getParams, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        startDateInstance = date;
                        _a.label = 1;
                    case 1:
                        if (!(i < 10)) return [3 /*break*/, 5];
                        startDateInstance = date_fns_1.sub(startDateInstance, { days: 1 });
                        getParams = {
                            TableName: market === 'ethereum' ? config_1.ETHTABLE : 'alpha' ? config_1.ALPHATABLE : config_1.ETHTABLE,
                            Key: {
                                date: { S: startDateInstance.toISOString().substr(0, 10) },
                            },
                        };
                        return [4 /*yield*/, __await(database_1.default.getItem(getParams))];
                    case 2: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 3: return [4 /*yield*/, _a.sent()];
                    case 4:
                        result = _a.sent();
                        // increase value
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DataHandler.prototype.putDataToExcel = function () {
        var e_4, _a;
        return __awaiter(this, void 0, void 0, function () {
            var workbook, worksheet, _b, _c, result, e_4_1, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        workbook = new exceljs_1.default.Workbook();
                        worksheet = workbook.addWorksheet("test");
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
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 15, , 16]);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 13]);
                        _b = __asyncValues(this.putDataToExcelGenerator());
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                        result = _c.value;
                        result.forEach(function (row) { return worksheet.addRow(row).commit(); });
                        _d.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_4_1 = _d.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(_b)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: 
                    // write to a file
                    return [4 /*yield*/, workbook.xlsx.writeFile("test.xlsx")];
                    case 14:
                        // write to a file
                        _d.sent();
                        return [2 /*return*/, true];
                    case 15:
                        error_3 = _d.sent();
                        console.log(error_3);
                        return [2 /*return*/, false];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    DataHandler.prototype.putDataToExcelGenerator = function () {
        return __asyncGenerator(this, arguments, function putDataToExcelGenerator_1() {
            var startDateInstance, firstDateInstance, _loop_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startDateInstance = new Date(Date.UTC(2021, 5, 24));
                        firstDateInstance = new Date(Date.UTC(2017, 8, 26));
                        _loop_2 = function () {
                            var minuitesCandleConfig;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        minuitesCandleConfig = {
                                            method: "get",
                                            url: "https://api.upbit.com/v1/candles/minutes/240",
                                            params: {
                                                market: "KRW-ETH",
                                                count: 200,
                                                to: startDateInstance.toISOString(),
                                            },
                                        };
                                        return [4 /*yield*/, __await(new Promise(function (resolve) {
                                                return setTimeout(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            _a = resolve;
                                                            return [4 /*yield*/, api_handler_1.default.getInformation(minuitesCandleConfig)];
                                                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                                    }
                                                }); }); }, 1000);
                                            }))];
                                    case 1: return [4 /*yield*/, __await.apply(void 0, [(_b.sent())])];
                                    case 2: 
                                    // fetch API
                                    return [4 /*yield*/, _b.sent()];
                                    case 3:
                                        // fetch API
                                        _b.sent();
                                        startDateInstance = date_fns_1.sub(startDateInstance, { minutes: 240 * 200 });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a.label = 1;
                    case 1:
                        if (!(startDateInstance > firstDateInstance)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_2()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param startDate include
     * @param endDate exclude
     * @returns
     */
    DataHandler.prototype.putDataQuarterly = function (startDate, endDate, market) {
        var e_5, _a;
        if (market === void 0) { market = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var startDateInstance, endDateInstance, _b, _c, result, e_5_1, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        startDateInstance = new Date(Date.UTC(startDate.year, startDate.month, startDate.date, startDate.hour));
                        endDateInstance = new Date(Date.UTC(endDate.year, endDate.month, endDate.date, endDate.hour));
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 14, , 15]);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 13]);
                        _b = __asyncValues(this.putDataQuarterlyGenerator(startDateInstance, endDateInstance, market));
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                        result = _c.value;
                        _d.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_5_1 = _d.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(_b)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, true];
                    case 14:
                        error_4 = _d.sent();
                        console.error(error_4);
                        return [2 /*return*/, false];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    DataHandler.prototype.putDataQuarterlyGenerator = function (startDate, endDate, market) {
        return __asyncGenerator(this, arguments, function putDataQuarterlyGenerator_1() {
            var startDateInstance, endDateInstance, _loop_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startDateInstance = startDate;
                        endDateInstance = endDate;
                        _loop_3 = function () {
                            var startDaysCandleConfig, result, putParams, output;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        startDaysCandleConfig = utils_1.getQuarterCandleConfig(startDateInstance).ethQuarterCandleConfig;
                                        return [4 /*yield*/, __await(new Promise(function (resolve) {
                                                return setTimeout(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            _a = resolve;
                                                            return [4 /*yield*/, api_handler_1.default.getInformation(startDaysCandleConfig)];
                                                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                                    }
                                                }); }); }, 1100);
                                            }))];
                                    case 1:
                                        result = (_b.sent());
                                        // logging
                                        log_cloudwatch_1.logQuarterCandle(result[0], market);
                                        putParams = {
                                            TableName: market === 'ethereum' ? config_1.ETHTABLE_QUARTER : 'alpha' ? config_1.ALPHATABLE_QUARTER : config_1.ETHTABLE_QUARTER,
                                            Item: {
                                                date: { S: startDateInstance.toISOString().substr(0, 10) },
                                                data: { S: JSON.stringify(result[0]) },
                                                hour: { S: startDateInstance.getUTCHours().toString() },
                                            },
                                        };
                                        return [4 /*yield*/, __await(database_1.default.putItem(putParams))];
                                    case 2: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                                    case 3: return [4 /*yield*/, _b.sent()];
                                    case 4:
                                        output = _b.sent();
                                        // add quarter
                                        startDateInstance = date_fns_1.add(startDateInstance, { hours: 4 });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a.label = 1;
                    case 1:
                        if (!(startDateInstance < endDateInstance)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_3()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataHandler.prototype.getAverAndK = function (today) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var givenDate, sum, i, getParams, retrievedData, parsedData, diff, av, k;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        givenDate = today;
                        sum = 0;
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < 3)) return [3 /*break*/, 4];
                        getParams = {
                            TableName: process.env.MARKET === 'ethereum' ? config_1.ETHTABLE_QUARTER : 'alpha' ? config_1.ALPHATABLE_QUARTER : config_1.ETHTABLE_QUARTER,
                            Key: {
                                date: { S: givenDate.toISOString().substr(0, 10) },
                                hour: { S: givenDate.getUTCHours().toString() }
                            },
                        };
                        return [4 /*yield*/, database_1.default.getItem(getParams)];
                    case 2:
                        retrievedData = _c.sent();
                        parsedData = JSON.parse((_b = (_a = retrievedData === null || retrievedData === void 0 ? void 0 : retrievedData.Item) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.S);
                        diff = parsedData.high_price - parsedData.low_price;
                        sum += diff;
                        givenDate = date_fns_1.sub(givenDate, { hours: 4 });
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        av = (sum / 3);
                        k = this.calcRoundXL(av, (Math.floor(1 - Math.log10(av))));
                        return [2 /*return*/, {
                                av: av,
                                k: k
                            }];
                }
            });
        });
    };
    DataHandler.prototype.calcRoundXL = function (num, digits) {
        digits = Math.pow(10, digits);
        return Math.round(num * digits) / digits;
    };
    return DataHandler;
}());
exports.default = new DataHandler();
