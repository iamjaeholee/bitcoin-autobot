import schedule from 'node-schedule';

const job = schedule.scheduleJob('0 0 9 * * *', function(){
  console.log('time to buy and sell');
});