---
id: charAt
title: charAt()
---

## 语法

```ts
charAt(pos: number): string;
```

## 描述

用于获取一个字符串指定位置的字符。

- 当未传入参数时默认返回索引为 0 处的字符

- 当参数`小于 0`或`大于 length -1`时返回空字符串

- 此方法不能正确处理`4字节字符`

## 示例

```js
const twoBytesStr = 'yancey';

const fourBytesStr = '𝌆';

twoBytesStr.charAt(0); // 'y'
twoBytesStr.charAt(20); // ''
twoBytesStr.charAt(-1); // ''
// 无法正确处理4字节字符
fourBytesStr.charAt(0); // '�'
```

## 扩展

### BMP(Basic Multilingual Plane)字符

JavaScript 使用 `Unicode` 进行字符编码。Unicode 标识符通过`一个明确的名字`和`一个整数`来作为它的`码点/码位(code point)`。比如，“©️” 字符可以用`版权标志`和码位`U+00A9`来表示。

码点/码位为每一个字符提供一个全局唯一的标识符，一个码位映射一个字符，码位值的范围是从 U+0000 到 U+10FFFF，可以表示超过 110 万个符号。

Unicode 字符分为 17 组平面，每个平面拥有 2^16 (65,536) 个码位。每一个码位都可以用 16 进制 xy0000 到 xyFFFF 来表示，这里的 xy 是表示一个 16 进制的值，从 00 到 10。

而`当 xy 是 00(码点范围是从 U+0000 到 U+FFFF)`的时候，也就是 Unicode 最前 2^16 (65,536) 个字符，被称为基本平面 `BMP(Basic Multilingual Plane)`，最常见的字符都在这个平面上，这也是 Unicode 最先定义和最先公布的一个平面。

其余 16 个平面（U+010000 到 U+10FFFF）称为`补充平面(supplementary planes, or astral planes)`，也称之为补充字符，相对于 BMP 字符而言，这些字符称之为非 BMP 字符。要区分是非 BMP 字符很简单：`其码位需要超过 4 位 16 进制表示`

### UTF-16 和 UCS-2

UTF-16 对于 BMP 字符的码位，用 2 个字节进行编码；而非 BMP 字符的码位，用 4 个字节组成`代理对(surrogate pair)`。

关于代理对：前两个字节称为高位代理或者顶部代理，范围在 0xD800 到 0xDBFF 之间；后两个字节称为低位代理或者尾部代理，范围在 0xDC00 到 0xDFFF 之间。

而 UCS(Universal Character Set)，是一个 ISO 标准，UCS-2 用 2 个字节表示 BMP 字符的码点，UCS-2 是一个过时的编码方式，因为它只能编码基本平面 BMP 的码点，在 BMP 字符的编码上，与 UTF-16 是一致的，所以可以认为是 UTF-16 的一个子集。

而 JavaScript 一开始使用的正是`UCS`，所以一些老的 API 是无法处理`4字节字符`，因此 ES6 提供了`codePointAt()`等新的 API，这些后面的篇章说。

### fixedCharAt()

`fixedCharAt()`通过`字符串的索引`来获取相应位置的字符串。

```js
const str = 'fixedCharAt('𝌆ab', 0)'

fixedCharAt(str, 0) // '𝌆'
fixedCharAt(str, 1) // 'a'
fixedCharAt(str, 2) // 'b'
```

```js
function fixedCharAt(str, idx) {
  var ret = '';
  str += '';
  var end = str.length;

  var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  while (surrogatePairs.exec(str) != null) {
    var li = surrogatePairs.lastIndex;
    if (li - 2 < idx) {
      idx++;
    } else {
      break;
    }
  }

  if (idx >= end || idx < 0) {
    return '';
  }

  ret += str.charAt(idx);

  if (
    /[\uD800-\uDBFF]/.test(ret) &&
    /[\uDC00-\uDFFF]/.test(str.charAt(idx + 1))
  ) {
    // Go one further, since one of the "characters" is part of a surrogate pair
    ret += str.charAt(idx + 1);
  }
  return ret;
}
```

## 参考

[JavaScript Unicode 编码那些事](https://objcer.com/2017/05/21/JavaScript-Unicode/)

[每天学点 ES6－字符串](http://cookfront.github.io/2015/06/04/es6-string/)

[Javascript 有个 Unicode 的天坑](http://www.alloyteam.com/2016/12/javascript-has-a-unicode-sinkhole/)
