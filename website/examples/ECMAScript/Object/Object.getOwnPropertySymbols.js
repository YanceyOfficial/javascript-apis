const obj = {
  firstName: 'Yancey',
  [Symbol('lastName')]: 'Leo',
}

Object.defineProperty(obj, Symbol('age'), {
  value: 18,
})

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(lastName), Symbol(age)]


function Dog(name, color) {
  this.name = name;
  this.color = color;
}

Dog.prototype[Symbol('bark')] = function () {
  return '汪汪~'
}

const husky = new Dog('旺财', 'pink');

husky[Symbol('say')] = function () {
  console.log('say something...')
}

console.log(Object.getOwnPropertySymbols(husky)); // [Symbol(say)]