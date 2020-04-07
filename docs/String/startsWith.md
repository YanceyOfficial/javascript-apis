---
id: startsWith
title: startsWith()
---

## 语法

```ts
startsWith(searchString: string, position?: number): boolean;
```

## 描述

用于判断某字符串是否在给定字符串的首部，返回一个 Boolean 类型的值

- 不传入第二个参数时默认视为 0

- 当第二个参数为负数时视为 0

- 当不传入任何参数时恒返回 false

## 示例

```js
const str = 'yanceyleo';

str.startsWith('yan'); // true
str.startsWith('nce', 2); // true
str.startsWith('yan', -1); // true
str.startsWith('yan', 1); // false
str.startsWith(); // false
```
