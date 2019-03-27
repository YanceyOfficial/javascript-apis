# Math.abs()

## 语法

```ts
abs(x: number): number;
```

## 描述

用于返回一个数字的绝对值。

- 传入一个不可转变成数字的其他数据类型返回 NaN

- 传入 undefined 返回 NaN (Number(undefined) 为 NaN)

- 传入 null 返回 0 (Number(null) 为 0)

- 不传入数字返回 NaN

## 示例

```js
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true

Math.abs(-2); // 2

Math.abs('-1'); // 1

Math.abs(null); // 0

Math.abs(true); // 1

Math.abs(undefined); // NaN

Math.abs('yancey'); // NaN

Math.abs(); // NaN
```
