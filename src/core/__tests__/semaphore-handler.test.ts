import semaphoreHandler from '../semaphore-handler';
import {format, sub} from 'date-fns';

describe('semaphore handler', () => {
	it('should get semaphore from DB', async () => {
		const result = await semaphoreHandler.getSemaphore();

		console.log(result);
	})

	it('should set semaphore to DB', async () => {
		const date = sub(new Date(Date.now()), {days: 1});
		const result = await semaphoreHandler.setSemaphore(format(date, "yyyy-MM-dd"));

		console.log(result);
	})
})