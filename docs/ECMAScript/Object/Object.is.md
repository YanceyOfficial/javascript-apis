# Object.is() <Badge text="ES6"/>

## 语法

```ts
is(value1: any, value2: any): boolean;
```

## 描述

用于判断两个值是否相同，返回一个 Boolean 类型的值。

:::tip
该方法和`全等`运算符仅有两个不同。

1. `===`运算符将`-0`和`+0`视为`相等`，而`Object.is(-0, +0)`返回`false`

2. `===`运算符将`NaN`和`NaN`视为`不相等`，而`Object.is(NaN, NaN)`返回`true`

:::

## 示例

```js
// 特例
+0 === -0; // true
Object.is(+0, -0); // fasle

// 特例
NaN === NaN; // fasle
Object.is(NaN, NaN); // true

undefined === undefined; // true
Object.is(undefined, undefined); // true

null === null; // true
Object.is(null, null); // true

true === true; // true
Object.is(false, false); // true

Object.is(window, window); // true
```