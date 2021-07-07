"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_schedule_1 = __importDefault(require("node-schedule"));
describe('scheduler', function () {
    it('should controll job in UTC', function () {
        var job = node_schedule_1.default.scheduleJob('0 0 0 * * *', function () {
            console.log('test');
        });
        // console.log(JSON.stringify(job));
        job.cancel();
    });
});
