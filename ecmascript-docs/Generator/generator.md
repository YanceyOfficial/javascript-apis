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
function* createIterator() {
  yield 1
  yield 2
  yield 3
}

const iterator = createIterator([1, 2, 3])

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: 3, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
console.log(iterator.next()) // { value: undefined, done: true }
```

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

- 第一行没什么可说的, 返回 1
- 第二行没什么可说的, 返回 6
- 注意第三个调用了 throw 方法, 错误在 `let second` 运算之前就被抛出了.
- 下面的所有 next 均不会执行

![实际报错出现在 second 赋值前](/img/docImages/generator1.jpg)

基于此, 我们可以加个 try...catch 来规避.

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
