import dbManager from '../database';
import {mapper} from '../utils/mapper';

class SemaphoreHandler {
	constructor (){};

	public async getSemaphore(market: string = ''){
    const marketArgs = mapper.get(market);

    const params = marketArgs ? {
      TableName: marketArgs[3],
      Key: {
        name: {S: 'startDate'}
      },
    } : undefined

		const result = params ? await dbManager.getItem(params) : undefined;
		const startDate = (result?.Item?.data?.S as string);

		return startDate;
	}

	public async setSemaphore(date: string, market:string = ''){
    const marketArgs = mapper.get(market);
    const params = marketArgs ? {
      TableName: marketArgs[3],
      Item: {
        name: {S: 'startDate'},
        data: {S: date},
      },
    } : undefined

    const result = params ? await dbManager.putItem(params) : undefined;

		return result;
	}
}

export default new SemaphoreHandler();