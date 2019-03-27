# localeCompare()

## 语法

```ts
localeCompare(that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
```

## 描述

返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。

- 当 引用字符串 在 比较字符串 前面时返回 -1

- 当 引用字符串 在 比较字符串 后面时返回 1

- 相同位置时返回 0

:::warning
MDN 上说不能只依赖-1 或者 1 这样的值，因为有些浏览器可能返回-2 或 2 等其他的值。不过作者使用的最新 Chrome 72+都是返回-1，1 或 0
:::

## 示例

```js
'あ'.localeCompare('い'); // -1
'à'.localeCompare('ǎ', 'zh-Hans-CN'); // -1
```

## 参考

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
