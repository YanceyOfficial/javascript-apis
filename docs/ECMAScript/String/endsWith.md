# endsWith() <Badge text="ES6"/>

## 语法

```ts
endsWith(searchString: string, endPosition?: number): boolean;
```

## 描述

用于判断某字符串是否在给定字符串的结尾，返回一个 Boolean 类型的值。

- 不传入第二个参数时视为字符串的长度

- 当第二个参数为负数时结果恒返回 false

- 当不传入任何参数时恒返回 false

## 示例

```js
const str = 'yanceyleo';

str.endsWith('leo'); // true
str.endsWith('nce', 5); // true
str.endsWith('yan', -1); // false
str.endsWith(); // false
```

### 区分`startsWith()`和`endsWith()`第二个参数

```js
// endsWith()中的第二个参数3，指的是从字符串的前 3 个字符（即yan），判断 an 是否在其末尾
'yanceyleo'.endsWith('an', 3) // true

// startsWith()中的第二个参数3，指从索引为 3 的位置到最后（即ceyleo）,判断 cey 是否在其开头
'yanceyleo'.startsWith('cey', 3) // true
```