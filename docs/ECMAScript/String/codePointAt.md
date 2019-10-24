---
id: codePointAt
title: codePointAt()
---

## 语法

```ts
codePointAt(pos: number): number | undefined;
```

## 描述

返回一个 Unicode 编码点值的非负整数。

- 此方法可以正确返回`4字节字符`的 Unicode 编码

- 当参数的取值小于 0 或大于字符串长度时返回`undefined`,而上一节`charCodeAt()`返回`NaN`

- 当传入一个非 Number 类型时，会先尝试被转换成数字。如果能转换成数字，则返回相应索引处的 Unicode 数值；否则返回索引为 0 处的 Unicode 数值（尽量不要这样做）

> 关于字符串长度说明
> 以字符串`𠮷l`为例，它的长度是`3`而非`2`, 因为“𠮷”是一个 4 字节字符。因此在使用`codePointAt()`方法时参数最大可以取到`2`而非`1`.

## 示例

```js
const str = "𠮷l";

str.codePointAt(0); // 134071
str.codePointAt(1); // 57271
str.codePointAt(2); // 108
str.codePointAt(-1); // undefined
```
