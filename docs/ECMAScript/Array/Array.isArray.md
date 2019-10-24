---
id: isArray
title: Array.isArray()
---

## 语法

```ts
isArray(arg: any): arg is Array<any>;
```

## 描述

该方法用于判断参数是否为数组。

## 示例

```js
Array.isArray([]); // true
Array.isArray(new Array()); // true
Array.isArray(123); // false
Array.isArray({}); // false
Array.isArray(); // false
```
