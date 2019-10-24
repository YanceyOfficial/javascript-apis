const str = 'yanceyleo';

console.log(str.substr(0)); // 'yanceyleo'
console.log(str.substr(4)); // 'eyleo'

console.log(str.substr(4, 3)); // 'eyl'
console.log(str.substr(4, 10)); // 'eyleo'

console.log(str.substr(-2, 10)); // 'eo'

console.log(str.substr(-100, 10)); // 'yanceyleo'

console.log(str.substr(10, 1)); // ''

console.log(str.substr(4, 0)); // ''
console.log(str.substr(4, -1)); // ''