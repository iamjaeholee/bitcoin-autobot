"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ems_computer_1 = __importDefault(require("../ems-computer"));
describe('EmsComputer class computeEms function', function () {
    it('should return 10 with getting 10 tradeprice and 10 prevEms', function () {
        var params = [10, 10];
        var result = ems_computer_1.default.computeEms.apply(ems_computer_1.default, params);
        expect(result).toBe(10);
    });
    it("should return 8.9 with getting 9 tradeprice and 8 prevEms", function () {
        var params = [9, 8];
        var result = ems_computer_1.default.computeEms.apply(ems_computer_1.default, params);
        expect(result).toBe(8.9);
    });
});
describe('EmsComputer class checkPotential function', function () {
    it('should return true with getting bigger tradePrice than EMS', function () {
        var params = [10, 5];
        var result = ems_computer_1.default.checkPotential.apply(ems_computer_1.default, params);
        expect(result).toBe(true);
    });
    it('should return false with getting lower tradePrice than EMS', function () {
        var params = [1, 5];
        var result = ems_computer_1.default.checkPotential.apply(ems_computer_1.default, params);
        expect(result).toBe(false);
    });
});
