---
id: imul
title: Math.imul()
---

## 语法

```ts
imul(x: number, y: number): number;
```

## 描述

接收两个参数，返回类C的32位整数乘法运算的运算结果。

## 示例

```js
Math.imul(2, 4) // 8
Math.imul(-1, 8) // -8
Math.imul(-2, -2) // 4
Math.imul(0xffffffff, 5) //-5
Math.imul(0xfffffffe, 5) //-10
```