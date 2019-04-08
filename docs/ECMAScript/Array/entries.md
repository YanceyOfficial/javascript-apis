# entries() <Badge text="ES6"/>

## 语法

```ts
entries(): IterableIterator<[number, T]>;
```

## 描述

方法返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键/值对。

![iterator](/Object.entries.jpg)

## 示例

```js
const arr = [1, 2, 3];
const iterable = arr.entries();

iterable.next(); // {value: [0, 1], done: false}
iterable.next(); // {value: [1, 2], done: false}
iterable.next(); // {value: [2, 3], done: false}
iterable.next(); // {value: undefined, done: true}
```
