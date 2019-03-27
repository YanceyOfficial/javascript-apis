# Object.isFrozen()

## 语法

```ts
isFrozen(o: any): boolean;
```

## 描述

用于判断一个对象是否被冷冻.

- 一个不可扩展的空对象同时也是一个冻结对象

- 对于一个不可扩展且所有属性为不可配置的非空对象（其实也就是一个密封的对象）
  - 当属性不可写时，此对象为冻结对象
  - 当属性拥有访问器属性，此对象为冻结对象

## 示例

一个不可扩展的空对象同时也是一个冻结对象。

```js
// 不可扩展的空对象是被冻结的
const nonExtensibleEmptyObj = Object.preventExtensions({});
Object.isFrozen(nonExtensibleEmptyObj); // true

// 不可扩展的非空对象不是被冻结的
const nonExtensibleObj = Object.preventExtensions({ name: 'yancey' });
Object.isFrozen(nonExtensibleObj); // false
```

当一个非空对象不可扩展且不可配置（实际就是被密封的），同时它的所有属性是不可写的或者有访问器属性，那么它是被冻结的。

```js
// obj1是不可扩展的，且所有属性不可配置、不可写，所以它是被冷冻的
const obj1 = Object.defineProperty({}, 'name', {
  value: 'yancey',
  configurable: false,
  writable: false,
});
Object.preventExtensions(obj1);
Object.isFrozen(obj1); // true

// obj2是不可扩展的，且所有属性不可配置，且有访问器属性，所以它是被冷冻的
const obj2 = Object.defineProperty({}, 'name', {
  configurable: false,
  get() {
    return 'yancey';
  },
});
Object.preventExtensions(obj2);
Object.isFrozen(obj2); // true
```

一个被密封的空对象是被冻结的。

```js
// 密封的空对象是被冻结的
const sealedEmptyObj = Object.seal({});
Object.isFrozen(sealedEmptyObj); // true

// 密封的非空对象不是被冻结的
const sealedObj = Object.seal({ name: 'yancey' });
Object.isFrozen(sealedObj); // false
```

一个被密封的非空对象，同时它的所有属性是不可写的或者有访问器属性，那么它是被冻结的。

```js
// obj1是密封的、且所有属性不可写，所以它是被冷冻的
const obj1 = Object.seal({
  name: 'yancey',
});
Object.defineProperty(obj1, 'name', {
  writable: false,
});
Object.isFrozen(obj1); // true

// obj2是密封的，且有访问器属性，所以它是被冷冻的
const obj2 = Object.defineProperty({}, 'name', {
  get() {
    return 'yancey';
  },
});
Object.seal(obj2);
Object.isFrozen(obj2); // true
```

冻结对象一定是冻结的。

```js
const frozen = Object.freeze({});
Object.isFrozen(frozen); // true
```

## 扩展

在 ES5 中，如果这个方法的参数不是一个对象（一个原始类型），那么它会导致 TypeError。在 ES6+ 中，非对象参数将被视为是一个冻结的普通对象，只返回 true.

```js
// TypeError: 1 is not an object (ES5)
Object.isFrozen(1);

// ES6
Object.isFrozen(1); // true
```
