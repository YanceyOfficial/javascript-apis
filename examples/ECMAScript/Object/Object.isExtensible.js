// 不可扩展对象是不可扩展的
const non_ExtensibleObj = Object.preventExtensions({});
console.log(Object.isExtensible(non_ExtensibleObj)); // false

// 密封对象是不可扩展的.
const sealedObj = Object.seal({});
console.log(Object.isExtensible(sealedObj)); // false

// 冻结对象也是不可扩展.
var frozen = Object.freeze({});
console.log(Object.isExtensible(frozen)); // false