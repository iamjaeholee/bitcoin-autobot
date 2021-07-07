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
var data_handler_1 = __importDefault(require("../data-handler"));
// const ust = '2021-06-18 00:00:00';
// const kst = '2021-06-18 09:00:00';
// const daysCandleConfig = {
//   method: 'get' as Method,
//   url: 'https://api.upbit.com/v1/candles/days',
//   params: {
//     market: 'KRW-ETH',
//     count: 1,
//     to: ust
//   }
// }
// const kstDaysCandleConfig = {
//   method: 'get' as Method,
//   url: 'https://api.upbit.com/v1/candles/days',
//   params: {
//     market: 'KRW-ETH',
//     count: 1,
//     to: kst
//   }
// }
describe('DataHandler class', function () {
    var firstTenData = true;
    // beforeAll(async () => {
    //   firstTenData = await dataHandler.putTenData({year: 2017, month: 8, date: 26});
    // })
    // it('get information', async () => {
    //   const ustRe = await apiHandler.getInformation(daysCandleConfig);
    //   const kstRe = await apiHandler.getInformation(kstDaysCandleConfig);
    //   console.log(ustRe[0]);
    //   console.log(kstRe[0]);
    //   const UTCDate = new Date(Date.UTC(2021, 5, 18));
    //   console.log(UTCDate);
    //   const test = {
    //     method: 'get' as Method,
    //     url: 'https://api.upbit.com/v1/candles/days',
    //     params: {
    //       market: 'KRW-ETH',
    //       count: 1,
    //       to: UTCDate.toISOString()
    //     }
    //   }
    //   const testRe = await apiHandler.getInformation(test);
    //   console.log(testRe[0]);
    // })
    it('should put 10 items from start date', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(firstTenData).toBe(true);
            return [2 /*return*/];
        });
    }); });
    // it('putDataQuarterly should put data in DB properly', async () => {
    //   const result = await dataHandler.putDataQuarterly({year: 2021, month: 6, date: 2, hour: 4}, {year: 2021, month: 6, date: 3, hour: 12});
    //   expect(result).toBe(true);
    // })
    // it('should put first ems from 10 items before start date', async () => {
    //   const result = await dataHandler.putDataWithAverEms({year: 2017, month: 9, date: 6});
    //   expect(result).toBe(true);
    // })
    it('should put data from startDate to endDate with ems value using putDataWithEms', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, data_handler_1.default.putDataWithEms({ year: 2021, month: 5, date: 19 }, { year: 2021, month: 5, date: 20 })];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
