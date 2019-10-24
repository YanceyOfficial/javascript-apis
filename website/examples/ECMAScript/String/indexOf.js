const str = 'rurula';

console.log(str.indexOf('ru')) // 0
console.log(str.indexOf('ru', 2)) // 2
console.log(str.indexOf('ru', 3)) // -1
console.log(str.indexOf('ru', -1)) // 0
console.log(str.indexOf('', 0)) // 0
console.log(str.indexOf('', 1)) // 1
console.log(str.indexOf('', 10)) // 6