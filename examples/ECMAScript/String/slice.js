const str = 'yanceyleo';

console.log(str.slice()) // 'yanceyleo'
console.log(str.slice(1)) // 'anceyleo'
console.log(str.slice(100)) // ''
console.log(str.slice(-2)) // 'eo'
console.log(str.slice(1, 2)) // 'a'
console.log(str.slice(-1, -2)) // ''
console.log(str.slice(-2, -1)) // 'e'
