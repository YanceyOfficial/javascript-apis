const obj = {
  name: 'Yancey',
  say() {
    return `Hello, ${this.name}`
  }
}

Object.defineProperties(obj, {
  'name': {
    value: 'Sayaka',
    writable: true,
    enumerable: false,
    configurable: true,
  },
  'age': {
    value: 18,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  'hobby': {
    value: ['music', 'reading', 'soccer'],
    writable: false,
    enumerable: true,
    configurable: true,
  },
})

// 因为 age 的 configurable 设为了 false，所以不会被删除
console.log(delete obj.age) // false

// 只会打印出 say 和 age，因为 name 已经被设置为不可枚举
for (const i in obj) {
  console.log(i) // say age
}

console.log(obj.propertyIsEnumerable('name')) // false

console.log(obj.hobby.splice(0, 1))
console.log(obj) // ['reading', 'soccer']

console.log(obj.hobby = ['eat'])
console.log(obj) // ['reading', 'soccer']