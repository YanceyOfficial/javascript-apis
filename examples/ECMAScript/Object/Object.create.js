// TypeError: Property description must be an object: a
// Object.create(cat, 'abc')

// const kitty = Object.create(cat, {
//   name: {
//     value: 'Kitty',
//     writable: false,
//     enumerable: true,
//     configurable: false,

//   },
//   color: {
//     value: 'pink',
//     writable: false,
//     enumerable: true,
//     configurable: false,
//   }
// });

// console.log(Object.getOwnPropertyDescriptors(kitty))

// { name: 
//   { value: 'Kitty',
//     writable: false,
//     enumerable: true,
//     configurable: false },
//  color: 
//   { value: 'pink',
//     writable: false,
//     enumerable: true,
//     configurable: false } }


function Animal(name) {
  this.name = name;
}

Animal.prototype.say = function () {
  return `I'm ${this.name}`;
};

function Cat(name) {
  // 继承属性
  Animal.call(this, name);
}

// 继承方法
Cat.prototype = new Animal();

// use Object.create()

function Cat() {
  // 继承属性
  Animal.call(this);
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;


const persian = new Cat('咪咪');

console.log(persian.name)
console.log(persian.color)