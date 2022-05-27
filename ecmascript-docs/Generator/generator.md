---
id: generator
title: 谈 Generator 与 async / await
---

> 生成器在日常开发中似乎并不受待见, 除了耳熟能详的 Symbol.iterator, redux-saga, 曾经大名鼎鼎的 co 模块, 以及 react-scheduler 放弃使用生成器, 转而使用 postMessage 的消息, 其他情况我们用到的机会很少. 但这不妨碍它是个伟大的设计, 因为基于它和 Promise, 有了我们不可获取的 async / await. 这篇文章我们来了解生成器的语法, 协程, 以及 async / await.

## 何为迭代器

迭代器是被专用设计用于迭代的对象, 带有特定接口. 迭代器有一个 next 方法, 它返回一个对象, 对象的 value 属性是下一个值, done 属性是一个布尔值, 表示迭代是否结束. 我们很容易实现下面的代码, 只需要返回 next 闭包函数, 就可以记住迭代器的状态.

```ts
function createIterator(items) {
  let i = 0
  return {
    next() {
      const done = i >= items.length
      const value = !done ? items[i++] : undefined

      return {
        done: done,
        value: value,
      }
    },
  }
}

const iterator = createIterator([1, 2, 3])

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: 3, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
console.log(iterator.next()) // { value: undefined, done: true }
```

## 何为生成器

上面的代码多少有些复杂, 为此 ES6 提供了一种新的语法, 称为生成器. 生成器是一个函数, 它返回一个迭代器. 生成器的写法与迭代器的写法相似, 只是在函数名后面加上了 \* 号.

```ts
function* genDemo() {
  console.log('开始执行第一段')
  yield 'generator 2'

  console.log('开始执行第二段')
  yield 'generator 2'

  console.log('开始执行第三段')
  yield 'generator 2'

  console.log('执行结束')
  return 'generator 2'
}

console.log('main 0')
let gen = genDemo()
console.log(gen.next().value)
console.log('main 1')
console.log(gen.next().value)
console.log('main 2')
console.log(gen.next().value)
console.log('main 3')
console.log(gen.next().value)
console.log('main 4')

// main 0
// 开始执行第一段
// generator 2
// main 1
// 开始执行第二段
// generator 2
// main 2
// 开始执行第三段
// generator 2
// main 3
// 执行结束
// generator 2
// main 4
```

## 生成器与协程

要搞懂函数为何能暂停和恢复, 那首先要了解协程(Coroutine)的概念. 协程是一种比线程更加轻量级的存在. 你可以把协程看成是跑在线程上的任务, 一个线程上可以存在多个协程, 但是在线程上同时只能执行一个协程, 比如当前执行的是 A 协程, 要启动 B 协程, 那么 A 协程就需要将主线程的控制权交给 B 协程. 如果从 A 协程启动 B 协程, 我们就把 A 协程称为 B 协程的父协程.

正如一个进程可以拥有多个线程一样, 一个线程也可以拥有多个协程. 最重要的是, 协程不是被操作系统内核所管理, 而完全是由程序所控制. 带来的好处就是性能得到了很大的提升, 不会像线程切换那样消耗资源.

