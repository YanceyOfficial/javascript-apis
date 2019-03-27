const str = 'yanceyleo';

console.log(str.startsWith('yan')) // true
console.log(str.startsWith('nce', 2)) // true
console.log(str.startsWith('yan', -1)) // true
console.log(str.startsWith('yan', 1)) // false
console.log(str.startsWith()) // false