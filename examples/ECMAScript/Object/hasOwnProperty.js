const age = Symbol('age');

const obj = {
  firstName: 'yancey',
  [age]: '18',
  greeting() {
    return `Hello, ${this.firstName}!`
  }
}

obj.__proto__ = {
  other: 'something...'
}

// 修改属性描述符不影响该方法的使用
Object.defineProperties(obj, {
  firstName: {
    get() {
      return 'Yancey'
    }
  },
  lastName: {
    value: 'leo',
    configurable: false,
    writable: false,
    enumerable: false,
  }
})

console.log(obj.hasOwnProperty('firstName')); // true
console.log(obj.hasOwnProperty('lastName')); // true
console.log(obj.hasOwnProperty('你xx')); // false
console.log(obj.hasOwnProperty(age)); // true
console.log(obj.hasOwnProperty('greeting')); // true
console.log(obj.hasOwnProperty('other')); // false
console.log('other' in obj); // true