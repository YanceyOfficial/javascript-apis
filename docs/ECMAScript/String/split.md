# split()

## 语法

```ts
split(splitter: { [Symbol.split](string: string, limit?: number): string[]; }, limit?: number): string[];
```

## 描述

根据`splitter`将字符串拆分成数组，`splitter`可以是字符串也可以是正则表达式；第二个参数用于限制返回的数组的长度。

- 如果不传递参数，则返回的数组包含一个由整个字符串组成的元素

- 如果第一个参数为`空字符串`，则按字符串中的每个字符分割

- 第一个参数可以传递一个正则，如果正则没有`捕获`，返回的数组将不包含`分割元素`；否则`捕获`的结果将会包含在数组中

- 第二个参数用于限制返回的数组的长度：

  - 当 limit`大于等于`返回数组的长度时，返回整个数组

  - 当 limit`等于0`时，返回一个空数组

  - 当 limit`为负数`时，返回整个数组

## 示例

```js
const str = 'Més que un Club';

str.split(); // ['Més que un Club']
str.split(''); // ['M', 'é', 's', ' ', 'q', 'u', 'e', ' ', 'u', 'n', ' ', 'C', 'l', 'u', 'b']
str.split(' '); // ['Més', 'que', 'un', 'Club']

// 当正则不包含捕获时，返回的数组将排除捕获到的元素
str.split(/\s*un\s*/); // ['Més que', 'Club']

// 当正则包含捕获时，返回的数组将包含捕获到的元素
str.split(/(\s*un\s*)/); // ['Més que', ' un ', 'Club']

str.split(' ', 1); // ['Més']

// limit为0时恒返回空数组
str.split(' ', 0); // []

// limit为负数时视为 limit = length，将返回整个数组
str.split(' ', -1); // ['Més', 'que', 'un', 'Club']

str.split(' ', 20); // ['Més', 'que', 'un', 'Club']
```
