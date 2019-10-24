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

console.log(Cat.prototype.isPrototypeOf(persian)); // true
console.log(Animal.prototype.isPrototypeOf(persian)); // true
console.log(Object.prototype.isPrototypeOf(persian)); // true


console.log(Animal.prototype.isPrototypeOf(Cat.prototype));

console.log(persian instanceof Cat); // true
console.log(persian instanceof Animal); // true
console.log(persian instanceof Object); // true

console.log(Cat.prototype instanceof Animal); // true