import dbManager from '../database';
import {DYN_SEMA, mapper} from '../utils/mapper';

class SemaphoreHandler {
	constructor (){};

	public async getSemaphore(market: string = ''){

    const params = {
      TableName: DYN_SEMA,
      Key: {
        name: {S: 'startDate'}
      },
    }

		const result = params ? await dbManager.getItem(params) : undefined;
		const startDate = (result?.Item?.data?.S as string);

		return startDate;
	}

	public async setSemaphore(date: string){
    const params = {
      TableName: DYN_SEMA,
      Item: {
        name: {S: 'startDate'},
        data: {S: date},
      },
    }

    const result = params ? await dbManager.putItem(params) : undefined;

		return result;
	}
}

export default new SemaphoreHandler();