---
id: proxy
title: Proxy 和 Reflect
---

:::tip
一提到代理，立刻就想到 Fan Qiang. -- 鲁迅
:::

## Object.defineProperty() 的局限性

谈到 Proxy 就不得不提起它的大前辈 Object.defineProperty(), 我们都知道早期的 Vue 无法监听数组如 `push`, `splice` 等操作, 这是因为 Vue 内核使用了 [Object.defineProperty()](../Object/defineProperty), 它虽然能劫持数组并为其设置 getter 和 setter, 但调用 `push`, `splice` 等操作时却无法触发 setter, 虽然尤小右同学[重写了这些方法](https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js), 但总有如鲠在喉的感觉.

而万众瞩目的 Vue 3.x 将使用 Proxy 重写内核, 最近拿奖拿到手软 [immer.js](https://immerjs.github.io/immer/docs/introduction) 同样是用 Proxy 编写. 当然无论是 Object.defineProperty() 还是 Proxy, 它们都是为了使“元编程”变为可能. 在深入 Proxy 之前, 首先聊一聊 Object.defineProperty() 的局限性.

![描述符可同时具有的键值](/img/docImages/proxyVSdefineProperty.jpeg)

### 拦截方式较少

相比较 Proxy 的 13 种陷阱, Object.defineProperty() 只能对如下属性操作符进行修改.

```ts
interface PropertyDescriptor {
  configurable?: boolean
  enumerable?: boolean
  value?: any
  writable?: boolean
  get?(): any
  set?(v: any): void
}
```

### 无法一次性监听对象的所有属性

Object.defineProperty() 只能通过遍历(或递归)的方式处理对象中的每个属性, 而 Proxy 直接代理整个对象.

```ts
const obj = {
  name: 'Yancey',
  age: 18,
}

Object.keys(obj).forEach((key) => {
  Object.defineProperty(obj, key, {
    enumerable: false,
  })
})
```

### 无法监听新增属性

上面的代码仅仅是对 `name` 和 `age` 做了不可枚举的处理, 如果新增一个属性, 它仍然是可以枚举的, 如果你写过 Vue, 相信你对 `Vue.set()` 一定不陌生.

```ts
obj.hobby = 'eat'
console.log(obj.propertyIsEnumerable('hobby')) // true
```

### 无法监听 push, splice 等数组方法

上面已经谈到了原因, 这里不再赘述, Vue 通过重写这些原型方法来达到可监听的目的:

```ts
import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
```

### 兼容性

除了万恶的 IE 和早期浏览器, Proxy 都可以在项目中完美使用, 而 Object.defineProperty() 出自 ES5, 几乎现存浏览器都可以使用. 很多库也给出了兼容方案, 即高级浏览器使用 Proxy, 低级浏览器回退为 Object.defineProperty().

## 什么是代理和反射

`Proxy` 就是在访问或操作目标对象之前架设一个拦截对象, 使得 `Proxy` 对象可自定义基本操作的某些行为（如属性查找、赋值、枚举、函数调用等, `Proxy` 接受两个参数, 第一个是**目标对象**, 第二个是**陷阱函数**.

`Reflect` 提供拦截 JavaScript 操作的原生方法, 每个代理陷阱函数都有一个对应的反射方法, 每个方法都与对应的陷阱函数同名, 并且接收的参数也与之一致.

:::caution
与大多数全局对象不同, Reflect 不是一个构造函数, 因此不能将其与一个 new 运算符一起使用(类似的还有 Math).
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

下面的例子中, 给 target 对象创建一个代理对象 proxy, 当 proxy.name 被赋值时, target.name 也同时被创建; 同样地, 当修改 target 时, proxy 也会反映出相应的变化.

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

Proxy 更强大的地方在于它的第二个参数, 也就是**陷阱函数**. 接下来通过一个 set 陷阱验证属性值的例子来学习: 假设有一个对象, 该对象已经存在的属性的属性值可以是任意类型, 但新增的属性的属性值必须是 Number 类型, 否则将抛出错误. 直接上代码:

```ts
const validationSchema = {
  name: {
    validate(value) {
      return value.length > 6
    },
    message: '用户名长度不能小于6',
  },
  password: {
    validate(value) {
      return value.length > 10
    },
    message: '密码长度不能小于10',
  },
  moblie: {
    validate(value) {
      return /^1\d{10}$/.test(value)
    },
    message: '手机号格式错误',
  },
}

function validator(obj, validationSchema) {
  return new Proxy(obj, {
    set(trapTarget, key, value) {
      const validator = validationSchema[key]
      if (!validator) {
        trapTarget[key] = value
      } else if (validator.validate(value)) {
        trapTarget[key] = value
      } else {
        console.log(validator.message || '')
      }
    },
  })
}

const form = validator(form, validationSchema)
form.name = '666' // 报错
form.password = '113123123123123'
```

上面的例子中, 需要在**写入**对象时做一些拦截, 因此需要代理对象的 `set`, set 陷阱接收四个参数, 分别是:

- trapTarget: 将接收属性的对象, 即目标对象

- key: 需要写入的属性 (key 为 String 或 Symbol 类型)

- value: 需要写入的属性的属性值

- receiver: 操作发生的对象, 一般为代理对象

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

下面的例子本身没有什么意义, 代理仍然返回了 isExtensible 与 preventExtensions 陷阱函数的默认行为. 同原型代理一样, 代理方法仍然要比高层的方法更加的底层, 它对传参的检查更加的严格.

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

考虑以下函数, 我们需要限制传递的参数都是数字类型, 因此在代理中做一层拦截, 一旦发现非数字类型的参数就抛出错误; 此外, 该函数也不能被用做构造函数, 因此一旦触发 construct 陷阱亦直接抛出错误.zz

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
console.log(proxy(1, 2, 'a', 4)) // 抛出错误
console.log(new proxy(1, 2, 'a', 4)) // 抛出错误
```

## 可被撤销的代理

上面所有的例子, 一旦创建了代理, 就不能再从目标对象上被解绑. 如果我们想在某些时候删除掉代理对象, 就可以使用**可被撤销的代理**.

```ts
let target = {
  name: 'target',
}

// 创建一个可被撤销的代理
let { proxy, revoke } = Proxy.revocable(target, {
  // your trap
})

console.log(proxy.name) // 'target'

revoke() // 代理被撤销
console.log(proxy.name) // 抛出错误
```

## 参考

[ES6 Proxy 可以做哪些有意思的事情？](https://mp.weixin.qq.com/s/Z3_AfTy84h-ojhljnQJqIg)
