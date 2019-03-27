# search()

## 语法

```ts
search(searcher: { [Symbol.search](string: string): number; }): number;
```

## 描述

用于返回正则表达式在字符串中`首次匹配项的索引`，匹配不到返回`-1`.

- 该方法类似于`indexOf()`，都是返回`初次匹配的索引值`，不同的是`indexOf()`传入一个字符串，而`search()`传入一个正则表达式

- 该方法效率比`match()`高

- `match()`不关注传入的正则表达式是否带有`g符号`或`捕获`，返回的的结果没有区别

- 当参数不是是`正则表达式`时，它会使用 new RegExp(obj)来隐式转换成一个 RegExp。如果它是一个有正号的正数，RegExp() 方法将忽略正号

- 当不传入参数时，返回0

## 示例

```js
const str = 'yanceyLEO1';

str.search(); // 0
str.search(/[a-e]/gi); // 1
str.search(/[a-e]/i); // 1
str.search(/(\s*y\s*)/); // 0
str.search(/\s*y\s*/); // 0
```