![生成器执行过程](https://edge.yancey.app/beg/tofvlavj-1650875423844.webp)

上图表示了这段代码的执行过程:

1. 通过调用生成器函数 genDemo 来创建一个协程 gen, 创建之后, gen 协程并没有立即执行.
2. 要让 gen 协程执行, 需要通过调用 gen.next.
3. 当协程正在执行的时候, 可以通过 yield 关键字来暂停 gen 协程的执行, 并返回主要信息给父协程.
4. 如果协程在执行期间, 遇到了 return 关键字, 那么 JavaScript 引擎会结束当前协程, 并将 return 后面的内容返回给父协程.

## 生成器与调用栈

gen 协程和父协程是在主线程上交互执行的, 并不是并发执行的, 它们之前的切换是通过 yield 和 gen.next 来配合完成的.

当在 gen 协程中调用了 yield 方法时, JavaScript 引擎会保存 gen 协程当前的调用栈信息, 并恢复父协程的调用栈信息. 同样, 当在父协程中执行 gen.next 时, JavaScript 引擎会保存父协程的调用栈信息, 并恢复 gen 协程的调用栈信息.

![生成器与调用栈](https://edge.yancey.app/beg/4eo7an2x-1650881815840.webp)

对于普通函数被调用, 它也会形成执行上下文, 但它是**被**调用的, 所以它会创建一个 caller(调用者), 由于栈是先入后出的, 因此总是立即执行这个 callee 函数的上下文. 因此所有其他上下文都在执行栈上, 而生成器的上下文(多数时间是)在栈的外面.

比如 `let tor = foo3();` 看似执行了一次 foo3, 但实际上, 只要你没有调用 `.next()`, 生成器函数体就是没被执行的. 换言之, 生成一个迭代过程, 并将该过程交给了 tor 对象. 因为 tor 是 foo3() 生成器内部迭代过程的一个句柄. 从引擎内的实现过程来说, tor 其实包括状态(state)和执行上下文(context)两个信息, 它是 GeneratorFunction.prototype 的一个实例. 这个 tor 所代表的生成器在创建出来的时候将立即被挂起, 因此状态值(state)初始化置为"启动时挂起(suspendedStart)", 而当在调用 tor.next() 因 yield 运算而导致的挂起称为 **Yield 时挂起(suspendedYield)**.

## 可迭代对象

可迭代对象(iterable)是包含 `Symbol.iterator` 属性的对象, 像字符串, 数组, Map, Set, NodeList 都是可迭代对象. 可迭代对象可与 for-of 循环配合使用. for-of 循环在循环每次执行时会调用可迭代对象的 next() 方法, 并将结果对象的 value 值存储在一个变量上. 循环过程会持续到结果对象的 done 属性变成 true 为止.

你可以手动访问一个可迭代对象的迭代器:

```ts
const values = [1, 2, 3]
const iterator = values[Symbol.iterator]()

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: 3, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
console.log(iterator.next()) // { value: undefined, done: true }
```

开发者自定义对象默认情况下不是可迭代对象, 但你可以亲自指挥, 亲自部署, 创建一个包含生成器的 Symbol.iterator 属性, 让它们成为可迭代对象.

```ts
let collection = {
  items: [1, 2, 3],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item
    }
  },
}

for (let x of collection) {
  console.log(x)
}
```

## 集合的迭代器

数组, Map 与 Set 都拥有如下三种迭代器:

- entries(): 返回一个包含键值对的迭代器;
- values(): 返回一个包含集合中的值的迭代器;
- keys(): 返回一个包含集合中的键的迭代器.

关于这三个迭代器不去多讲, 以前写过 [Object.keys](https://js.yanceyleo.com/ecmascript/Object/keys), [Object.values](https://js.yanceyleo.com/ecmascript/Object/values), [Object.entries](https://js.yanceyleo.com/ecmascript/Object/entries), [Object.fromEntries](https://js.yanceyleo.com/ecmascript/Object/fromEntries) 这几个, 你可以参考.

```ts
let data = new Map()
data.set('title', 'Understanding ES6')
data.set('format', 'ebook')

for (let entry of data.entries()) {
  console.log(entry)
  // ['title', 'Understanding ES6']
  // ['format', 'ebook']
}

for (let value of data.values()) {
  console.log(value)
  // 'Understanding ES6'
  // 'ebook'
}

for (let key of data.keys()) {
  console.log(key)
  // title
  // format
}
```

## 迭代器高级功能

迭代器对象除了有 next 方法, 它还支持 throw 和 return 方法, 同时它还支持委托, 下面让我们一一认识认识.

### 传递参数给迭代器

我们知道 next 方法可以用来执行下一个 yield 语句, 但该方法还可以传递参数, 当一个参数被传递给 next() 方法时, 该参数就会成为生成器内部 yield 语句的值. 可以下面这个例子:

- 第一次 next 虽然传递了 100, 但因为第一句是没有上文的, 因此参数无效, 返回 1.
- 第二次 next 虽然传递了 4, 但因为压根没用到, 遂返回 2.
- 第三次 next 传递了 5 和 3, 它就代替了 first 和 second 参数, 因此返回 12

需要注意的是, 虽然 `yield first + second + 3` 这一行, first 和 second 的值来自 next 传递的参数, 似乎跟上面两句的 `let first = yield 1` 和 `let second = yield 2` 无关, 但如果你不先声明这两个变量, 就会报错 `ReferenceError: second is not defined`.

```ts
function* createIterator() {
  let first = yield 1
  let second = yield 2
  let third = yield first + second + 3
}

let iterator = createIterator()

console.log(iterator.next(100)) // { value: 1, done: false }
console.log(iterator.next(4)) // { value: 2, done: false }
console.log(iterator.next(5, 3)) // { value: 12, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

### 在迭代器中抛出错误

除了在 next 方法中传入一个值, 还可以使用 throw 方法抛出一个异常.

```ts
function* createIterator() {
  let first = yield 1
  let second = yield first + 2
  yield second + 3
  yield 'finally'
}

let iterator = createIterator()

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next(4)) // { value: 6, done: false }
console.log(iterator.throw(new Error('Boom'))) // 从生成器中抛出了错误
console.log(iterator.next()) // 不再执行
```

- 第一个 yield 没什么可说的, 返回 1
- 第二行没什么可说的, 返回 6
- 注意第三个调用了 throw 方法, 错误在 `let second` 运算之前就被抛出了, 也就是说上面的 `yield first + 2` 正常执行了, 返回 6, 但赋值给变量 second 的操作凉凉了.
- 下面的所有 next 均不会执行

![实际报错出现在 second 赋值前](https://edge.yancey.app/beg/abdc7iwy-1653687591858.jpg)

基于此, 我们可以加个 try...catch.

- 第一个 yield 没什么可说的, 返回 1
- 第二个 yield, 即 `yield first + 2`, 由于我们在 next 传递了 first 是 4, 所以这句返回 6
- 但紧接着我们调用了 throw 方法, 一般情况下程序就直接崩了, 好在我们加了 try...catch, second 赋值的操作就走到了 catch 里, 即 second 被赋值成了 7, 但有趣的是, 代码会继续执行到下一个 yield 处并返回了下一个值, 也就是 10
- 之后就执行完了, 都会返回 `{ value: undefined, done: true }`

```ts
function* createIterator() {
  let first = yield 1
  let second
  try {
    second = yield first + 2
  } catch (ex) {
    second = 7
  }
  yield second + 3
}

let iterator = createIterator()

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next(4)) // { value: 6, done: false }
console.log(iterator.throw(new Error('Boom'))) // { value: 10, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

### 在迭代器中返回

由于生成器是函数, 你可以在它内部使用 return 语句, 既可以让生成器早一点退出执行, 也可以指定在 next() 方法最后一次调用时的返回值.

```ts
function* createIterator() {
  yield 1
  return
  yield 2
  yield 3
}

let iterator = createIterator()

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

当然你也可以 return 一个值, 比如下面的例子, return 语句返回 42, 会进入到第二次的 next 方法中, 之后便将返回 undefiend.

```ts
function* createIterator() {
  yield 1
  return 42
}

let iterator = createIterator()

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 42, done: true }
console.log(iterator.next()) // { value: undefined, done: true }
```

### 生成器委托

在某些情况下，将两个迭代器的值合并在一起会更有用。生成器可以用星号配合 yield 这一特殊形式来委托其他的迭代器。

```ts
function* createNumberIterator() {
  yield 1
  yield 2
}

