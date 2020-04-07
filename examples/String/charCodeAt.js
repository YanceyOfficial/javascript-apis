const twoBytesStr = 'yancey';

const fourBytesStr = '𝌆';

console.log(twoBytesStr.charCodeAt(0)) // 121
console.log(twoBytesStr.charCodeAt(100)) // NaN
console.log(twoBytesStr.charCodeAt(-1)) // NaN
console.log(twoBytesStr.charCodeAt()) // 121
// 这是一个错误的Unicode编码，请使用 codePointAt()
console.log(fourBytesStr.charCodeAt(0)) // 55348
// false被转换成0，因此拿到索引为0处的Unicode编码
console.log(twoBytesStr.charCodeAt(false)) // 121
// 当无法被转换为数值时，返回索引为0处的Unicode编码
console.log(twoBytesStr.charCodeAt({})) // 121
