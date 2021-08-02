// function Dog(name, color) {
//   this.name = name;
//   this.color = color;
// }

// Dog.prototype.bark = function () {
//   return '汪汪~'
// }

// const husky = new Dog('旺财', 'pink')

// // 给实例对象定义一个“对象”属性，用于验证描述中的第四条
// husky.other = {
//   country: 'USA',
// }

// console.log(husky)

// Object.freeze(husky)

// husky.species = '哈士奇'
// console.log(husky.species); // undefined

// husky.name = '咪咪'
// // 修改属性值无效
// console.log(husky.name); // '旺财'

// 不能添加新属性，否则直接报错
// TypeError: Cannot define property length, object is not extensible

// Object.defineProperty(husky, 'length', {
//   value: '100cm',
//   configurable: true,
//   enumerable: true,
//   writable: true,
// })

// 删除属性无效
// console.log(delete husky.color); // false

// 不能修改属性，否则直接报错
// TypeError: Cannot redefine property: color

// Object.defineProperty(husky, 'color', {
//   value: 'green',
//   configurable: true,
//   enumerable: true,
//   writable: true,
// })

// // 冻结一个对象后该对象的原型也不能被修改
// husky.bark = function () {
//   return '喵喵~'
// }

// // 
// console.log(husky.bark()) // 汪汪~

// // 报错
// Object.defineProperty(husky, 'color', {
//   get() {
//     console.log('xxx');
//     return this.color;
//   }
// })

// function fail() {
//   'use strict';
//   husky.name = '哈士奇'; // throws a TypeError
// }

// fail()


// Object.setPrototypeOf(husky, {
//   bark: function () {
//     return '喵喵~';
//   }
// });
// husky.__proto__ = {
//   bark: function () {
//     return '喵喵~';
//   }
// };

// husky.other.country = 'Japan'
// console.log(husky.other.country) // 'Japan'

let colors = ['red', 'green', 'white']

Object.freeze(colors)

colors.push('gray')
colors.includes('gray'); // false

colors[0] = 'black'
colors[0]; // 'red'