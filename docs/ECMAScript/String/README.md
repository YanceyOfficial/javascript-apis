# 概述

String 全局对象是一个用于字符串或一个字符序列的构造函数，它的最大长度是 `2^53 -1`。字符串的 charAt、charCodeAt、length 等方法针对的都是 UTF16 编码，因此字符串的最大长度，实际上是受字符串的编码长度影响的。

:::tip
现行的字符集国际标准，字符是以 Unicode 的方式表示的，每一个 Unicode 的码点表示一个字符，理论上，Unicode 的范围是无限的。UTF 是 Unicode 的编码方式，规定了码点在计算机中的表示方法，常见的有 UTF16 和 UTF8。 Unicode 的码点通常用 U+??? 来表示，其中 ??? 是十六进制的码点值。 0-65536（U+0000 - U+FFFF）的码点被称为基本字符区域（BMP）。
:::

## 属性

`String.protype.constructor` 用于创造对象的原型对象的特定的函数

`String.prototype.length` 返回字符串的长度

`N` 用于访问第 N 个位置的字符，其中 N 是小于 length 和 0 之间的正整数。这些属性都是“只读”性质，不能编辑

## 构造方法

[String.fromCharCode()](/ECMAScript/String/String.fromCharCode)

[String.fromCodePoint()](/ECMAScript/String/String.fromCodePoint)

## 原型方法

| String.prototype 属性的属性特性 | 值    |
| ------------------------------- | ----- |
| writable                        | false |
| enumerable                      | false |
| configurable                    | false |

[charAt()](/ECMAScript/String/charAt)

[charCodeAt()](/ECMAScript/String/charCodeAt)

[codePointAt()](/ECMAScript/String/codePointAt)

[concat()](/ECMAScript/String/concat)

[normalize()](/ECMAScript/String/normalize)

[padEnd()](/ECMAScript/String/padEnd)

[padStart()](/ECMAScript/String/padStart)

[repeat()](/ECMAScript/String/repeat)

[replace()](/ECMAScript/String/replace)

[slice()](/ECMAScript/String/slice)

[split()](/ECMAScript/String/split)

[substr()](/ECMAScript/String/substr)

[substring()](/ECMAScript/String/substring)

[to...Case()](/ECMAScript/String/to...Case)

[trim()](/ECMAScript/String/trim)

[indexOf()](/ECMAScript/String/indexOf)

[lastIndexOf()](/ECMAScript/String/lastIndexOf)

[match()](/ECMAScript/String/match)

[search()](/ECMAScript/String/search)

[endsWith()](/ECMAScript/String/endsWith)

[includes()](/ECMAScript/String/includes)

[startsWith()](/ECMAScript/String/startsWith)

[localeCompare()](/ECMAScript/String/localeCompare)

:::warning
除上述方外之外，还有一组`HTML wrapper methods`，字符串修饰相关的方法已在 WEB 标准中移除。请尽可能地避免在程序中使用这些方法，因为未来的浏览器可能不再支持。
:::

| 方法      | 描述                                                |
| --------- | --------------------------------------------------- |
| anchor    | 返回<a\>标签包裹的字符串作为锚链接标签，可指定 name |
| big       | 返回<big\>标签包裹的字符串                          |
| blink     | 返回<blink\>标签包裹的字符串                        |
| bold      | 返回<b\>标签包裹的字符串                            |
| fixed     | 返回<tt\>标签包裹的字符串                           |
| fontcolor | 返回<font\>标签包裹的字符串,且可指定 color 属性     |
| fontsize  | 返回<font\>标签包裹的字符串,且可指定 size 属性      |
| italics   | 返回<i\>标签包裹的字符串。                          |
| link      | 返回<a\>标签包裹的字符串,且可指定 href 属性。       |
| small     | 返回<small\>标签包裹的字符串                        |
| strike    | 返回<strike\>标签包裹的字符串                       |
| sub       | 返回<sub\>标签包裹的字符串                          |
| sup       | 返回<sup\>标签包裹的字符串                          |

```js
'锚点'.link('https://yanceyleo.com'); // '<a href="https://yanceyleo.com">锚点</a>'
```
