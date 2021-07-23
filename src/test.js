const format = require('date-fns/format');

const year = '2021';
const month = '11';
const date = '5';


const temp1 = new Date(Date.UTC(year, month, date, 16));
const temp2 = new Date(year, month, date, 0);

console.log(temp1);
console.log(temp2);

console.log(new Date(temp1.getTime()));
console.log(new Date(temp2.getTime()));

console.log(format(temp1, 'yyyy-MM-dd hh:mm:ss'));
console.log(temp1.toISOString().substr(0, 10));
console.log(format(temp2, 'yyyy-MM-dd hh:mm:ss'));
