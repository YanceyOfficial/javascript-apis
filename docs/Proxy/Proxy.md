---
id: proxy
title: Proxy 和 Reflect
---

:::tip
一提到代理，立刻就想到 Fan Qiang. -- 鲁迅
:::

## Why Proxy

我们都知道早期的 Vue 无法监听数组如 `push`, `splice` 的变化, 这是因为 Vue 内核使用的是 [Object.defineProperty()](../Object/defineProperty), 它虽然能劫持数组并为其设置 getter 和 setter, 但调用这些方法改变数组时并不会触发 setter, 虽然尤小右同学做了些 [hack](https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js), 但总有如鲠在喉的感觉. 而万众瞩目的 Vue 3.x 将使用 Proxy 重写内核, 因此还是稍微期待一下的, 虽然我用 React (🤦‍♀️.

## 代理和反射是什么

`Proxy` 就是在访问或操作目标对象之前架设一个拦截对象, 使得 `Proxy` 对象可自定义基本操作的某些行为（如属性查找、赋值、枚举、函数调用等, `Proxy` 接受两个参数, 第一个是**目标对象**, 第二个是**陷阱函数**.

`Reflect` 提供拦截 JavaScript 操作的原生方法, 每个代理陷阱函数都有一个对应的反射方法, 每个方法都与对应的陷阱函数同名, 并且接收的参数也与之一致.

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

上面的例子中, 需要在**写入**对象时做一些拦截, 因此需要代理对象的 `set`, set 陷阱接收四个参数, 分别是:

- trapTarget: 将接收属性的对象, 即目标对象

- key: 需要写入的属性 (key 为 String 或 Symbol 类型)

- value: 需要写入的属性的属性值

- receiver: 操作发生的对象, 一般为代理对象

需求规定不对 target 已存在的属性做校验, 因此可使用 [hasOwnProperty()](../Object/hasOwnProperty) 忽略; 接下来, 使用 isNaN 来判断 value 是否为数字, 如果不是就抛出异常, 否则使用 **Reflect**, 反射的目的是将正确的属性 set 到 target 对象中, 因为我们使用了 **set 陷阱**, 因此也要使用对应的 **Reflect.set()**, 陷阱和反射接收的参数及顺序是一模一样的.

:::tip
这个例子似乎有了表单校验的雏形. 此外, 还可以使用 get 陷阱函数进行对象外形验证, 使用 has 陷阱函数隐藏属性, 使用 deleteProperty 陷阱函数避免属性被删除.
:::

## 原型代理

ES6 新增了两个对象方法, 分别是 [Object.getPrototypeOf()](../Object/getPrototypeOf) 和 [Object.setPrototypeOf()](../Object/setPrototypeOf), 以代替大多数浏览器厂商自行约定的属性 `__proto__`

我们知道, 一个对象的原型, 要么是一个对象, 要么到达原型链的终点, 也就是 null, 其他任何类型都会返回运行时的错误; setPrototypeOf 必须在操作没有成功的情况下返回 false, 这样会让 Object.setPrototypeOf() 抛出错误, 否则认为成功.

对于 getPrototypeOf, 它的陷阱函数接受一个参数:

- trapTarget: 需要设置原型的对象(即代理的目标对象)

对于 setPrototypeOf, 它的陷阱函数接受两个参数:

- trapTarget: 需要设置原型的对象(即代理的目标对象)

- proto: 需用被用作原型的对象

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

与这两个陷阱对应的是 `Reflect.getPrototypeOf()` 和 `Reflect.setPrototypeOf()`, 这两个更加个底层, 操作的是 `[[GetPrototypeOf]]` 与 `[[SetPrototypeOf]]`, 而 `getPrototypeOf` 和 `setPrototypeOf` 显然是更高级的封装.

## 对象可扩展性的陷阱函数

ES5 通过 [Object.preventExtensions()](../Object/preventExtensions) 与 [Object.isExtensible()](../Object/isExtensible) 来判断对象是否可扩展. 这里简单复习下: 前者用于禁止给对象及其原型**添加新属性**, 但不会影响已有属性的**修改**和**删除**; 后者则是判断一个对象是否可扩展.

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

属性描述符的陷阱函数实际上是对 [Object.defineProperty()](../Object/defineProperty) 和 [Object.getOwnPropertyDescriptor()](../Object/getOwnPropertyDescriptor) 的代理, 它可以用来自定义创建属性描述符和查询属性描述符. 下面的例子中, 如果一个对象的 key 是 Symbol 类型, 那么不能为它设置属性描述符.

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

ownKeys 陷阱拦截了内部方法 `[[OwnPropertyKeys]]`, 它允许你返回一个数组用于重写该行为, 被重写的行为可以是 [Object.key()](../Object/keys)、[Object.getOwnPropertyNames()](../Object/getOwnPropertyNames)、[Object.getOwnPropertySymbols()](../Object/getOwnPropertySymbols)、[Object.assign()](../Object/assign). 在 JS 编码习惯中, 一般约定将以**下划线打头**的属性视为私有属性, 下面的例子通过代理过滤掉所有的 “私有属性”:

```ts
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
  enumerable: false, // age 不可枚举
})

// 原生 Object.getOwnPropertyNames() 返回一个包括不可枚举属性, 不包括 Symbol 值作为名称的属性, 不会获取到原型链上的属性的数组.
// 通过代理后, 在原生的基础上过滤掉了私有属性 _name
console.log(Object.getOwnPropertyNames(proxy)) // [ 'name', 'age' ]

// 原生 Object.keys() 返回一个不包括不可枚举属性, 不包括 Symbol 值作为名称的属性, 不会获取到原型链上的属性的数组.
// 通过代理后, 在原生的基础上过滤掉了私有属性 _name
console.log(Object.keys(proxy)) // [ 'name' ]

// 原生 Object.getOwnPropertySymbols() 返回一个包括不可枚举 Symbol 的属性, 不包括普通字符串作为名称的属性, 不会获取到原型链上的 Symbol 属性的数组.
// 当然该方法不能直观的看出是否过滤了 _name, 但本质上该私有属性 _name 已经被过滤了!
console.log(Object.getOwnPropertySymbols(proxy)) // [ Symbol(symbolName) ]
```

:::tip
目前公认的定义私有属性的方式是以下划线打头, 此外也有使用 # 作为私有属性标识符的提案, 当然使用 WeakMap 定义私有变量也是一个可行的方案, 不过都不如 TypeScript 香啊.
:::

## 使用 apply 与 construct 陷阱函数的函数代理

在所有的代理陷阱中, 只有 `apply` 和 `construct` 的代理目标必须是一个函数, 我们知道函数有两个内部方法 `[[Call]]` 和 `[[Construct]]`, 前者会在函数被直接调用时执行, 后者会在使用 new 的时候执行.

当不使用 new 调用一个函数时, apply 陷阱函数会接受以下三个参数:

- trapTarget: 被执行的函数(即代理的目标对象)

- thisArg: 调用过程中函数内部的 this 值

- argumentsList: 被传递给函数的参数数组

当使用 new 创建构造函数的一个实例时, construct 陷阱函数会接受以下两个参数:

- trapTarget: 被执行的函数(即代理的目标对象)

- argumentsList: 被传递给函数的参数数组

Reflect.construct() 方法同样会接收到这两个参数, 还会收到可选的第三参数 newTarget, 如果提供了此参数, 则它就指定了函数内部的 `new.target` 值.

### 验证函数参数的有效性

考虑以下函数, 我们需要限制传递的参数都是数字类型, 因此在代理中做一层拦截, 一旦发现非数字类型的参数就报错; 此外, 该函数也不能被用做构造函数, 因此一旦触发 construct 陷阱亦直接报错.zz

```ts
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

console.log(sum(1, 2, 3, 4)) // 10
console.log(proxy(1, 2, 'a', 4)) // 报错
console.log(new proxy(1, 2, 'a', 4)) // 报错
```

## 可被撤销的代理

