import dataHandler from "../core/data-handler";

// put data
(async () => {
  // const result = await dataHandler.putDataWithEms(
  //   { year: 2021, month: 8, date: 11 },
  //   { year: 2021, month: 8, date: 12 }
  // );
  // const result = await dataHandler.putDataWithEms({year: 2017, month: 9, date:6}, {year:2017, month:9, date:10});
  // const result = await dataHandler.putTenData({year: 2017, month: 8, date:26});
  // const result = await dataHandler.putDataWithAverEms({year: 2017, month: 9, date:6});
  // const result = await dataHandler.putDataWi020, month: 10, date:28}, 'alpha');
  const result = await dataHandler.putDataQuarterly(
    { year: 2021, month: 8, date: 9, hour: 0 },
    { year: 2021, month: 8, date: 11, hour: 4 }
  );
  // const result = await dataHandler.putDataToExcel();

  // const today = new Date(Date.UTC(2021, 5, 20));
  // const nextDay = add(today, {days:1});

  result ? console.log("success") : console.log("fail");
})();
