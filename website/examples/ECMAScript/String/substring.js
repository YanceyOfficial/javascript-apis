const str = 'yanceyleo';

console.log(str.substring()); // 'yanceyleo'
console.log(str.substring(3)); // 'ceyleo'
console.log(str.substring(3, 5)); // 'ce'
console.log(str.substring(5, 5)); // ''
console.log(str.substring(5, 3)); // 'ce'
console.log(str.substring(-1, 3)); // 'yan'
console.log(str.substring(3, -2)); // 'yan'