function* createColorIterator() {
  yield 'red'
  yield 'green'
}

function* createCombinedIterator() {
  yield* createNumberIterator()
  yield* createColorIterator()
  yield true
}

const iterator = createCombinedIterator()
console.log(iterator.next()) // "{ value: 1, done: false }"
console.log(iterator.next()) // "{ value: 2, done: false }"
console.log(iterator.next()) // "{ value: "red", done: false }"
console.log(iterator.next()) // "{ value: "green", done: false }"
console.log(iterator.next()) // "{ value: true, done: false }"
console.log(iterator.next()) // "{ value: undefined, done: true }"
```

当然生成器配合上返回是很重要的例子, 比如下面代码, createNumberIterator 返回的 3 继续被 createRepeatingIterator 使用, 换成一个现实的例子就是等待一个网络接口 fetch1 返回 3, 然后紧接着将 3 作为 fetch2 的参数, 继续串行执行异步函数.

```ts
function* createNumberIterator() {
  yield 1
  yield 2
  return 3
}

function* createRepeatingIterator(count) {
  for (let i = 0; i < count; i++) {
    yield 'repeat'
  }
}

function* createCombinedIterator() {
  let result = yield* createNumberIterator()
  yield* createRepeatingIterator(result)
}

const iterator = createCombinedIterator()
console.log(iterator.next()) // "{ value: 1, done: false }"
console.log(iterator.next()) // "{ value: 2, done: false }"
console.log(iterator.next()) // "{ value: "repeat", done: false }"
console.log(iterator.next()) // "{ value: "repeat", done: false }"
console.log(iterator.next()) // "{ value: "repeat", done: false }"
console.log(iterator.next()) // "{ value: undefined, done: true }"
```

## 当生成器遇上 Promise

迭代器最令人兴奋的莫过于可以精细控制异步逻辑. 我们设想一个例子, 假设有个异步函数 getUserID 用来获取用户 ID, 获取成功后立即调用另一个异步函数 getUserName, 获取成功后返回用户名.

如今我们来看这个例子, 相信你一定会选择 Promise 抑或 async/await, 哪怕是异步回调, 不过这次我们用生成器的方式.

让我们来分析这个过程, 由于 getUserID() 和 getUserName() 都是异步请求, 如果要实现这种线性的编码方式, 那么一个可行的方案就是执行到异步请求的时候, 暂停当前函数, 等异步请求返回了结果, 再恢复该函数. 因此:

执行到 getUserID() 时暂停 getResult 函数, 然后浏览器在后台处理实际的请求过程, 待 ID 数据返回时, 再来恢复 getResult 函数. 接下来再执行 getUserName 来获取到用户名, 由于 getUserName() 也是一个异步请求, 所以在使用 getUserName() 的同时, 依然需要暂停 getResult 函数的执行, 等到 getUserName() 返回了用户名数据, 再恢复 getResult 函数的执行, 最终 getUserName() 函数返回了 name 信息.

![当生成器遇上 Promise](https://edge.yancey.app/beg/wc05elvl-1653488802950.webp)

因此, 这套体系的关键就是实现函数**暂停执行**和**函数恢复执行**, 而生成器就是为了实现暂停函数和恢复函数而设计的. 我们可以写下如下代码:

```ts
function* getResult() {
  const userIdRes = yield fetch('/id')
  const { id } = yield userIdRes.json()

  const userNameRes = yield fetch('/name', { id })
  const { name } = yield userNameRes.json()

  console.log(name)
}

