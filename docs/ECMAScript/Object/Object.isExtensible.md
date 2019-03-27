# Object.isExtensible()

## 语法

```ts
isExtensible(o: any): boolean;
```

## 描述

用于判断一个对象是否可扩展(即是否可以给它 **添加** 新属性). 当一个对象设置了 `Object.seal()`, `Object.preventExtensions()` 或 `Object.freeze()` , 该对象都可以标记为一个不可扩展对象(non-extensible).

## 示例

```js
// 不可扩展对象是不可扩展的
const non_ExtensibleObj = Object.preventExtensions({});
Object.isExtensible(non_ExtensibleObj); // false

// 密封对象是不可扩展的
const sealedObj = Object.seal({});
Object.isExtensible(sealedObj); // false

// 冻结对象也是不可扩展
const frozen = Object.freeze({});
Object.isExtensible(frozen); // false
```

## 扩展

在 ES5 中，如果参数不是一个对象类型，将抛出一个 TypeError 异常。在 ES6+ 中， non-object 参数将被视为一个不可扩展的普通对象，因此会返回 false.

```js
// TypeError: 1 is not an object (ES5)
Object.isExtensible(1);

// ES6+
Object.isExtensible(1); // false
```
