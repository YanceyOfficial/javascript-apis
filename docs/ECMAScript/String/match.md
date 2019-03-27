# match()

## 语法

```ts
match(matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null;
```

## 描述

用于检索返回一个字符串匹配正则表达式的的结果。

- 参数是一个`正则表达式`对象，当传入其他数据类型时会`隐式地`使用 `new RegExp(obj)` 将其转换为一个 正则表达式

- 当正则表达式有`i`标志时，大小写会被`忽略`

- 当正则表达式有``g 标志，将直接返回一个包含所有匹配结果的数组（此时不会返回捕获组），匹配不到时返回`null`

- 当正则表达式没有有`g`标志，将返回`第一个`完整匹配，匹配不到时返回`null`

- 当正则表达式包含`捕获`时，会返回所有匹配结果的数组（此时不会返回捕获组），但索引仍然是第一次匹配到的索引

- 当参数不是是`正则表达式`时，它会使用 new RegExp(obj)来隐式转换成一个 RegExp。如果它是一个有正号的正数，RegExp() 方法将忽略正号

## 示例

```js
const str = 'yanceyLEO1';

// 当不传入参数时相当于匹配一个空字符串
str.match(); // ['', index: 0, input: 'yanceyLEO1']

// 当有g标志时，直接返回包含所有匹配结果的数组
// 当有i标志时，会忽略大小写
str.match(/[a-e]/ig); // [ 'a', 'c', 'e', 'E' ]

// 当匹配不到时返回 null
str.match(/[f-h]/ig); // null

// 当没有全局标志时，只返回匹配到的第一个结果的捕获组
str.match(/[a-e]/i); // [ 'a', index: 1, input: 'yanceyLEO1' ]

// 当正则不包含捕获时，只返回第一个匹配到结果的捕获组
str.match(/\s*y\s*/); // [ 'y', index: 0, input: 'yanceyLEO1' ]

// 当正则包含捕获时，会返回所有匹配到的结果，但索引仍返回第一次匹配到的索引值
str.match(/(\s*y\s*)/); // [ 'y', 'y', index: 0, input: 'yanceyLEO1' ]

// 当参数是一个字符串或一个数字，它会使用new RegExp(obj)来隐式转换成一个 RegExp。
// 如果它是一个有正号的正数，RegExp() 方法将忽略正号。
str.match('y'); // ['y', index: 0, input: 'yanceyLEO1']
str.match(+1); // ['1', index: 9, input: 'yanceyLEO1']
str.match(-1); null
```

## 扩展

当正则表达式不包含`g`标志时，`match()` 方法将返回与 `RegExp.exec()` 相同的结果

```js
/[a-e]/i.exec(str); // [ 'a', index: 1, input: 'yanceyLEO1' ]
str.match(/[a-e]/i); // [ 'a', index: 1, input: 'yanceyLEO1' ]
```

`RegExp.test()`可以测试一个字符串是否与一个正则表达式匹配，返回一个 Boolean 类型的值

```js
/[a-e]/i.test(str); // true
```

如果想要获得`捕获组`，并且设置了全局标志，那么需要使用 `RegExp.exec()`，此方法只会返回第一个匹配结果

```js
// match()设置了全局将不会返回捕获组
str.match(/[a-e]/ig); // [ 'a', 'c', 'e', 'E' ]

// RegExp.exec()的正则表达式设置了全局，可以返回一个捕获组，且只会返回第一个匹配结果
/[a-e]/ig.exec(str)) // [ 'a', index: 1, input: 'yanceyLEO1' ]
```
