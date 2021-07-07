"use strict";
/**
 *  This class compute all about EMS and Trade_price
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EmsComputer = /** @class */ (function () {
    function EmsComputer() {
    }
    /**
     *
     * @param {!number} tradePrice 종가
     * @param {!number} prevEms 전날 EMS
     * @returns {number} 계산된 EMS
     */
    EmsComputer.prototype.computeEms = function (tradePrice, prevEms) {
        if (tradePrice === void 0) { tradePrice = 0; }
        if (prevEms === void 0) { prevEms = 0; }
        return Math.floor(tradePrice * (1 / 7) + prevEms * (6 / 7));
    };
    /**
     *
     * @param {!number} tradePrice  종가 or 현재가
     * @param {!number} ems 종가를 입력한 날짜와 같은 EMS
     * @returns {boolean} 종가가 높으면 true
     */
    EmsComputer.prototype.checkPotential = function (tradePrice, ems) {
        if (tradePrice === void 0) { tradePrice = 0; }
        if (ems === void 0) { ems = 0; }
        return tradePrice > ems ? true : false;
    };
    return EmsComputer;
}());
exports.default = new EmsComputer();
