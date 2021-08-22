import {logger} from './logger';

function logDayCandle(dayCandle: any, ema: number){
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

function logQuarterCandle(quarterCandle: any){
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