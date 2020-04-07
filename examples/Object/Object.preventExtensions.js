const obj = {
  firstName: 'Yancey',
  lastName: 'Leo',
  other: {
    hobbies: ['girl'],
  },
  greeting() {
    return `Hello, ${this.firstName}!`
  }
}

// Object.preventExtensions将原对象变的不可扩展, 并且返回原对象，因此 newObj 和 原obj 相等，只不过已经不可扩展了
const newObj = Object.preventExtensions(obj);

console.log(newObj === obj) // true

// 不影响修改和删除
// obj.firstName = 'Sayaka';
// console.log(obj.firstName); // 'Sayaka'

// console.log(delete obj.lastName); // true
// console.log(obj.lastName); // undefined

// obj.age = 18
// console.log(obj.age); // undefined

// 严格模式下直接报错
// TypeError: Cannot define property age, object is not extensible
// function fail() {
//   'use strict';
//   obj.age = 18;
// }
// fail();

// 使用 Object.defineProperty() 直接报错
// TypeError: Cannot define property age, object is not extensible
// Object.defineProperty(obj, 'age', {
//   value: 18
// })

Object.defineProperty(obj, 'firstName', {
  value: 'Sayaka'
})
console.log(obj.firstName); // true

// 原型也不可修改
// TypeError: #<Object> is not extensible
// obj.__proto__ = {
//   some: 'something...'
// }

// const arr = ['red', 'green', 'white'];

// Object.preventExtensions(arr)

// // 不能新增
// // Uncaught TypeError: Cannot add property 3, object is not extensible
// // arr.push('black')

// // 但可以修改
// // arr[0] = 'black'

// // 也可以删除
// arr.shift();

// console.log(arr)