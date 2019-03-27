// const obj = {
//   firstName: 'yancey',
//   lastName: 'leo',
//   [Symbol('age')]: '18',
//   greeting() {
//     return `Hello, ${this.firstName}!`
//   }
// }

// // lastName 不可枚举
// Object.defineProperty(obj, 'lastName', {
//   value: 'leo',
//   enumerable: false,
// })


// for (const key in obj) {
//   console.log(key); // 依次打印出 firstName greeting
// }

// console.log('- - - - - - - - - -');

// console.log(Object.keys(obj)); // [ 'firstName', 'greeting' ]

// console.log('- - - - - - - - - -');

// for (const key of Object.keys(obj)) {
//   console.log(key); // 依次打印出 firstName greeting
// }

// console.log('- - - - - - - - - -');

// Object.keys(obj).map(key => console.log(key)); // 依次打印出 firstName greeting

function Animal(name) {
  this.name = name;
}

Animal.prototype.say = function () {
  return `I'm ${this.name}`
}

function Dog(name, color) {
  // 继承属性
  Animal.call(this, name);
  this.color = color;
}

// 继承方法
Dog.prototype = new Animal();

Dog.prototype.bark = function () {
  return '喵'
}

const husky = new Dog('咪咪', 'white');

console.log(husky.name); // '咪咪'
console.log(husky.color); // 'white'
console.log(husky.say()); // 'I'm 咪咪'
console.log(husky.bark()); // '喵'

console.log(Object.keys(husky))
// [ 'name', 'color' ]

for (const i in husky) {
  console.log(i)
}
// name
// color
// bark
// say