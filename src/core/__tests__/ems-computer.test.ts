import EmsComputer from '../ems-computer';

describe('EmsComputer class computeEms function', () => {
  it('should return 10 with getting 10 tradeprice and 10 prevEms', () => {
    const params = [10, 10];

    const result = EmsComputer.computeEms(...params);
    expect(result).toBe(10);
  })

  it("should return 8.9 with getting 9 tradeprice and 8 prevEms", () => {
    const params = [9, 8];

    const result = EmsComputer.computeEms(...params);
    expect(result).toBe(8.9);
  })
});

describe('EmsComputer class checkPotential function', () => {
  it('should return true with getting bigger tradePrice than EMS', () => {
    const params = [10, 5];

    const result = EmsComputer.checkPotential(...params);
    expect(result).toBe(true);
  })

  it('should return false with getting lower tradePrice than EMS', () => {
    const params = [1, 5];

    const result = EmsComputer.checkPotential(...params);
    expect(result).toBe(false);
  })
})