const obj = {
  firstName: 'Yancey',
  lastName: 'Leo',
  greeting() {
    return `Hello, ${this.firstName}!`
  }
};

Object.defineProperties(obj, {
  'age': {
    value: 18,
    enumerable: true,
  },
  lastName: {
    get() {
      return 'Yancey'
    }
  }
})

console.log(Object.getOwnPropertyDescriptor(obj, 'firstName'))

// { value: 'Yancey',
//   writable: true,
//   enumerable: true,
//   configurable: true }

console.log(Object.getOwnPropertyDescriptor(obj, 'lastName'))

// { get: [Function: get],
//   set: undefined,
//   enumerable: true,
//   configurable: true }


console.log(Object.getOwnPropertyDescriptor(obj, 'age'))

// { value: 18,
//   writable: false,
//   enumerable: true,
//   configurable: false }

function Dog(name, color) {
  this.name = name;
  this.color = color;
}

Dog.prototype.bark = function () {
  return '汪汪~'
}

const husky = new Dog('旺财', 'pink')

console.log(Object.getOwnPropertyDescriptor(Dog, 'bark')) // undefined

console.log(Object.getOwnPropertyDescriptor(Dog, 'name'))
// { value: 'Dog',
//   writable: false,
//   enumerable: false,
//   configurable: true }

console.log(Object.getOwnPropertyDescriptor(husky, 'name'))
// { value: '旺财',
//   writable: true,
//   enumerable: true,
//   configurable: true }

