"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuarterCandleConfig = exports.getDayCandleConfig = void 0;
var mapper_1 = require("./mapper");
var getDayCandleConfig = function (toDate) {
    var daysCandleConfig = {
        method: 'get',
        url: 'https://api.upbit.com/v1/candles/days',
        params: {
            market: mapper_1.DYN_MARKET,
            count: 1,
            to: toDate
        }
    };
    return { daysCandleConfig: daysCandleConfig };
};
exports.getDayCandleConfig = getDayCandleConfig;
var getQuarterCandleConfig = function (toDate) {
    var ethQuarterCandleConfig = {
        method: 'get',
        url: 'https://api.upbit.com/v1/candles/minutes/240',
        params: {
            market: mapper_1.DYN_MARKET,
            count: 1,
            to: toDate
        }
    };
    return { ethQuarterCandleConfig: ethQuarterCandleConfig };
};
exports.getQuarterCandleConfig = getQuarterCandleConfig;
