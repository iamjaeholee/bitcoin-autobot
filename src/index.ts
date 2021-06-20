import schedule from 'node-schedule';
import dataHandler from './core/data-handler';


//put data
(async () => {
  const result = await dataHandler.putDataWithEms({year: 2017, month: 9, date:15}, {year:2021, month:5, date:20});

  result ? console.log('success') : console.log('fail');
})();

// const job = schedule.scheduleJob('0 0 9 * * *', function(){
//   console.log('time to buy and sell');
// });