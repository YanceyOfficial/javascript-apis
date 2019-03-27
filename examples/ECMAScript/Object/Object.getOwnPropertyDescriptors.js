const obj = {
  firstName: 'Yancey',
  lastName: 'Leo',
  greeting() {
    return `Hello, ${this.firstName}!`;
  },
};

Object.defineProperties(obj, {
  age: {
    value: 18,
    enumerable: false,
  },
  lastName: {
    get() {
      return 'Yancey';
    },
  },
});

obj.__proto__ = {
  somePrototypeKey: 'somrthing...',
};

// console.log(obj.__proto__)

// console.log(Object.getOwnPropertyDescriptors(obj));

// {
//   firstName: {
//     value: 'Yancey',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   lastName: {
//     get: [Function: get],
//     set: undefined,
//     enumerable: true,
//     configurable: true
//   },
//   greeting: {
//     value: [Function: greeting],
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   age: {
//     value: 18,
//     writable: false,
//     enumerable: false,
//     configurable: false
//   }
// }

// 返回所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。
// console.log(Object.getOwnPropertyDescriptors({})); // {}

// const newObj = Object.assign({}, obj);

// console.log(newObj)

// { firstName: 'Yancey',
//   lastName: 'Yancey',
//   greeting: [Function: greeting] }


// assign不会拷贝属性的特性，不可枚举属性也没有被拷贝
// console.log(Object.getOwnPropertyDescriptors(newObj));

// console.log(newObj.__proto__); // {}

// {
//   firstName: {
//     value: 'Yancey',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   lastName: {
//     value: 'Yancey',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   greeting: {
//     value: [Function: greeting],
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }

const newObj = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj),
);

// console.log(Object.getOwnPropertyDescriptors(newObj));

// { firstName: 
//   { value: 'Yancey',
//     writable: true,
//     enumerable: true,
//     configurable: true },
//  lastName: 
//   { get: [Function: get],
//     set: undefined,
//     enumerable: true,
//     configurable: true },
//  greeting: 
//   { value: [Function: greeting],
//     writable: true,
//     enumerable: true,
//     configurable: true },
//  age: 
//   { value: 18,
//     writable: false,
//     enumerable: false,
//     configurable: false } }

console.log(newObj.__proto__); // { somePrototypeKey: 'somrthing...' }