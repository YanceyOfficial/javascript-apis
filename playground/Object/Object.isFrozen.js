// // 不可扩展的空对象是被冻结的
// const non_ExtensibleEmptyObj = Object.preventExtensions({});
// console.log(Object.isFrozen(non_ExtensibleEmptyObj)); // true

// // 不可扩展的非空对象不是被冻结的
// const non_ExtensibleObj = Object.preventExtensions({name: 'yancey'});
// console.log(Object.isFrozen(non_ExtensibleObj)); // false

// // 密封的空对象是被冻结的
// const sealedEmptyObj = Object.seal({});
// console.log(Object.isFrozen(sealedEmptyObj)); // true

// // 密封的非空对象不是被冻结的
// const sealedObj = Object.seal({name: 'yancey'});
// console.log(Object.isFrozen(sealedObj)); // false

// // 冻结对象也是不可扩展.
// const frozen = Object.freeze({});
// console.log(Object.isFrozen(frozen)); // true

// const obj1 = Object.defineProperty({}, 'name', {
//   value: 'yancey',
//   configurable: false,
//   writable: false,
// })

// Object.preventExtensions(obj1)

// console.log(Object.isFrozen(obj1)); // true


// const obj2 = Object.defineProperty({}, 'name', {
//   configurable: false,
//   get() {
//     return 'yancey'
//   }
// })

// Object.preventExtensions(obj2)

// console.log(Object.isFrozen(obj2)); // true

const obj1 = Object.seal({
  name: 'yancey'
});

Object.defineProperty(obj1, 'name', {
  writable: false,
})
console.log(Object.isFrozen(obj1)); // true

const obj2 = Object.defineProperty({}, 'name', {
  get(){
    return 'yancey'
  }
});

Object.seal(obj2)

console.log(Object.isFrozen(obj2)); // true

