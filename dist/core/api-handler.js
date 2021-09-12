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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
/**
 * create new instance information getter from config
 */
var ApiHandler = /** @class */ (function () {
    function ApiHandler() {
    }
    /**
     *
     * @param {!AxiosRequestConfig} config  axios config
     * @returns {Promise<Array<any>>} response data
     */
    ApiHandler.prototype.getInformation = function (config) {
        if (config === void 0) { config = undefined; }
        return axios_1.default(__assign({}, config))
            .then(function (res) {
            return res.data;
        })
            .catch(function (err) {
            return err;
        });
    };
    return ApiHandler;
}());
exports.default = new ApiHandler();
