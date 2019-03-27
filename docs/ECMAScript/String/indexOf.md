# indexOf()

## 语法

```ts
indexOf(searchString: string, position?: number): number;
```

## 描述

用于返回`searchString`在指定字符串中`初次`出现的索引值，若未找到返回`-1`

- position 为从字符串开始查找的位置的索引值， 默认为 0

- 当 position 小于 0 时视为 0

- 当 position 大于 length-1 时恒返回-1

:::warning 特例
当`searchString`是一个空字符串时：

- `position <= 0` 时返回`0`
- `0 < position <= length` 时返回 `position`
- `position > length` 时返回 `length`

具体实例看下方高亮行。
:::

## 示例

```js{7,8,9}
const str = 'rurula';

str.indexOf('ru'); // 0
str.indexOf('ru', 2); // 2
str.indexOf('ru', 3); // -1
str.indexOf('ru', -1); // 0
str.indexOf('', 0); // 0
str.indexOf('', 1); // 1
str.indexOf('', 10); // 6
```
