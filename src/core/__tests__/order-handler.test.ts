import orderHandler from '../order-handler';

describe('order-handler getChance function', () => {
	it('should get information', async () => {
		const result = await orderHandler.getChance();
		console.log(result);
		console.log(Number(result.ask_account.balance));
	})

	// it('should buy specific price', async () => {
	// 	const result = await orderHandler.buy(10000);
	// 	console.log(result);
	// })

	it('should sell all balance', async () => {
		const result = await orderHandler.sellAll();
		console.log(result);
	})
})