---
id: floor
title: Math.floor/ceil/round()
---

## 语法

```ts
floor(x: number): number;

ceil(x: number): number;

round(x: number): number;
```

## 描述

Math.floor() 用于向下取整，Math.ceil() 用于向上取整。

对于 Math.round()

- 当传入的数字为正数时遵循四舍五入

- 当传入的数字是负数时，如果小数点后面的数字 **小于等于 0.5**，和 Math.ceil() 表现一致，也就是向上取整；如果小数点后面的数字 **大于 0.5**，和 Math.floor() 表现一致，也就是向下取整。换句话说，当小数点后面的数字恰好 **等于 0.5** 时，不是“入”，而是“舍”。

## 示例

```js
Math.floor(); // NaN
Math.floor("yancey"); // NaN

Math.floor(1.5); // 1
Math.floor(1.6); // 1
Math.floor(1.1); // 1
Math.floor(-1.1); // -2
Math.floor(-1.5); // -2
Math.floor(-1.9); // -2

Math.ceil(1.5); // 2
Math.ceil(1.6); // 2
Math.ceil(1.1); // 2
Math.ceil(-1.1); // -1
Math.ceil(-1.5); // -1
Math.ceil(-1.9); // -1
```

Math.round() 在传入的值是负数的情况并不完全遵循“四舍五入”，直接看例子。

```js
Math.round(1.5); // 2
Math.round(1.49); // 1
Math.round(1.51); // 2
Math.round(1.6); // 2
Math.round(1.1); // 1

// 当小数点后面的数字 小于等于 0.5 时，和 Math.ceil() 表现一致，即向上取整
Math.round(-1.1); // -1
Math.round(-1.5); // -1

// 当小数点后面的数字 大于 0.5 时，和 Math.floor() 表现一致，即向下取整
Math.round(-1.51); // -2
Math.round(-1.9); // -2
```
