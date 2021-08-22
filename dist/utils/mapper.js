"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DYN_SEMA = exports.DYN_TABLE_QUARTER = exports.DYN_TABLE = exports.DYN_MARKET = exports.mapper = void 0;
var config_1 = require("../config");
var mapper = new Map();
exports.mapper = mapper;
mapper.set('ethereum', [config_1.ETHEREUM, config_1.ETHTABLE, config_1.ETHTABLE_QUARTER, config_1.ETHSEMA]);
mapper.set('alpha', [config_1.ALPHA, config_1.ALPHATABLE, config_1.ALPHATABLE_QUARTER, config_1.ALPHASEMA]);
mapper.set('bitcoin', [config_1.BITCOIN, config_1.BITTABLE, config_1.BITTABLE_QUARTER, config_1.BITSEMA]);
mapper.set('', [config_1.ETHEREUM, config_1.ETHTABLE, config_1.ETHTABLE_QUARTER]);
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
