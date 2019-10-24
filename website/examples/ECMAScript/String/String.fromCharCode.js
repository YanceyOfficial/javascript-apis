console.log(String.fromCharCode(97, 98, 99)) // 'abc'

// 不能正确处理大于65536的Unicode编码
console.log(String.fromCharCode(10086)) // '❦'

console.log(String.fromCharCode('97')) // 'a'

console.log(String.fromCharCode({})) // ''