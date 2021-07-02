import schedule from 'node-schedule';

describe('scheduler', () => {
	it('should controll job in UTC', () => {
		const job = schedule.scheduleJob('0 0 0 * * *', () => {
			console.log('test');
		})

		// console.log(JSON.stringify(job));

		job.cancel();
	})
})