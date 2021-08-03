const str = 'yancey';

console.log(str.concat('leo')); // 'yanceyleo'
console.log(str.concat(' is', ' best')); // 'yancey is best'
console.log(str.concat(true)); // 'yanceytrue'
console.log(str.concat()); // 'yancey'

let testStr = '';
console.time('useConcat');
for (let i = 0; i < 1000000; i += 1) {
  testStr.concat(Math.random());
}
console.timeEnd('useConcat'); // 350.290ms

console.time('use+=');
for (let i = 0; i < 1000000; i += 1) {
  testStr += 'abc';
}
console.timeEnd('use+='); // 103.233ms
