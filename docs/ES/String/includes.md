---
id: includes
title: includes()
---

## 语法

```ts
includes(searchString: string, position?: number): boolean;
```

## 描述

用于判断一个字符串是否包含在另一个字符串中，返回一个 Boolean 类型的值

- `searchString`表示要搜索的字符串

- `position`表示从当前字符串的哪个位置开始搜索字符串，默认值为 0

- 当`positon`小于等于 0 时视为 0

- 当不传递任何参数时恒返回 false

## 示例

```js
const str = "messi";

str.includes("es"); // true
str.includes("leo"); // false
str.includes("me", 3); // false
str.includes("me", -1); // true
str.includes(""); // true
str.includes(); // false
```

## 扩展

在 Firefox 18~39 中该方法的名称为`contains`, 因为[bug 1102219](https://bugzilla.mozilla.org/show_bug.cgi?id=1102219)
的存在，该方法被命名为`includes`.截止当前（2019/03/18）,除 IE 为实现此方法，其他浏览器均已实现。
