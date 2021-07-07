"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logQuarterCandle = exports.logDayCandle = void 0;
var logger_1 = __importDefault(require("./logger"));
function logDayCandle(dayCandle, ema) {
    // start line
    logger_1.default.info('********* Lets start the game Confess ! *************');
    logger_1.default.info("====== trying to fetch dayCandle ======");
    logger_1.default.info("time: " + new Date(Date.now()).toISOString() + " ");
    logger_1.default.info("====== fetched data ======");
    for (var _i = 0, _a = Object.entries(dayCandle); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        logger_1.default.info(key + " : " + value);
    }
    logger_1.default.info("====== calculated ema ======");
    logger_1.default.info("ema: " + ema);
}
exports.logDayCandle = logDayCandle;
function logQuarterCandle(quarterCandle) {
    // start line
    logger_1.default.info('********* Lets start the game Confess ! *************');
    logger_1.default.info("====== trying to fetch quarterCandle ======");
    logger_1.default.info("time: " + new Date(Date.now()).toISOString() + " ");
    logger_1.default.info("====== fetched data ======");
    for (var _i = 0, _a = Object.entries(quarterCandle); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        logger_1.default.info(key + " : " + value);
    }
}
exports.logQuarterCandle = logQuarterCandle;
