---
id: to...Case
title: to...Case()
---

## 语法

```ts
toLowerCase(): string;

toUpperCase(): string;

toLocaleLowerCase(): string;

toLocaleUpperCase(): string;
```

## 描述

用于将指定字符串（根据本地化）全部大写（小写）。

## 示例

```js
const str = "Yancey Leo";

str.toLowerCase(); // 'yancey leo'
str.toUpperCase(); // 'YANCEY LEO'
str.toLocaleLowerCase(); // 'yancey leo'
str.toLocaleUpperCase(); // 'YANCEY LEO'
```

## 扩展

### 可以尝试使用 css 替代

```css
text-transform: uppercase | lowercase | capitalize;
```

### 每个单词的首字母大写

```ts
const capitalize = (str: string): string => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
};

capitalize("yancey leo"); // 'Yancey Leo'
```
