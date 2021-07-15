---
id: promise
title: Promise
---

> 相比于回调函数, Promise 解决了 “回调地狱” 和 “信任问题” 等痛点, 并且大大提高了代码的可读性. 在现代前端开发中, Promise 几乎成了处理异步的首选(虽然还有更方便的 async/await, 逃). 这篇文章从 Promise 的思想和运行机制入手, 深入理解每个 API, 最后手写一个遵循 Promise/A+ 规范的 Promise 来.

## 异步方式

JavaScript 异步方式共有有下面六种.

- 事件监听

- 回调函数

- 发布/订阅

- Promise

- 生成器

- async/await

## 回调函数

面试中被问到 `回调函数` 有什么缺点, 相信你一定不假思索地回答 `回调地狱`. 的确如此, 当我们需要发送多个异步请求, 并且每个请求之间需要相互依赖时, 就会产生回调地狱.

前段时间写了一个天气微信小程序 [Natsuha](https://github.com/YanceyOfficial/Natsuha-Weather), 它获取天气的逻辑大致如下(当然真实场景复杂的多).

- 首先要获取用户的经纬度 (接口 A)

- 根据经纬度反查城市 (接口 B)

- 根据城市拿到相应的天气信息 (接口 C)

按照回调的方式去处理这个逻辑, 大致会写成下面的样子：

```js
ajax(A, () => {
  // 获取经纬度
  ajax(B, () => {
    // 根据经纬度反查城市
    ajax(C, () => {
      // 根据城市获取天气信息
    })
  })
})
```

看起来很丑陋不是吗？相信大家对回调函数的缺点大致都了解, 这里就不展开, 只做个总结.

- 代码逻辑书写顺序与执行顺序不一致, 不利于阅读与维护.

- 异步操作的顺序变更时, 需要大规模的代码重构.

- 回调函数基本都是匿名函数, bug 追踪困难.

- 回调函数是被第三方库代码(如上例中的 ajax )而非自己的业务代码所调用的, 造成了控制反转(IoC).

简单谈一谈 `控制反转`, 《你不知道的 JavaScript (中卷)》把回调函数的最大缺点归结为 `信任问题`. 例子中 ajax 是一个三方的函数(你完全可以把它想象成 jQuery 的 \$.ajax()), 我们把自己的业务逻辑, 也就是将回调函数 `交给了` ajax 去处理. 但 ajax 对我们来说仅仅是一个黑盒, 如果 ajax 本身有缺陷的话, 我们的回调函数就处于危险之中, 这也就是所谓的“信任问题”.

不过 Promise 的出现解决了这些缺点, 它能够把控制反转再反转回来. 这样的话, 我们可以不把自己程序的传给第三方, 而是让第三方给我们提供了解其任务何时结束的能力, 进而由我们自己的代码来决定下一步做什么.

## 何为 Promise

《你不知道的 JavaScript (中卷)》举了一个例子：

我在快餐店点了一个汉堡, 并支付了 1.07 美金. 这意味着我对某个值(汉堡)发出了请求.

接着收银员给我一张 `取餐单据`, 它保证了我最终会得到汉堡, 因此 `取餐单据` 就是一个 `承诺`.

在等待取餐的过程中, 我可以做点其他的事情, 比如刷刷推特, 看看 [996.icu](https://github.com/996icu/996.ICU) 今天又涨了多少 star. 之所以我可做点儿其他的事情, 是因为 `取餐单据` 代表了我 `未来的` 汉堡. 它在某种意义上已经成了汉堡的 `占位符`. 从本质上来讲, 这个 `占位符` 使得这个值不再依赖时间, 这是一个 `未来值`.

终于, 我听到服务员在喊 `250号前来取餐`, 我就可以拿着 `取餐单据` 换我的汉堡了.

但是可能还有另一种结果, 在我去取餐时, 服务员充满抱歉的告诉我汉堡已经售罄了, 除了愤怒, 我们还可以看到 `未来值` 可能成功, 也可能失败.

## Promise 基础知识

### Promise 的生命周期

每个 Promise 都会经历一个短暂的生命周期：先是处于 `进行中 (pending)`, 此时操作尚未完成, 因此它也是 `未处理 (unsettled)` 的；一旦异步操作执行结束, Promise 变成 `已处理 (settled)` 状态, 此时它会进入到以下两个状态中的其中一个：

- Fulfilled：Promise 异步操作成功完成

- Rejected：由于程序错误或其他原因, 异步操作未能成功完成

### Promise 构造函数

Promise 本身是一个构造函数, 它接收一个叫做 `executor` 的函数, 该函数会被传递两个名为 `resolve()` 和 `reject()` 的函数作为参数. `resolve()` 函数在执行器成功时被调用, 而 `reject()` 在执行器操作失败后被调用. 看下面这个例子.

```js
const fs = require('fs')

const promise = (path) =>
  // 执行器接收 resolve() 和 reject() 作为参数
  new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/' + path, 'utf-8', (err, data) => {
      if (err) {
        // 失败时调用 reject()
        reject(err)
        return
      }
      // 成功时时调用 resolve()
      resolve(data)
    })
  })
```

### Promise 的 then 方法

then() 方法接收两个函数作为参数, 第一个作为 `完成` 时的回调, 第二个作为 `拒绝` 时的回调. 两个参数均为可选, 因此你可以只监听 `完成`, 或者只监听 `拒绝`. 其中当第一个参数为 `null`, 第二个参数为回调函数时, 它意味着监听 `拒绝`. 在实际应用中, `完成` 和 `拒绝` 都应当被监听.

```js
const promise = new Promise((resolve, reject) => {
  resolve('success')
})

// 监听完成和拒绝
promise.then(
  (res) => {
    // 完成
    console.log(res)
  },
  (e) => {
    // 拒绝
    console.log(e)
  },
)

// 只监听完成
promise.then((res) => {
  console.log(res)
})

// 第一个参数为 null 时意味着拒绝
promise.then(null, (res) => {
  // 完成
  console.log(res)
})
```

Promise 还有两个方法分别是 `catch()` 和 `finally()`, 前者用于监听 `拒绝`, 后者无论成功失败都会被执行到. 链式调用显然可读性更高, 所以我们推荐下面这种写法.

```js
promise
  .then((res) => {
    console.log(res)
  })
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    console.log('无论成功失败都会执行这句')
  })
```

## Promise 链式调用

每次调用 then() 或 catch() 方法时都会 `创建并返回一个新的 Promise`, 只有当前一个 Promise 完成或被拒绝后, 下一个才会被解决.

看下面这个例子, p.then() 完成后返回第二个 Promise, 接着又调用了它的 then() 方法, 也就是说只有当第一个 Promise 被解决之后才会调用第二个 then() 方法的 `then()`.

```js
let p = new Promise((resolve, reject) => {
  resolve(42)
})

p.then((value) => {
  console.log(value) // 42
}).then(() => {
  console.log('可以执行到') // '可以执行到'
})
```

将上述示例拆开, 看起来是这样的. 调用 p1.then() 的结果被存储到 p2 中, p2.then() 被调用来添加最终的 `then()`.

```js
let p1 = new Promise((resolve, reject) => {
  resolve(42)
})

let p2 = p1.then((value) => {
  console.log(value)
})

p2.then(() => {
  console.log('可以执行到')
})
```

我们通过一个实例来看一下链式调用. 下面是获取城市天气的场景：我们首先需要调用 `getCity` 接口来获取 `城市id`, 接着调用 `getWeatherById/城市id` 来获取城市的天气信息. 首先用 Promise 封装一个原生 Ajax. (敲黑板, 面试可能要求手写)

```js
const getJSON = function (url) {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if (this.readyState !== 4) {
        return
      }
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    const client = new XMLHttpRequest()
    client.open('GET', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()
  })

  return promise
}

const baseUrl = 'https://5cb322936ce9ce00145bf070.mockapi.io/api/v1'
```

通过链式调用来请求数据, 最后别忘了捕获错误.

```js
getJSON(`${baseUrl}/getCity`)
  .then((value) => getJSON(`${baseUrl}/getWeatherById/${value.cityId}`))
  .then((value) => console.log(value))
  .catch((e) => {
    console.log(e)
  })
```

### 捕获错误

当 then() 方法或者 catch() 方法抛出错误时, 链式调用的下一个 Promise 中的 catch() 方法可以通过 `catch()` 接收这个错误. 侧面来讲, 异常不一定只发生在 Promise 中, 还有可能发生在 `then()` 或者 `catch()` 中.

```js
let p1 = new Promise((resolve, reject) => {
  resolve(42)
})

p1.then((value) => {
  throw new Error(' `then()` 错误')
}).catch((e) => {
  console.log(e.message) // ' `then()` 错误'
})
```

不仅 `then()` 可以抛出异常, `catch()` 也可以抛出的异常, 且可以被下一个 `catch()` 捕获. 因此, 无论如何都应该在 Promise 链的末尾留一个 `catch()` , 以保证能够正确处理所有可能发生的错误. 看下面这个例子.

```js
let p1 = new Promise((resolve, reject) => {
  throw new Error('执行器错误')
})

p1.catch((e) => {
  console.log(e.message) // '执行器错误'
  throw new Error(' `catch()` 错误')
}).catch((e) => {
  console.log(e.message) // ' `catch()` 错误'
})
```

### Promise 链的返回值

Promise 链的一个重要特性是能从一个 Promise 传递数据给下一个 Promise, 通过完成处理函数的返回值, 来将数据沿着一个链传递下去. 我们看下面这个例子.

```js
function task() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('task')
    }, 1000)
  })
}

task()
  .then((res) => {
    console.log(res)
    return 'taskB'
  })
  .then((res) => {
    console.log(res)
    return 'taskC'
  })
  .then((res) => {
    console.log(res)
    throw new Error()
  })
  .catch((e) => {
    console.log(e)
    return 'taskD'
  })
  .then((res) => {
    console.log(res)
  })
```

![运行结果](/img/docImages/promise.jpg)

运行结果如上图所示. 我们知道, 每次调用 then() 或者 catch() 都会返回一个新的 Promise 实例, 通过指定处理函数的返回值, 可以沿着一个链继续传递数据.

因此第一个 then() 将 'taskB' 作为下一个 then() 的参数传递下去, 同样第二个 then() 将 'taskC' 作为第三个 then() 的参数传递下去.

而第三个 then() 里面抛出一个异常, 上面说到处理函数中的抛出异常一定会被后面的拒绝处理函数捕获, 所以 catch() 里能够打印出上一个 then() 的错误.

别忘了 catch() 返回 'taskD' 也可以被最后一个 then() 捕获.

## 其他构造方法

### Promise.resolve() 和 Promise.reject()

Promise.resolve() 和 Promise.reject() 类似于快捷方式, 用来创建一个 `已完成` 或 `已被拒绝` 的 promise. 此外, Promise.resolve() 还能接受非 Promise 的 `thenable` 的作为参数, 也就是所谓 `拥有 then 方法的对象`.

```js
// p1 和 p2 等价
const p1 = new Promise((resolve, reject) => {
  reject('Oops')
})

const p2 = Promise.reject('Oops')

// p3 和 p4 等价
const p3 = new Promise((resolve, reject) => {
  resolve('Oops')
})

const p4 = Promise.resolve('Oops')
```

而对于 Promise.resolve(), 它还能接收一个非 Promise 的 `thenable` 作为参数. 它可以创建一个已完成的 Promise, 也可以创建一个以拒绝的 Promise.

```js
let thenable1 = {
  then(resolve, reject) {
    resolve(1)
  },
}

let p1 = Promise.resolve(thenable1)

p1.then((value) => console.log(value)) // 1

let thenable2 = {
  then(resolve, reject) {
    reject(1)
  },
}

let p2 = Promise.resolve(thenable2)

p2.catch((reason) => console.log(reason)) // 1
```

### Promise.all()

该方法接收单个迭代对象(最常见的就是数组)作为参数, 并返回一个 Promise. 这个可迭代对象的元素都是 Promise, 只有在它们都被解决, 所返回的 Promise 才会被解决.

- 当所有的 Promise 均为完成态, 将会返回一个包含所有结果的数组.

- 只要有一个被拒绝, 就不会返回数组, 只会返回最先被拒绝的那个 Promise 的原因

```js
let p1 = new Promise((resolve, reject) => {
  resolve(42)
})
let p2 = new Promise((resolve, reject) => {
  reject(43)
})
let p3 = new Promise((resolve, reject) => {
  reject(44)
})

let p4 = new Promise((resolve, reject) => {
  resolve(45)
})

// 全部完成, 返回数组
let p5 = Promise.all([p1, p4])
p5.then((value) => console.log(value)) // [42, 45]

// 只要有一个出错, 就不会返回数组, 且只会返回最先被拒绝的那个 Promise 的原因
let p6 = Promise.all([p1, p2, p3, p4])
p6.catch((value) => console.log(value)) // 43
```

### Promise.race()

该方法同样接收单个迭代对象(最常见的就是数组)作为参数, 不同的是, 该方法只要检测到任意一个被解决或拒绝, 该方法就会做出响应. 因此一个有趣的例子是把 `请求接口` 和一个 `setTimeout` 进行竞逐, 如果 `setTimeout` 先做出响应, 就证明这个接口请求超时.

```js
const p = Promise.race([
  fetch('/some-api'),
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('请求超时')), 3000)
  }),
])

p.then((value) => {
  console.log(value)
}).catch((reason) => {
  console.log(reason)
})
```

### Promise.any()

Promise.any() 接收一个 Promise 可迭代对象, 只要其中的一个 promise 成功, 就返回那个已经成功的 promise. 如果可迭代对象中没有一个 promise 成功(即所有的 promises 都失败/拒绝), 就返回一个失败的 promise 和 AggregateError 类型的实例. 本质上, 它与 Promise.all() 相反.

```ts
const pErr = new Promise((resolve, reject) => {
  reject('总是失败')
})

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, '最终完成')
})

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, '很快完成')
})

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value) // 很快完成
})
```

### Promise.allSettled()

它方法返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise, 并带有一个对象数组, 每个对象表示对应的 promise 结果. 与 Promise.all() 相比, 只要所有的 promise 都完成即可, 不关心成功还是失败.

```ts
const promise1 = Promise.resolve(3)
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, 'foo'),
)
const promises = [promise1, promise2]

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status)),
)
```

## Promise 的局限性

看起来 Promise 很美好, 解决了回调函数的种种问题, 但它也有自己的局限性.

- 一旦创建一个 Promise 并为其注册完成/拒绝处理函数, Promise 将无法被取消.

- 当处于 pending 状态时, 你无法得知当前进展到哪一块

- 因为 Promise 只能被决议一次(完成或拒绝), 如果某些事件不断发生, stream 模式会更合适.

- 如果不设置回调函数, Promise 内部抛出的错误, 不会反应到外部.
