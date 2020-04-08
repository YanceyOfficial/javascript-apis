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

const proxy = new Proxy(
  {},
  {
    ownKeys(trapTarget) {
      return Reflect.ownKeys(trapTarget).filter((key) => {
        return typeof key !== 'string' || key[0] !== '_'
      })
    },
  },
)

proxy.name = 'public property'
proxy._name = 'private property'
proxy.age = 18
proxy[Symbol('symbolName')] = 'symbol property'

Object.defineProperty(proxy, 'age', {
  enumerable: false,
})

console.log(Object.getOwnPropertyNames(proxy)) // [ 'name', 'age' ]
console.log(Object.keys(proxy)) // [ 'name' ]
console.log(Object.getOwnPropertySymbols(proxy)) // [ Symbol(symbolName) ]