const gen = getResult()

gen
  .next()
  .value.then((response) => gen.next(response).value)
  .then((response) => gen.next(response).value)
  .then((response) => gen.next(response).value)
  .then((response) => gen.next(response).value)
```

可见我们在生成器函数 getResult 中写入各种异步函数, 然后在外面依次使用一段代码来控制生成器的暂停和恢复执行. 通常, 我们把执行生成器的代码封装成一个函数, 这个函数驱动了 getResult 函数继续往下执行, 我们把这个执行生成器代码的函数称为**执行器**, 比如著名的 [co](https://github.com/tj/co) 工具就是干这事的.

```ts
co(getResult())
```

## async / await

通过上面的代码我们看出, 使用生成器可以很好的实现"看起来"像同步的异步代码, 不过生成器依然需要使用额外的 co 函数来驱动生成器函数的执行, 这是比较麻烦的. 而 Generator + Promise 又有一套固定的模型, 且这两个组合基本涵盖了 JavaScript 大部分异步场景. 基于此, ES7 引入了 async / await 的语法糖, 这是 JavaScript 异步编程的一个重大改进, 它改进了生成器的缺点, 提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力.

```ts
async function getResult() {
  const userIdRes = await fetch('/id')
  const { id } = await userIdRes.json()

  const userNameRes = await fetch('/name', { id })
  const { name } = await userNameRes.json()

  console.log(name)
}
```

我们将上面生成器的代码改成 async / await 的形式, 虽然这种方式看起来像是同步代码, 但是实际上它又是异步执行的, 也就是说, 在执行到 await fetch 的时候, 整个函数会暂停等待 fetch 的执行结果, 等到函数返回时, 再恢复该函数, 然后继续往下执行. 而它背后的秘密**就是 Promise 和生成器应用, 往底层说, 就是微任务和协程应用**.

根据 MDN 定义, async 是一个通过**异步执行并隐式返回 Promise 作为结果的函数**. 即如果在 async 函数里面使用了 await, 那么此时 async 函数就会暂停执行, 并等待合适的时机来恢复执行, 所以说 async 是一个异步执行的函数. 那么暂停之后, 什么时机恢复 async 函数的执行呢?

通常, await 可以等待两种类型的表达式:

- 可以是任何普通表达式;
- 也可以是一个 Promise 对象的表达式.

如果 await 等待的是一个 Promise 对象, 它就会暂停执行生成器函数, 直到 Promise 对象的状态变成 resolve, 才会恢复执行, 然后得到 resolve 的值, 作为 await 表达式的运算结果. 如果使用 await 等待一个没有 resolve 的 Promise, 那么这也就意味着, async 指向的函数会一直等待下去, 比如下面这个例子:

```ts
function NeverResolvePromise() {
  return new Promise((resolve, reject) => {})
}
async function getResult() {
  let a = await NeverResolvePromise()
  console.log(a)
}
getResult()
console.log(0)
```

和生成器函数一样, 使用了 async 声明的函数在执行时, 也是一个单独的协程, 我们可以使用 await 来暂停该协程, 由于 await 等待的是一个 Promise 对象, 我们可以 resolve 来恢复该协程. 比如下面这段代码:

```ts
function HaveResolvePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100)
    }, 0)
  })
}
async function getResult() {
  console.log(1)
  let a = await HaveResolvePromise()
  console.log(a)
  console.log(2)
}
console.log(0)
getResult()
console.log(3)
```

当然, 如果 await 等待的是一个非 Promise 对象, 比如 await 100, 那么 V8 会隐式地将 await 后面的 100 包装成一个已经 resolve 的对象. 以下面这段代码为例:

```ts
async function foo() {
  console.log(1)
  let a = await 100
  console.log(a)
  console.log(2)
}
console.log(0)
foo()
console.log(3)
```

首先, 执行 `console.log(0)` 这个语句, 打印出来 0.

紧接着就是执行 foo 函数, 由于 foo 函数是被 async 标记过的, 所以当进入该函数的时候, JavaScript 引擎会保存当前的调用栈等信息, 然后执行 foo 函数中的 `console.log(1)` 语句, 并打印出 1.

然后当执行到 `await 100` 时会创建一个隐式的 Promise 对象. 在这个 promise\_ 对象创建的过程中, 我们可以看到在 executor 函数中调用了 resolve 函数, JavaScript 引擎会将该任务提交给微任务队列.

```ts
let promise_ = new Promise((resolve, reject) => {
  resolve(100)
})
```

然后 JavaScript 引擎会暂停当前协程的执行, 将主线程的控制权转交给父协程执行, 同时会将 promise\_ 对象返回给父协程. 主线程的控制权已经交给父协程了, 这时候父协程要做的一件事是调用 `promise_.then` 来监控 promise 状态的改变.

接下来继续执行父协程的流程, 这里我们执行 `console.log(3)`, 并打印出来 3. 随后父协程将执行结束, 在结束之前, 会进入微任务的检查点, 然后执行微任务队列, 微任务队列中有 `resolve(100)` 的任务等待执行, 执行到这里的时候, 会触发 `promise_.then` 中的回调函数, 如下所示:

```ts
promise_.then((value) => {
  //回调函数被激活后
  //将主线程控制权交给 foo 协程, 并将 vaule 值传给协程
})
```

该回调函数被激活以后, 会将主线程的控制权交给 foo 函数的协程, 并同时将 value 值传给该协程.

foo 协程激活之后, 会把刚才的 value 值赋给了变量 a, 然后 foo 协程继续执行后续语句, 执行完成之后, 将控制权归还给父协程.

![async/await 执行流程](https://edge.yancey.app/beg/esbotezn-1653687216081.webp)
