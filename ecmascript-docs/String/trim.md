---
id: trim
title: trim() trimStart() trimEnd()
---

## 语法

```ts
trim(): string;
trimStart(): string;
trimEnd(): string;
```

## 描述

`trim()`用于删除字符串`两侧`的空格

`trimStart()`用于删除字符串`左侧`的空格

`trimEnd()`用于删除字符串`右侧`的空格

:::caution
还有两个方法叫做 `trimLeft()` 和 `trimRight()`, 它俩是 `trimStart()` 和 `trimEnd()` 的 alias, MDN 对这两个有介绍, 但 caniuse 搜不到, 因此还是建议用 `trimStart()` 和 `trimEnd()` 叭.
:::

## 示例

```js
const str = ' yan cey  '

str.trim() // 'yan cey'
str.trimStart() // 'yan cey  '
str.trimEnd() // ' yan cey'
```
