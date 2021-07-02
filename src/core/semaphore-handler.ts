import dbManager from '../database';

class SemaphoreHandler {
	constructor (){};

	public async getSemaphore(){
    const params = {
      TableName: "semaphore",
      Key: {
        name: {S: 'startDate'}
      },
    }

		const result = await dbManager.getItem(params);
		const startDate = (result?.Item?.data?.S as string);

		return startDate;
	}

	public async setSemaphore(date: string){
    const params = {
      TableName: "semaphore",
      Item: {
        name: {S: 'startDate'},
        data: {S: date},
      },
    }

    const result = await dbManager.putItem(params);

		return result;
	}
}

export default new SemaphoreHandler();