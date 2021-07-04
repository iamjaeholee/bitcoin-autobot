/**
 *  This class compute all about EMS and Trade_price
 */

class EmsComputer {
  constructor() {}

  /**
   *
   * @param {!number} tradePrice 종가
   * @param {!number} prevEms 전날 EMS
   * @returns {number} 계산된 EMS
   */
  public computeEms(tradePrice: number = 0, prevEms: number = 0) {
    return Math.floor(tradePrice * (1/7) + prevEms * (6/7));
  }

  /**
   *
   * @param {!number} tradePrice  종가 or 현재가
   * @param {!number} ems 종가를 입력한 날짜와 같은 EMS
   * @returns {boolean} 종가가 높으면 true
   */
  public checkPotential(tradePrice: number = 0, ems: number = 0) {
    return tradePrice > ems ? true : false;
  }
}

export default new EmsComputer();