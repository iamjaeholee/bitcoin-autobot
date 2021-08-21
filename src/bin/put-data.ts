import dataHandler from '../core/data-handler';

// put data
(async () => {
  const market = process.env.MARKET as string
  // const result = await dataHandler.putDataWithEms({year: 2021, month: 7, date:12}, {year:2021, month:7, date:13}, 'ethereum');
  // const result = await dataHandler.putTenData({year: 2020, month: 10, date:18}, 'alpha');
  // const result = await dataHandler.putDataWi020, month: 10, date:28}, 'alpha');
  const result = await dataHandler.putDataQuarterly({year: 2021, month: 7, date:20, hour: 16}, {year:2021, month:7, date:21, hour: 0}, market);
  // const result = await dataHandler.putDataToExcel();

  // const today = new Date(Date.UTC(2021, 5, 20));
  // const nextDay = add(today, {days:1});


  result ? console.log('success') : console.log('fail');
})();