"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyAlertWriter = exports.writeAverAndK = void 0;
var logger_1 = require("./logger");
var slack_webhook_1 = require("../core/slack-webhook");
function writeAverAndK(input) {
    var av = input.av, k = input.k;
    logger_1.logger.info("====== Av is ====== " + av);
    logger_1.logger.info("====== k is ====== " + k);
}
exports.writeAverAndK = writeAverAndK;
function buyAlertWriter() {
    var section = {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '*-10%이상, 매수하는 날임*'
        },
    };
    var result = slack_webhook_1.sendMessage([section]);
}
exports.buyAlertWriter = buyAlertWriter;
