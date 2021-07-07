"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuarterCandleConfig = exports.getDayCandleConfig = void 0;
var config_1 = require("../config");
var getDayCandleConfig = function (toDate) {
    var ethDaysCandleConfig = {
        method: 'get',
        url: 'https://api.upbit.com/v1/candles/days',
        params: {
            market: config_1.ETHEREUM,
            count: 1,
            to: toDate
        }
    };
    return { ethDaysCandleConfig: ethDaysCandleConfig };
};
exports.getDayCandleConfig = getDayCandleConfig;
var getQuarterCandleConfig = function (toDate) {
    var ethQuarterCandleConfig = {
        method: 'get',
        url: 'https://api.upbit.com/v1/candles/minutes/240',
        params: {
            market: config_1.ETHEREUM,
            count: 1,
            to: toDate
        }
    };
    return { ethQuarterCandleConfig: ethQuarterCandleConfig };
};
exports.getQuarterCandleConfig = getQuarterCandleConfig;
