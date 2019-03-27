# lastIndexOf()

## 语法

```ts
lastIndexOf(searchString: string, position?: number): number;
```

## 描述

返回`searchString`在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。从该字符串的后面向前查找，从 position 处开始

- `position`默认为`length`

- 如果`position < 0`,被视为 `0`

- 如果`position > length`,被视为 `length`

:::warning 特例
当`searchString`是一个空字符串时：

- `position <= 0` 时返回`0`
- `0 < position <= length` 时返回 `position`
- `position > length` 时返回 `length`
:::

## 示例

```js
const str = 'yancey';

str.lastIndexOf('y'); // 5
str.lastIndexOf('an', 2); // 1
str.lastIndexOf('y', 10); // 5
str.lastIndexOf('y', -1); // 0
```