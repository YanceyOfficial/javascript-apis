---
id: concat
title: concat()
---

## 语法

```ts
concat(...strings: string[]): string;
```

## 描述

用于将一个或多个字符串与原字符串连接合并，并返回一个新的字符串。

- 当不传入参数时返回原字符串

- 当传入其他数据类型参数时会先被转换成字符串再进行合并

## 示例

```js
const str = 'yancey';

str.concat('leo'); // 'yanceyleo'
str.concat(' is', ' best'); // 'yancey is best'
str.concat(true); // 'yanceytrue'
str.concat(); // 'yancey'
```

## 扩展

> WARNING
>
> `concat()`的性能要低于赋值操作符（+ 或 +=），因此优先选择赋值操作符。

```js
let testStr = '';

console.time('useConcat');
for (let i = 0; i < 1000000; i += 1) {
  testStr.concat(Math.random());
}
console.timeEnd('useConcat'); // 350.290ms

console.time('use+=');
for (let i = 0; i < 1000000; i += 1) {
  testStr += 'abc';
}
console.timeEnd('use+='); // 103.233ms
```
