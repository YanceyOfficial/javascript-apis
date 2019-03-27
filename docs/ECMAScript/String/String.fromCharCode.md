# String.fromCharCode()

## 语法

```ts
fromCharCode(...codes: number[]): string;
```

## 描述

返回使用指定的 Unicode 值序列创建的字符串，支持传入数字序列。

- 当传入非数值时，先尝试把它转换成数值，如果不能转换，则返回空字符串（不要这么做）

- 参数不能超过`65536 (2^16)`，当超过这个数值时将返回一个错误的字符

- 可以传入 10 进制数字，也可以传递 16 进制数字，16 进制数字必须带`0x`前缀

## 示例

```js
String.fromCharCode(97, 98, 99); // 'abc'

// 不能正确处理大于65536的Unicode编码
String.fromCharCode(10086); // '❦'

// 字符串"97"能正确被转化成数字97
String.fromCharCode('97'); // 'a'

// 不能被转换成数字返回一个空字符串
String.fromCharCode({}); // ''
```
