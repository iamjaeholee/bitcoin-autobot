import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * create new instance information getter from config
 */


class ApiHandler {
  constructor() {};
  
  /**
   * 
   * @param {!AxiosRequestConfig} config  axios config
   * @returns {Promise<Array<any>>} response data
   */
  public getInformation(config:AxiosRequestConfig | undefined = undefined): Promise<Array<any>>{
    return axios({
      ...config
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      return err.response.data;
    })
  }
}

export default new ApiHandler();