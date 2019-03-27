const str = 'messi';

console.log(str.includes('es')) // true
console.log(str.includes('leo')) // false
console.log(str.includes('me', 3)) // false
// 当positon小于等于0时视为0
console.log(str.includes('me', -1)) // true
console.log(str.includes('')) // true
// 当不传递任何参数时恒返回false
console.log(str.includes()) // false