const str = 'yanceyleo';

console.log(str.endsWith('leo')) // true
console.log(str.endsWith('nce', 5)) // true
console.log(str.endsWith('yan', -1)) // false
console.log(str.endsWith()) // false