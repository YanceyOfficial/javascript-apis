---
id: abs
title: Math.abs()
---

## 语法

```ts
abs(x: number): number;
```

## 描述

返回一个数字的绝对值。

- 传入一个不可转变成数字的值返回 NaN

- 不传入数字返回 NaN

## 示例

```js
Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON; // true

Math.abs(-2); // 2

Math.abs('-1'); // 1

Math.abs(null); // 0

Math.abs(true); // 1

Math.abs(undefined); // NaN

Math.abs('yancey'); // NaN

Math.abs(); // NaN
```
