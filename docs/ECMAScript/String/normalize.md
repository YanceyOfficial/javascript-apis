# normalize() <Badge text="ES6"/>

## 语法

```ts
normalize(form?: string): string;
```

## 描述

此方法会按照指定的一种 Unicode 正规形式将当前字符串正规化。支持四种形式，默认是`NFC`。目前只能传入以下四种字符串，传入其他直接报错。

- NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。

- NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。

- NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize 方法不能识别中文。）

- NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

## 示例

```js
const str = '\u1E9B\u0323';

str.normalize('NFC'); // '\u1E9B\u0323'
str.normalize('NFD'); // '\u017F\u0323\u0307'
```

## 参考

[normalize](http://es6.ruanyifeng.com/#docs/string#normalize)
