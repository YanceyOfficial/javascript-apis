// const target = {}

// const proxy = new Proxy(target, {})

// // 给代理创建一个 name 属性，它会直接将该操作转发到目标对象。
// proxy.name = 'proxy'

// // 因此 target.name 也是 'proxy'
// console.log(proxy.name) // proxy
// console.log(target.name) // proxy

// // 因为 proxy.name 和 target.name 引用的都是 target.name
// // 因此修改 target.name 导致两者都会发生变化
// target.name = 'target'

// console.log(proxy.name) // target
// console.log(target.name) // target

// const target = {
//   name: 'hello',
// }

// const proxy = new Proxy(target, {
//   set(trapTarget, key, value, receiver) {
//     if (!trapTarget.hasOwnProperty(key)) {
//       if (isNaN(value)) {
//         throw new TypeError('Property must be a number.')
//       }
//     }

//     return Reflect.set(trapTarget, key, value, receiver)
//   },
// })

// proxy.age = 'string'
// proxy.age = 'string'

// const proxy = new Proxy(
//   {},
//   {
//     ownKeys(trapTarget) {
//       return Reflect.ownKeys(trapTarget).filter((key) => {
//         return typeof key !== 'string' || key[0] !== '_'
//       })
//     },
//   },
// )

// proxy.name = 'public property'
// proxy._name = 'private property'
// proxy.age = 18
// proxy[Symbol('symbolName')] = 'symbol property'

// Object.defineProperty(proxy, 'age', {
//   enumerable: false,
// })

// console.log(Object.getOwnPropertyNames(proxy)) // [ 'name', 'age' ]
// console.log(Object.keys(proxy)) // [ 'name' ]
// console.log(Object.getOwnPropertySymbols(proxy)) // [ Symbol(symbolName) ]

const sum = (...arr) => arr.reduce((acc, val) => acc + val, 0)

const proxy = new Proxy(sum, {
  apply(trapTarget, thisArg, argumentsList) {
    const isNotAllNumber = argumentsList.some((val) => typeof val !== 'number')

    if (isNotAllNumber) {
      throw new TypeError('必须是数字类型的数组!')
    }

    return Reflect.apply(trapTarget, thisArg, argumentsList)
  },

  construct(trapTarget, argumentsList, newTarget) {
    throw new TypeError('该函数不能用做构造函数!')
  },
})

// console.log(sum(1, 2, 3, 4)) // 10
// console.log(proxy(1, 2, 'a', 4)) // 报错

// @ts-ignore
console.log(new proxy(1, 2, 'a', 4)) // 报错
