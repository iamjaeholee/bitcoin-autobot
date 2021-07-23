"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logQuarterCandle = exports.logDayCandle = void 0;
var logger_1 = require("./logger");
function logDayCandle(dayCandle, ema, market) {
    if (market === void 0) { market = ''; }
    var logger = market === 'ethereum' ? logger_1.etherLogger : 'alpha' ? logger_1.alphaLogger : logger_1.etherLogger;
    // start line
    logger.info('********* Lets start the game Confess ! *************');
    logger.info("====== trying to fetch dayCandle ======");
    logger.info("time: " + new Date(Date.now()).toISOString() + " ");
    logger.info("====== fetched data ======");
    for (var _i = 0, _a = Object.entries(dayCandle); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        logger.info(key + " : " + value);
    }
    logger.info("====== calculated ema ======");
    logger.info("ema: " + ema);
}
exports.logDayCandle = logDayCandle;
function logQuarterCandle(quarterCandle, market) {
    if (market === void 0) { market = ''; }
    var logger = market === 'ethereum' ? logger_1.etherLogger : 'alpha' ? logger_1.alphaLogger : logger_1.etherLogger;
    // start line
    logger.info('********* Lets start the game Confess ! *************');
    logger.info("====== trying to fetch quarterCandle ======");
    logger.info("time: " + new Date(Date.now()).toISOString() + " ");
    logger.info("====== fetched data ======");
    for (var _i = 0, _a = Object.entries(quarterCandle); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        logger.info(key + " : " + value);
    }
}
exports.logQuarterCandle = logQuarterCandle;
