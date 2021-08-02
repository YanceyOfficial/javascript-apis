const obj = {
  firstName: 'Yancey',
  lastName: 'Leo',
  other: {
    hobbies: ['girl']
  },
  greeting() {
    return `Hello, ${this.firstName}!`
  }
}

Object.defineProperty(obj, 'age', {
  get() {
    return 18;
  }
})

Object.seal(obj);

console.log(delete obj.firstName); // false

// 不可将数据属性重新定义成为访问器属性
// TypeError: Cannot redefine property: lastName
Object.defineProperty(obj, 'lastName', {
  get() {
    return this.lastName;
  }
})

// 同样也不可将访问器属性重新定义成为数据属性
// TypeError: Cannot redefine property: lastName
Object.defineProperty(obj, 'age', {
  value: 18
})

// 只要属性是可写的，它的值仍可以被修改
obj.firstName = 'Sayaka';
console.log(obj.firstName)

// 特殊地，如果一个属性的值是个 对象，则这个对象中的属性 不会被封印，除非它也是个 被封印 的对象
console.log(delete obj.other.hobbies); // true
console.log(obj.other.hobbies); // undefined

obj.other.some = 'somthing'
console.log(obj.other).some; // 'somthing'

// TypeError: #<Object> is not extensible
obj.__proto__ = {
  x: 20
}