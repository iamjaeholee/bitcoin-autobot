"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DYN_SLACK_URL = exports.DYN_CHANNEL = exports.DYN_SEMA = exports.DYN_TABLE_QUARTER = exports.DYN_TABLE = exports.DYN_MARKET = exports.mapper = void 0;
var config_1 = require("../config");
var mapper = new Map();
exports.mapper = mapper;
mapper.set("ethereum", [
    config_1.ETHEREUM,
    config_1.ETHTABLE,
    config_1.ETHTABLE_QUARTER,
    config_1.ETHSEMA,
    config_1.ETHCHANNEL,
    config_1.ETH_SLACK_INCOMING_WEBHOOK,
]);
mapper.set("alpha", [
    config_1.ALPHA,
    config_1.ALPHATABLE,
    config_1.ALPHATABLE_QUARTER,
    config_1.ALPHASEMA,
    config_1.ALPHACHANNEL,
    config_1.ALPHA_SLACK_INCOMING_WEBHOOK,
]);
mapper.set("bitcoin", [
    config_1.BITCOIN,
    config_1.BITTABLE,
    config_1.BITTABLE_QUARTER,
    config_1.BITSEMA,
    config_1.BITCHANNEL,
    config_1.BIT_SLACK_INCOMING_WEBHOOK,
]);
mapper.set("", [config_1.ETHEREUM, config_1.ETHTABLE, config_1.ETHTABLE_QUARTER]);
var market = process.env.MARKET;
var constants = mapper.get(market);
var DYN_MARKET = constants ? constants[0] : config_1.ALPHA;
exports.DYN_MARKET = DYN_MARKET;
var DYN_TABLE = constants ? constants[1] : config_1.ALPHATABLE;
exports.DYN_TABLE = DYN_TABLE;
var DYN_TABLE_QUARTER = constants ? constants[2] : config_1.ALPHATABLE_QUARTER;
exports.DYN_TABLE_QUARTER = DYN_TABLE_QUARTER;
var DYN_SEMA = constants ? constants[3] : config_1.ALPHASEMA;
exports.DYN_SEMA = DYN_SEMA;
var DYN_CHANNEL = constants ? constants[4] : config_1.ALPHACHANNEL;
exports.DYN_CHANNEL = DYN_CHANNEL;
var DYN_SLACK_URL = constants ? constants[5] : config_1.ALPHA_SLACK_INCOMING_WEBHOOK;
exports.DYN_SLACK_URL = DYN_SLACK_URL;
