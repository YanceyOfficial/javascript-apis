---
id: generator
title: 谈 Generator 与 async/await
---

## 何为迭代器

迭代器是被专用设计用于迭代的对象，带有特定接口. 迭代器有一个 next 方法, 它返回一个对象, 对象的 value 属性是下一个值, done 属性是一个布尔值, 表示迭代是否结束. 我们很容易实现下面的代码, 只需要返回 next 闭包函数, 就可以记住迭代器的状态.

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

