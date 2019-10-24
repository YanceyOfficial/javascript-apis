// const obj = {
//   firstName: 'Yancey',
// }

// Object.defineProperty(obj, 'lastName', {
//   enumerable: false,
// })

// console.log(obj.propertyIsEnumerable('firstName')); // true
// console.log(obj.propertyIsEnumerable('lastName')); // false

// console.log(obj.propertyIsEnumerable('age')); // false

// const arr = ['abc', 'def'];

// Object.defineProperty(arr, 1, {
//   enumerable: false,
// })

// console.log(arr.propertyIsEnumerable(0)); // true
// console.log(arr.propertyIsEnumerable(1)); // false

function Animal(name) {
  this.name = name;
}

Animal.prototype.say = function () {
  return `I'm ${this.name}`;
};

function Cat(name, color) {
  // 继承属性
  Animal.call(this, name);
  this.color = color;
}

// 继承方法
Cat.prototype = new Animal();

Cat.prototype.bark = function () {
  return '喵';
};

const persian = new Cat('咪咪', 'white');

console.log(persian.propertyIsEnumerable('name')); // true
console.log(persian.propertyIsEnumerable('color')); // true
console.log(persian.propertyIsEnumerable('age')); // false
console.log(persian.propertyIsEnumerable('bark')); // false
console.log(persian.propertyIsEnumerable('say')); // false