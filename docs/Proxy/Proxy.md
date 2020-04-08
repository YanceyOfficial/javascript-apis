---
id: proxy
title: Proxy 和 Reflect
---

:::tip
一提到代理，立刻就想到 Fan Qiang. -- 鲁迅
:::

## Why Proxy?

我们都知道早期的 Vue 无法监听数组的如 `push`, `splice` 的变化, 这是因为 Vue 内核使用的是 [Object.defineProperty](../Object/defineProperty), 它虽然能劫持数组并为其设置 getter 和 setter, 但调用这些方法改变数组时并不会触发 setter, 虽然尤小右同学做了些 [hack](https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js), 但总有如鲠在喉的感觉. 而万众瞩目的 Vue 3.x 将使用 Proxy 重写内核, 因此还是稍微期待一下的, 虽然我用 React (🤦‍♀️.

## 代理和反射是什么

`Proxy` 就是在目标对象之前增加一个拦截, 使得 `Proxy` 对象可定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等, `Proxy` 接受两个参数, 第一个是**目标对象**, 第二个是**陷阱函数**.

`Reflect` 提供拦截 JavaScript 操作的方法, 每个代理陷阱都有一个对应的反射方法, 每个方法都与对应的陷阱函数同名, 并且接收的参数也与之一致.

:::caution
与大多数全局对象不同, Reflect 不是一个构造函数, 因此不能将其与一个 new 运算符一起使用.
:::

| 代理陷阱                | 被重写的行为                                                                                 | 默认行为                          |
| ----------------------- | -------------------------------------------------------------------------------------------- | --------------------------------- |
| get                     | 读取一个属性值                                                                               | Reflect.get()                     |
| set                     | 写入一个属性                                                                                 | Reflect.set()                     |
| has                     | in 操作符                                                                                    | Reflect.has()                     |
| deleteProperty          | delete 操作符                                                                                | Reflect.deleteProperty()          |
| getPropertyOf           | Object.getPropertyOf()                                                                       | Reflect.getPropertyOf()           |
| setPropertyOf           | Object.setPropertyOf()                                                                       | Reflect.setPropertyOf()           |
| isExtensible            | Object.isExtensible()                                                                        | Reflect.isExtensible()            |
| preventExtensions       | Object.preventExtensions()                                                                   | Reflect.preventExtensions()       |
| getOwnPropertyDesciptor | Object.getOwnPropertyDesciptor()                                                             | Reflect.getOwnPropertyDesciptor() |
| defineProperty          | Object.defineProperty()                                                                      | Reflect.defineProperty()          |
| ownKeys                 | Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()、Object.assign() | Reflect.ownKeys()                 |
| apply                   | 调用一个函数                                                                                 | Reflect.apply()                   |
| construct               | 用 new 调用一个函数                                                                          | Reflect.construct()               |

## 小试牛刀

下面的例子中, 给 target 对象创建一个代理对象 proxy, 当 proxy.name 被赋值时, target.name 也同时被创建; 同样地, 当修改 target 是, proxy 也会反映出相应的变化.

:::tip
需要注意的是, 代理对象 proxy 自身并不存储 name, 它只是简单的将值转发给 target 对象.
:::

```ts
const target = {}

const proxy = new Proxy(target, {})

proxy.name = 'proxy'
console.log(proxy.name) // proxy
console.log(target.name) // proxy

target.name = 'target'
console.log(proxy.name) // target
console.log(target.name) // target
```

## 使用 set 陷阱函数验证属性值

通过上面的例子, 我们入门了 Proxy 的基本概念, 但是 Proxy 更强大的地方在于它的第二个参数, 也就是**陷阱函数**. 接下来通过一个 set 陷阱验证属性值的例子来学习: 假设有一个对象, 该对象已经存在的属性的属性值可以是任意类型, 但新增的属性的属性值必须是 Number 类型, 否则将抛出错误. 直接上代码:

```ts
const target = {
  name: 'hello',
}

const proxy = new Proxy(target, {
  set(trapTarget, key, value, receiver) {
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(value)) {
        throw new TypeError('Property must be a number.')
      }
    }

    return Reflect.set(trapTarget, key, value, receiver)
  },
})

proxy.age = 18
proxy.age = 'string' // TypeError: Property must be a number.
```

上面的例子中, 我们给 target 对象创建了一个代理对象, 其中 Proxy 的第二个参数称之为 `陷阱函数`. 因为我们需要在**写入**对象时做一些拦截, 因此需要代理对象的 set, set 接收四个参数, 分别是:

- trapTarget: 将接收属性的对象, 即目标对象

- key: 需要写入的属性 (key 为 String 或 Symbol 类型)

- value: 需要写入的属性的属性值

- receiver: 操作发生的对象, 一般为代理对象

需求规定不对 target 已存在的属性做校验, 因此可使用 [hasOwnProperty](../Object/hasOwnProperty) 忽略; 接下来, 使用 isNaN 来判断 value 是否为数字, 如果不是就抛出异常, 否则使用 **Reflect**. **它的目的将代理的结果反映到真实的 target 中**. 需求使用的 set 陷阱, 因此也要使用对应的 **Reflect.set()**, 它们接收的参数是一模一样的.

:::tip
这个例子似乎有了表单校验库的雏形. 此外, 还可以使用 get 陷阱函数进行对象外形验证, 使用 has 陷阱函数隐藏属性, 使用 deleteProperty 陷阱函数避免属性被删除.
:::

## 原型代理

ES6 新增了两个对象方法, 分别是 [Object.getPrototypeOf](../Object/getPrototypeOf) 和 [Object.setPrototypeOf](../Object/setPrototypeOf), 以代替大多数浏览器厂商自行约定的属性 `__proto__`

我们知道, 一个对象的原型, 要么是一个对象, 要么到达原型链的终点, 也就是 null, 其他任何类型都会返回运行时的错误; setPrototypeOf 必须在操作没有成功的情况下返回 false, 这样会让 Object.setPrototypeOf() 抛出错误, 否则认为成功.

下面的例子通过返回 null 隐藏了代理对象的原型, 并且使得该原型不可被修改.

```ts
let target = {}
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    return null
  },
  setPrototypeOf(trapTarget, proto) {
    return false
  },
})

let targetProto = Object.getPrototypeOf(target)
let proxyProto = Object.getPrototypeOf(proxy)

console.log(targetProto === Object.prototype) // true
console.log(proxyProto === Object.prototype) // false
console.log(proxyProto) // null

Object.setPrototypeOf(target, {}) // 成功
Object.setPrototypeOf(proxy, {}) // 抛出异常
```

与这两个陷阱对应的是 `Reflect.getPrototypeOf` 和 `Reflect.setPrototypeOf`, 这两个更加个底层, 操作的是 `[[GetPrototypeOf]]` 与 `[[SetPrototypeOf]]`, 而 `getPrototypeOf` 和 `setPrototypeOf` 显然是更高级的封装.

## 对象可扩展性的陷阱函数

ES5 通过 [Object.preventExtensions](../Object/preventExtensions) 与 [Object.isExtensible](../Object/isExtensible) 来判断对象是否可扩展. 这里简单复习下: 前者用于禁止给对象及其原型**添加新属性**, 但不会影响已有属性的**修改**和**删除**; 后者则是判断一个对象是否可扩展.

下面的例子本身没有什么意义, 代理仍然返回了 isExtensible 与 preventExtensions 陷阱函数的默认行为. 同原型代理一样, 代理方法仍然要比高层的方法更加的底层, 它对传参的检查更加的底层.

```ts
let target = {}
let proxy = new Proxy(target, {
  isExtensible(trapTarget) {
    return Reflect.isExtensible(trapTarget)
  },
  preventExtensions(trapTarget) {
    return Reflect.preventExtensions(trapTarget)
  },
})

console.log(Object.isExtensible(target)) // true
console.log(Object.isExtensible(proxy)) // true

Object.preventExtensions(proxy)

console.log(Object.isExtensible(target)) // false
console.log(Object.isExtensible(proxy)) // false
```

## 属性描述符的陷阱函数

属性描述符的陷阱函数实际上是对 [Object.defineProperty](../Object/defineProperty) 和 [Object.getOwnPropertyDescriptor](../Object/getOwnPropertyDescriptor) 的代理, 它可以用来自定义创建属性描述符和查询属性描述符. 下面的例子中, 如果一个对象的 key 是 Symbol 类型, 那么不能为它设置属性描述符.

```ts
let proxy = new Proxy(
  {},
  {
    defineProperty(trapTarget, key, descriptor) {
      if (typeof key === 'symbol') {
        return false
      }
      return Reflect.defineProperty(trapTarget, key, descriptor)
    },
  },
)
Object.defineProperty(proxy, 'name', { value: 'proxy' })

console.log(proxy.name) // 'name'

let nameSymbol = Symbol('name')
// 抛出错误
Object.defineProperty(proxy, nameSymbol, {
  value: 'proxy',
})
```

## ownKeys 陷阱函数
