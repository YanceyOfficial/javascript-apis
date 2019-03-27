// Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组，但不会获取到原型链上的属性

const obj = {
  firstName: 'yancey',
  lastName: 'leo',
  [Symbol('age')]: '18',
  greeting() {
    return `Hello, ${this.firstName}!`
  }
}

// lastName 不可枚举
Object.defineProperty(obj, 'lastName', {
  value: 'leo',
  enumerable: false,
})

// 会返回不可枚举的属性，但不会返回 Symbol值作为名称的属性
console.log(Object.getOwnPropertyNames(obj)); // ['firstName', 'lastName', 'greeting']

// 因为 length 也是数组的一个属性
console.log(Object.getOwnPropertyNames(['a', 'b', 'c'])); // ['0', '1', '2', 'length']

// 该方法不会获取到原型链上的属性，但能获得该对象自身原型上的属性

function Dog(name, color) {
  this.name = name;
  this.color = color;
}

Dog.prototype.bark = function () {
  return '汪汪~'
}

const husky = new Dog('旺财', 'pink');

husky.say = function () {
  console.log('say something...')
}

console.log(Object.getOwnPropertyNames(husky)); // [ 'name', 'color', 'say' ]