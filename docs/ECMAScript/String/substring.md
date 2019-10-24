---
id: substring
title: substring()
---

## 语法

```ts
substring(start: number, end?: number): string;
```

## 描述

根据索引值`start`和`end`返回原字符串的一个子区间，是一个前闭后开 `[start, end)`区间。

- 当不传入参数时，返回原字符串

- 当只有一个参数时，将从这个参数的索引位置一直截取到字符串最后

- 当`start`和`end`相同时返回空字符串

- 当任意一个值为`负数`或者`NaN`时，将被转换为 0

- 当`start`小于`end`时，两者的位置先交换，再截取

## 示例

```js{11}
const str = 'yanceyleo';

str.substring(); // 'yanceyleo'
str.substring(3); // 'ceyleo'
str.substring(3, 5); // 'ce'
str.substring(5, 5); // ''
str.substring(5, 3); // 'ce'
str.substring(-1, 3)); // 'yan'

// 首先-2被转换成0，然后3和0交换，所以下面的例子等价于str.substring(0, 3)
console.log(str.substring(3, -2)); // 'yan'
```
