---
id: repeat
title: repeat()
---

## 语法

```ts
repeat(count: number): string;
```

## 描述

用于将字符串重复指定的次数。

- 当`count`为 0 或不传入`count`时返回空字符串

- 当`count`为其他数据类型时，先尝试转换为数字，若能转换为数字，则重复相应的次数，否则返回空字符串（不要这样做）

> DANGER
>
> `count`不能为负值，重复次数也必须小于`Number.POSITIVE_INFINITY`，并且返回的长度不能大于字符串的最大长度（2^53 - 1），否则报`RangeError`错误。

## 示例

```js
const str = 'messi';

str.repeat(1); // 'messi'
str.repeat(3); // 'messimessimessi'
str.repeat(0); // ''
str.repeat(); // ''
str.repeat(-1))// RangeError: Invalid count value
str.repeat('dd'); // ''
str.repeat('2'); // 'messimessi'
```
