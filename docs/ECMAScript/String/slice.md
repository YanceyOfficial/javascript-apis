# slice()

## 语法

```ts
slice(start?: number, end?: number): string;
```

## 描述

根据索引值`start`和`end`返回原字符串的一个子区间，是一个前闭后开 `[start, end)`区间。

- 当不传入任何参数时返回原数组

- 当传入一个参数，并且此参数大于数组的长度，将返回空字符串

- 支持`负数`索引，不会像`substring()`将负数转换为0

:::tip
要注意此方法和`substring()`的区别:

- `substring()`遇到负数会转换为`0`,而`slice()`支持负索引
- `substring()`在 start 大于 end 时两者会交换，而`slice()`在此情况下直接返回空字符串
  :::

## 示例

```js
const str = 'yanceyleo';

str.slice(); // 'yanceyleo'
str.slice(1); // 'anceyleo'
str.slice(100); // ''
str.slice(-2); // 'eo'
str.slice(1, 2); // 'a'
str.slice(-1, -2); // ''
str.slice(-2, -1); // 'e'
```
