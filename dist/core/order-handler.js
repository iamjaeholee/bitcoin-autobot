"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_handler_1 = __importDefault(require("./api-handler"));
var uuidv4_1 = require("uuidv4");
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = require("jsonwebtoken");
var querystring_1 = require("querystring");
var key_1 = require("../config/key");
var key_2 = require("../config/key");
var OrderHandler = (function () {
    var OrderHandler = function () {
    };
    OrderHandler.prototype.sellAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, balance, sellBody, sellHash, sellQuery, sellQueryHash, sellPayload, sellToken, sellConfig, sellResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getChance()];
                    case 1:
                        result = _a.sent();
                        balance = (Number(result.ask_account.balance));
                        sellBody = {
                            market: 'KRW-ADA',
                            side: 'ask',
                            volume: balance,
                            price: null,
                            ord_type: 'market',
                        };
                        sellHash = crypto_1.default.createHash('sha512');
                        sellQuery = querystring_1.encode(sellBody);
                        sellQueryHash = sellHash.update(sellQuery, 'utf-8').digest('hex');
                        sellPayload = {
                            access_key: key_1.accessKey,
                            nonce: uuidv4_1.uuid(),
                            query_hash: sellQueryHash,
                            query_hash_alg: 'SHA512',
                        };
                        sellToken = jsonwebtoken_1.sign(sellPayload, key_2.secretKey);
                        sellConfig = {
                            method: 'post',
                            url: 'https://api.upbit.com/v1/orders',
                            headers: { Authorization: "Bearer " + sellToken },
                            data: __assign({}, sellBody)
                        };
                        return [4 /*yield*/, api_handler_1.default.getInformation(sellConfig)];
                    case 2:
                        sellResult = _a.sent();
                        return [2 /*return*/, sellResult];
                }
            });
        });
    };
    OrderHandler.prototype.getChance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, query, hash, queryHash, payload, token, chanceConfig, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            market: 'KRW-ADA'
                        };
                        query = querystring_1.encode(body);
                        hash = crypto_1.default.createHash('sha512');
                        queryHash = hash.update(query, 'utf-8').digest('hex');
                        payload = {
                            access_key: key_1.accessKey,
                            nonce: uuidv4_1.uuid(),
                            query_hash: queryHash,
                            query_hash_alg: 'SHA512',
                        };
                        token = jsonwebtoken_1.sign(payload, key_2.secretKey);
                        chanceConfig = {
                            method: 'get',
                            url: 'https://api.upbit.com/v1/orders/chance?' + query,
                            headers: { Authorization: "Bearer " + token },
                        };
                        return [4 /*yield*/, api_handler_1.default.getInformation(chanceConfig)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrderHandler.prototype.buy = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var buyBody, buyHash, buyQuery, buyQueryHash, buyPayload, buyToken, buyConfig, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buyBody = {
                            market: 'KRW-ADA',
                            side: 'bid',
                            volume: null,
                            price: amount.toString(),
                            ord_type: 'price',
                        };
                        buyHash = crypto_1.default.createHash('sha512');
                        buyQuery = querystring_1.encode(buyBody);
                        buyQueryHash = buyHash.update(buyQuery, 'utf-8').digest('hex');
                        buyPayload = {
                            access_key: key_1.accessKey,
                            nonce: uuidv4_1.uuid(),
                            query_hash: buyQueryHash,
                            query_hash_alg: 'SHA512',
                        };
                        buyToken = jsonwebtoken_1.sign(buyPayload, key_2.secretKey);
                        buyConfig = {
                            method: 'post',
                            url: 'https://api.upbit.com/v1/orders',
                            headers: { Authorization: "Bearer " + buyToken },
                            data: __assign({}, buyBody)
                        };
                        return [4 /*yield*/, api_handler_1.default.getInformation(buyConfig)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrderHandler.prototype.buyQuarter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var buyBody, buyHash, buyQuery, buyQueryHash, buyPayload, buyToken, buyConfig, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buyBody = {
                            market: 'KRW-ADA',
                            side: 'bid',
                            volume: null,
                            // price: amount.toString(),
                            ord_type: 'price',
                        };
                        buyHash = crypto_1.default.createHash('sha512');
                        buyQuery = querystring_1.encode(buyBody);
                        buyQueryHash = buyHash.update(buyQuery, 'utf-8').digest('hex');
                        buyPayload = {
                            access_key: key_1.accessKey,
                            nonce: uuidv4_1.uuid(),
                            query_hash: buyQueryHash,
                            query_hash_alg: 'SHA512',
                        };
                        buyToken = jsonwebtoken_1.sign(buyPayload, key_2.secretKey);
                        buyConfig = {
                            method: 'post',
                            url: 'https://api.upbit.com/v1/orders',
                            headers: { Authorization: "Bearer " + buyToken },
                            data: __assign({}, buyBody)
                        };
                        return [4 /*yield*/, api_handler_1.default.getInformation(buyConfig)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return OrderHandler;
}());
exports.default = new OrderHandler();
