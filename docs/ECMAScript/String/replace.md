---
id: replace
title: replace()
---

## 语法

```ts
replace(searchValue: { [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string; }, replacer: (substring: string, ...args: any[]) => string): string;
```

## 描述

返回一个由替换值替换一些或所有匹配的模式后的新字符串。

- 第一个参数（匹配值）可以是`字符串`或者`正则表达式`

- 第二个参数（替换值）可以是`字符串`或者`函数`，其中第二个参数是`字符串`时可以插入一些特殊的值

> tip
> `replace()`方法有四种组合，分别是：
>
> - replace(substr, newSubStr)
>
> - replace(regexp, newSubStr)
>
> - replace(substr, replacer)
>
> - replace(regexp, replacer)

## 示例

> tip
> 以下示例均使用 `const str = 'can you Celebrate'`

### 特殊示例

```js
// 不传入参数时返回原字符串
str.replace(); // 'can you Celebrate'

// 不传入第二个参数，第二个参数被视为 undefined
str.replace("y"); // 'can undefinedou Celebrate'
```

### 当第二个参数是字符串时，可以使用如下表格中的特殊变量

|               变量名               | 代表的值                                                                                                           |
| :--------------------------------: | ------------------------------------------------------------------------------------------------------------------ |
|                \$\$                | 插入一个 "\$"                                                                                                      |
|                \$&                 | 插入匹配的子串                                                                                                     |
| \$` | 插入当前匹配的子串左边的内容 |
|                \$'                 | 插入当前匹配的子串右边的内容                                                                                       |
|                \$n                 | 假如第一个参数是 RegExp 对象，并且 n 是个小于 100 的非负整数，那么插入第 n 个括号匹配的字符串。`注意索引是从1开始` |

```js
str.replace(/[b-c]/gi, "$$"); // '$an you $ele$rate'

str.replace(/[b-c]/gi, "$&★"); // 'c★an you C★eleb★rate'

str.replace(/[b-c]/gi, "$`★"); // '★an you can you ★elecan you Cele★rate'

str.replace(/[b-c]/gi, "$'★"); // 'an you Celebrate★an you elebrate★elerate★rate'

str.replace(/(^\w+).*?(\w+)$/, "$1"); // 'can'
```

### replace(substr, newSubStr)

- 仅用 newSubStr 替换 substr`首次`匹配到的内容，并区分大小写

- 当 substr 是一个`空字符串`时，将在原字符串的`首部`加一个`newSubStr`

- 匹配不到时返回原字符串

```js
// 当第一个参数是字符串时，只替换“首次”匹配到的内容，并区分大小写
str.replace("y", "★"); // '★an you Celebrate'

// 当第一个参数是一个“空字符串”时，会在原字符串首部加上第二个参数
str.replace("", "★"); // '★can you Celebrate'

// 匹配不到时返回原字符串
str.replace("z", "★"); // 'can you Celebrate'
```

### replace(regexp, newSubStr)

- 根据正则匹配将匹配到的值用`newSubStr`替换

- 当正则包含`捕获组`时，可用 $1 $2 \$3...提取

```js
str.replace(/[a-c]/, "★"); // '★an you Celebrate'

str.replace(/[a-c]/gi, "★"); // '★★n you ★ele★r★te'

str.replace(/(^\w+).*?(\w+)$/, "$1 $2"); // 'can Celebrate'
```

### replace(substr, replacer)

## 参考

[String.prototype.replace 高阶技能](http://louiszhai.github.io/2015/12/11/js.replace/)

<style scope>
table th:first-of-type {
	width: 100px;
}
</style>
