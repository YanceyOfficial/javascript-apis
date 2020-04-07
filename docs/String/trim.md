---
id: trim
title: trim() trimLeft() trimRight()
---

## 语法

```ts
trim(): string;
trimLeft(): string;
trimRight(): string;
```

## 描述

`trim()`用于删除字符串`两侧`的空格

`trimLeft()`用于删除字符串`左侧`的空格

`trimRight()`用于删除字符串`右侧`的空格

> WARNING
>
> 还有两个方法叫做`trimStart()` 和 `trimEnd()`，对标`trimLeft()`和`trimRight()`，在 Chrome 72+ 可以找到，但在 Node 8+ 中没有这两个方法，并且在 [caniuse](https://caniuse.com)
> 中也找不到这两个方法，慎用。

## 示例

```js
const str = ' yancey  '

str.trim() // 'yancey'
str.trimLeft() // 'yancey  '
str.trimRight() // ' yancey'
```
