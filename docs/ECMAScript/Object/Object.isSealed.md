# Object.isSealed()

## 语法

```ts
isSealed(o: any): boolean;
```

## 描述

用于判断一个对象是否被密封。 对于一个 `不可扩展` 的对象，如果它是一个 **空对象** ，那么它是 `被密封` 的；但如果它是个 **非空对象** ，并且里面的属性是 `可配置`的，那么该对象 `不是被密封` 的，因为密封对象的所有自身属性必须是不可配置的。

## 示例

```js
// 不可扩展的空对象是密封的.
const non_ExtensibleEmptyObj = Object.preventExtensions({});
Object.isSealed(non_ExtensibleEmptyObj); // true

// 不可扩展的非空对象不是密封的（因为属性仍是可配置的）
const non_ExtensibleObj = Object.preventExtensions({ name: 'yancey' });
Object.isSealed(non_ExtensibleObj); // false

// 密封对象是密封的.
const sealedObj = Object.seal({});
Object.isSealed(sealedObj); // true

// 冻结对象也是密封的.
const frozen = Object.freeze({});
Object.isSealed(frozen); // true
```

下面这个例子是 **间接** 让一个对象 `被密封`，也就是先将此对象 **不可扩展**，再给每个属性施加 `不可配置`。

```js
const obj = {
  name: 'yancey',
};

// 一个普通的非空对象不是被密封的
Object.isSealed(obj); // false

// 但对该对象施加不可扩展方法
Object.preventExtensions(obj);
// 并使所有属性不可配置
Object.defineProperty(obj, 'name', {
  configurable: false,
});

// 该对象已被密封
Object.isSealed(obj); // true
```

## 扩展

在 ES5 中，如果这个方法的参数不是一个对象（一个原始类型），那么它会导致 TypeError。在 ES6+ 中，非对象参数将被视为是一个密封的普通对象，只返回 true.

```js
// TypeError: 1 is not an object (ES5)
Object.isSealed(1);

// ES6
Object.isSealed(1); // true
```
