# Math.sign() <Badge text="ES6"/>

## 语法

```ts
sign(x: number): number;
```

## 描述

返回一个数字的符号, 指示数字是正数，负数还是零。此函数共有 5 种返回值, 分别是 1, -1, 0, -0, NaN. 代表的各是正数, 负数, 正零, 负零, NaN。

## 示例

```js
Math.sign(3);     //  1
Math.sign(-3);    // -1
Math.sign('-3');  // -1
Math.sign(0);     //  0
Math.sign(-0);    // -0
Math.sign(NaN);   // NaN
Math.sign('foo'); // NaN
Math.sign();      // NaN
```
