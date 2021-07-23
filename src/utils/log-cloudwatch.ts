import {etherLogger, alphaLogger} from './logger';

function logDayCandle(dayCandle: any, ema: number, market:string = ''){
	const logger = market === 'ethereum' ? etherLogger : 'alpha' ? alphaLogger : etherLogger;

	// start line
	logger.info('********* Lets start the game Confess ! *************');
	logger.info(`====== trying to fetch dayCandle ======`);
	logger.info(`time: ${new Date(Date.now()).toISOString()} `);
	logger.info(`====== fetched data ======`);
	for(const [key, value] of Object.entries(dayCandle)){
		logger.info(`${key} : ${value}`);
	}
	logger.info(`====== calculated ema ======`);
	logger.info(`ema: ${ema}`);

}

function logQuarterCandle(quarterCandle: any, market:string = ''){
	const logger = market === 'ethereum' ? etherLogger : 'alpha' ? alphaLogger : etherLogger;

	// start line
	logger.info('********* Lets start the game Confess ! *************');
	logger.info(`====== trying to fetch quarterCandle ======`);
	logger.info(`time: ${new Date(Date.now()).toISOString()} `);
	logger.info(`====== fetched data ======`);
	for(const [key, value] of Object.entries(quarterCandle)){
		logger.info(`${key} : ${value}`);
	}
}

export {logDayCandle, logQuarterCandle};