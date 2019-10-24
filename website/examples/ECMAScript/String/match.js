const str = 'yanceyLEO1';

console.log(str.match()); // ['', index: 0, input: 'yanceyLEO1']

// 当有全局标志时
console.log(str.match(/[a-e]/ig)); // [ 'a', 'c', 'e', 'E' ]

console.log(str.match(/[f-h]/ig)); // null

console.log(str.match(/[a-e]/i)); // [ 'a', index: 1, input: 'yanceyLEO1' ]

// 不包含捕获时，只返回第一个匹配到的结果
console.log(str.match(/\s*y\s*/)); // [ 'y', index: 0, input: 'yanceyLEO1' ]

// 包含捕获时，会返回所有匹配到的结果，但索引仍返回第一次匹配到的
console.log(str.match(/(\s*y\s*)/)); // [ 'y', 'y', index: 0, input: 'yanceyLEO1' ]

// 当参数是一个字符串或一个数字，它会使用new RegExp(obj)来隐式转换成一个 RegExp。如果它是一个有正号的正数，RegExp() 方法将忽略正号。
console.log(str.match('y')); // ['y', index: 0, input: 'yanceyLEO1']
console.log(str.match(+1)); // ['y', index: 0, input: 'yanceyLEO1']
console.log(str.match(-1)); // null

console.log(/[a-e]/i.exec(str)) // [ 'a', index: 1, input: 'yanceyLEO1' ]

console.log(/[a-e]/i.test(str)) // true

console.log(/[a-e]/ig.exec(str)) // [ 'a', index: 1, input: 'yanceyLEO1' ]
