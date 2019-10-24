const str = 'yanceyLEO1';

console.log(str.search()) // 0
console.log(str.search(/[a-e]/ig)) // 1
console.log(str.search(/[a-e]/i)) // 1
console.log(str.search(/(\s*y\s*)/)) // 0
console.log(str.search(/\s*y\s*/)) // 0