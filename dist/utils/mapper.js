"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapper = void 0;
var config_1 = require("../config");
var mapper = new Map();
exports.mapper = mapper;
mapper.set('ethereum', [config_1.ETHEREUM, config_1.ETHTABLE, config_1.ETHTABLE_QUARTER, config_1.ETHSEMA]);
mapper.set('alpha', [config_1.ALPHA, config_1.ALPHATABLE, config_1.ALPHATABLE_QUARTER, config_1.ALPHASEMA]);
mapper.set('', [config_1.ETHEREUM, config_1.ETHTABLE, config_1.ETHTABLE_QUARTER]);
