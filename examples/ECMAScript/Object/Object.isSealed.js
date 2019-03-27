// 注意！一个空的对象被设为不可扩展，它就是已被密封的
const non_ExtensibleEmptyObj = Object.preventExtensions({});
console.log(Object.isSealed(non_ExtensibleEmptyObj)); // true

// 非空对象
const non_ExtensibleObj = Object.preventExtensions({
  name: 'Yancey'
});
console.log(Object.isSealed(non_ExtensibleObj)); // false

const obj = {
  name: 'yancey'
};

Object.preventExtensions(obj);
Object.defineProperty(obj, 'name', {
  configurable: false,
})

console.log(Object.isSealed(obj)); // true

// 密封对象是不可扩展的.
const sealedObj = Object.seal({});
console.log(Object.isSealed(sealedObj)); // true

// 冻结对象也是不可扩展.
const frozen = Object.freeze({});
console.log(Object.isSealed(frozen)); // true