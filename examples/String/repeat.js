const str = 'messi'

console.log(str.repeat(1)) // 'messi'
console.log(str.repeat(3)) // 'messimessimessi'
console.log(str.repeat(0)) // ''
console.log(str.repeat()) // ''
// console.log(str.repeat(-1)) // RangeError: Invalid count value
console.log(str.repeat('dd')) // ''
console.log(str.repeat('2')) // 'messimessi'