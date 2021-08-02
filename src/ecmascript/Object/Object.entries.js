/* function Animal(name) {
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

// console.log(husky.name); // '咪咪'
// console.log(husky.color); // 'white'
// console.log(husky.say()); // 'I'm 咪咪'
// console.log(husky.bark()); // '喵'

console.log(Object.entries(husky))
// [ [ 'name', '咪咪' ], [ 'color', 'white' ] ]

for (const i in husky) {
  console.log(i)
}
// name
// color
// bark
// say */


const obj = {
  firstName: 'yancey',
  lastName: 'leo',
  [Symbol('age')]: '18',
  greeting() {
    return `Hello, ${this.firstName}!`
  }
}

Object.defineProperty(obj, 'lastName', {
  value: 'leo',
  enumerable: false,
})

console.log(Object.entries(obj))
// [['firstName', 'yancey'], ['greeting', [Function: greeting]]]

for (const i in obj) {
  console.log(i)
}

// firstName
// greeting