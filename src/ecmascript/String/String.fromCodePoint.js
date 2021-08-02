console.log(String.fromCodePoint()) // ''
console.log(String.fromCodePoint('97')) // 'a'
console.log(String.fromCodePoint({})) // RangeError: Invalid code point NaN
console.log(String.fromCodePoint(97, 98, 119558)) // 'ab𝌆'