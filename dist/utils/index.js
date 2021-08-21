"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuarterCandleConfig = exports.getDayCandleConfig = void 0;
var config_1 = require("../config");
var getDayCandleConfig = function (toDate, market) {
    if (market === void 0) { market = ''; }
    var daysCandleConfig = {
        method: 'get',
        url: 'https://api.upbit.com/v1/candles/days',
        params: {
            market: market === 'ethereum' ? config_1.ETHEREUM : market === 'alpha' ? config_1.ALPHA : config_1.ETHEREUM,
            count: 1,
            to: toDate
        }
    };
    return { daysCandleConfig: daysCandleConfig };
};
exports.getDayCandleConfig = getDayCandleConfig;
var getQuarterCandleConfig = function (toDate, market) {
    if (market === void 0) { market = ''; }
    var ethQuarterCandleConfig = {
        method: 'get',
        url: 'https://api.upbit.com/v1/candles/minutes/240',
        params: {
            market: market === 'ethereum' ? config_1.ETHEREUM : market === 'alpha' ? config_1.ALPHA : config_1.ETHEREUM,
            count: 1,
            to: toDate
        }
    };
    return { ethQuarterCandleConfig: ethQuarterCandleConfig };
};
exports.getQuarterCandleConfig = getQuarterCandleConfig;
