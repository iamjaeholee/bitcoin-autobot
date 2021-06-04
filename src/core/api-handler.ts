import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * create new instance information getter from config
 */


class ApiHandler {
  constructor() {};
  
  public getInformation(config:AxiosRequestConfig | undefined = undefined): Promise<Array<any>>{
    return axios({
      ...config
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    })
  }
}

export default ApiHandler;