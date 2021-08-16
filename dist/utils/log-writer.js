"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAverAndK = void 0;
var logger_1 = require("./logger");
function writeAverAndK(input) {
    var av = input.av, k = input.k;
    logger_1.logger.info("====== Av is ====== " + av);
    logger_1.logger.info("====== k is ====== " + k);
}
exports.writeAverAndK = writeAverAndK;
