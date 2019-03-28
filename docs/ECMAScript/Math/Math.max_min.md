# Math.max/min()

## 语法

```ts
max(...values: number[]): number;

min(...values: number[]): number;
```

## 描述

### Math.max()

传入一个数字序列，返回其中的最大值。

- 只要序列中有一个参数无法被转换成数字，返回 `NaN`

- 当不传入参数时返回 `-Infinity`

### Math.min()

传入一个数字序列，返回其中的最小值。

- 只要序列中有一个参数无法被转换成数字，则会返回 `NaN`

- 当不传入参数时返回 `Infinity`

## 示例

```js
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 'yancey'];

Math.max(...arr1); // 3
Math.max(...arr2); // NaN
Math.max(); // -Infinity

Math.min(...arr1); // 1
Math.min(...arr2); // NaN
Math.min(); // Infinity
```

## 扩展

两个方法均应传入 **数字序列** 而非数组，若要传入数组，可以使用 `apply` 或者 `扩展运算符`。

```js
const arr = [1, 2, 3];

Math.max(1, 2, 3); // 3
Math.max(...arr); // 3
Math.max.apply(null, arr); // 3
```
