---
id: charCodeAt
title: charCodeAt()
---

## 语法

```ts
charCodeAt(index: number): number;
```

## 描述

返回指定索引处的 Unicode 数值。

- index 为`[0, length - 1]`的整数，若在此范围外返回`NaN`

- 当不传入参数时返回`索引为0处的 Unicode 数值`

- charCodeAt() 总是返回一个小于 65,536 的值，因此不能正确处理`4字节字符`，这种情况下请使用`codePointAt()`

- 当传入一个非 Number 类型时，会先尝试被转换成数字。如果能转换成数字，则返回相应索引处的 Unicode 数值；否则返回索引为 0 处的 Unicode 数值（尽量不要这样做）

## 示例

```js
const twoBytesStr = 'yancey';

const fourBytesStr = '𝌆';

twoBytesStr.charCodeAt(0); // 121
twoBytesStr.charCodeAt(100); // NaN
twoBytesStr.charCodeAt(-1); // NaN
twoBytesStr.charCodeAt(); // 121

// 这是一个错误的Unicode编码，请使用 codePointAt()
fourBytesStr.charCodeAt(0); // 55348

// false被转换成0，因此拿到索引为0处的Unicode编码
twoBytesStr.charCodeAt(false); // 121

// 当无法被转换为数值时，返回索引为0处的Unicode编码
twoBytesStr.charCodeAt({}); // 121
```
