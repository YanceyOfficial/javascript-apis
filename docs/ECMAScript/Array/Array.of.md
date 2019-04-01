# Array.of() <Badge text="ES6"/>

## 语法

```ts
of<T>(...items: T[]): T[];
```

## 描述

该方法接收任意个参数来创建一个新数组实例。Array.of() 和 Array 构造函数之间的区别在于，当两者的参数仅有一个且为正整数 n 时，Array.of() 会创建一个具有单个元素 n 的数组，而 Array 会创建一个长度为 n 的空数组。

## 示例

Array.of() 和 Array 的区别。

```js
Array.of(3); // [3]
Array(3); // [ , , ,]
```

Array() 的参数如果是数字，它会被当作数组的 length, 因此此数字只能是正整数或 0，以下两个例子全部报错。**Uncaught RangeError: Invalid array length**

```js
Array(-2);
Array(2.4);
```
