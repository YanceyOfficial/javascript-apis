# substr()

## 语法

```ts
substr(from: number, length?: number): string;
```

## 描述

此方法从`from`位置开始向后截取`length`位的字符串。

- 当不传入参数时，返回原字符串

- 可以只传入一个参数，此时将从`from`一直截取到字符串最后

- `from`可以为负数，即从`数组长度 + from`开始截取

- 当`length`小于等于 0 时返回空字符串

::: warning
MDN 官网不建议使用此方法。
:::

## 示例

```js
const str = 'yanceyleo';

str.substr(0); // 'yanceyleo'
str.substr(4); // 'eyleo'
str.substr(4, 3); // 'eyl'
str.substr(4, 10); // 'eyleo'

// 此时from被视为 9-2=7
str.substr(-2, 10); // 'eo'

// 此时from被视为0
str.substr(-100, 10); // 'yanceyleo'
str.substr(10, 1); // ''
str.substr(4, 0); // ''
str.substr(4, -1); // ''
```