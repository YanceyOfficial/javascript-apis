---
id: generator
title: 谈 Generator 与 async/await
---

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

要搞懂函数为何能暂停和恢复, 那首先要了解协程(Coroutine)的概念. 协程是一种比线程更加轻量级的存在. 你可以把协程看成是跑在线程上的任务, 一个线程上可以存在多个协程, 但是在线程上同时只能执行一个协程, 比如当前执行的是 A 协程, 要启动 B 协程, 那么 A 协程就需要将主线程的控制权交给 B 协程. 如果从 A 协程启动 B 协程, 我们就把 A 协程称为 B 协程的父协程.

正如一个进程可以拥有多个线程一样, 一个线程也可以拥有多个协程. 最重要的是, 协程不是被操作系统内核所管理, 而完全是由程序所控制. 带来的好处就是性能得到了很大的提升, 不会像线程切换那样消耗资源.

![5ef98bd693bcd5645e83418b0856e437.webp](https://edge.yancey.app/beg/tofvlavj-1650875423844.webp)

上图表示了这段代码的执行过程:

1. 通过调用生成器函数 genDemo 来创建一个协程 gen, 创建之后, gen 协程并没有立即执行.
2. 要让 gen 协程执行, 需要通过调用 gen.next.
3. 当协程正在执行的时候, 可以通过 yield 关键字来暂停 gen 协程的执行, 并返回主要信息给父协程.
4. 如果协程在执行期间, 遇到了 return 关键字, 那么 JavaScript 引擎会结束当前协程, 并将 return 后面的内容返回给父协程.

gen 协程和父协程是在主线程上交互执行的，并不是并发执行的，它们之前的切换是通过 yield 和 gen.next 来配合完成的.

当在 gen 协程中调用了 yield 方法时，JavaScript 引擎会保存 gen 协程当前的调用栈信息，并恢复父协程的调用栈信息. 同样，当在父协程中执行 gen.next 时，JavaScript 引擎会保存父协程的调用栈信息，并恢复 gen 协程的调用栈信息.

![925f4a9a1c85374352ee93c5e3c41440.webp](https://edge.yancey.app/beg/4eo7an2x-1650881815840.webp)

对于普通函数被调用, 它也会形成执行上下文, 但它是**被**调用的, 所以它会创建一个 caller(调用者), 由于栈是先入后出的, 因此总是立即执行这个 callee 函数的上下文. 因此所有其他上下文都在执行栈上, 而生成器的上下文(多数时间是)在栈的外面.

对于下面的代码, `let tor = foo3();` 看似执行了一次 foo3, 但实际上, 只要你没有调用 `.next()`, 生成器函数体就是没被执行的. 换言之, 生成一个迭代过程, 并将该过程交给了 tor 对象. 因为 tor 是 foo3() 生成器内部迭代过程的一个句柄. 从引擎内的实现过程来说, tor 其实包括状态(state)和执行上下文(context)两个信息, 它是 GeneratorFunction.prototype 的一个实例. 这个 tor 所代表的生成器在创建出来的时候将立即被挂起, 因此状态值(state)初始化置为"启动时挂起(suspendedStart)", 而当在调用 tor.next() 因 yield 运算而导致的挂起称为 **Yield 时挂起(suspendedYield)**.

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

关于这三个迭代器不去多讲, 以前写过 [Object.keys](http://localhost:3000/ecmascript/Object/keys), [Object.values](http://localhost:3000/ecmascript/Object/values), [Object.entries](http://localhost:3000/ecmascript/Object/entries), [Object.fromEntries](http://localhost:3000/ecmascript/Object/fromEntries) 这几个, 你可以参考.

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

![实际报错出现在 second 赋值前](/img/docImages/generator1.jpg)

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

## 迭代器委托
