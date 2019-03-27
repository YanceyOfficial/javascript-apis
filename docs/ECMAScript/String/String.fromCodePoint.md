# String.fromCodePoint() <Badge text="ES6"/>

## 语法

```ts
fromCodePoint(...codePoints: number[]): string;
```

## 描述

返回使用指定的代码点序列创建的字符串，支持传入数字序列。

- 当不传递参数时返回空字符串

- 不能传递不能被正确转换为数值类型的值

:::danger DANGER
上一篇讲到的`String.fromCharCode()`可以接收一个`非数字类型`的值（虽然不建议这么做），此方法先尝试把它转换成数值（Number(param)），如果不能转换，则返回空字符串。

但是如果给`String.fromCodePoint()`传递一个`非数字类型`的值，并且`这个值不能被正确转换为数值类型（也就是NaN）`，直接报错 `RangeError: Invalid code point NaN`
:::

## 示例

```js
String.fromCodePoint(); // ''
String.fromCodePoint('97'); // 'a'
String.fromCodePoint({}); // RangeError: Invalid code point NaN
String.fromCodePoint(97, 98, 119558); // 'ab𝌆'
```