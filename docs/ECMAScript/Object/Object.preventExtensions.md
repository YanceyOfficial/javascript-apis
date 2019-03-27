# Object.preventExtensions()

## 语法

```ts
preventExtensions<T>(o: T): T;
```

## 描述

用于将一个对象变得不可扩展，并且返回原对象。简言之，该方法禁止给对象及其原型 `添加新属性`，但不会影响 `修改` 和 `删除`。

## 示例

```js
const obj = {
  firstName: 'Yancey',
  lastName: 'Leo',
  other: {
    hobbies: ['girl'],
  },
  greeting() {
    return `Hello, ${this.firstName}!`;
  },
};

// 因为该方法返回原对象，因此 newObj 和 obj 指向同一个堆
const newObj = Object.preventExtensions(obj);
newObj === obj; // true

// 使用 Object.isExtensible() 方法来判断一个对象是否可被扩展
Object.isExtensible(obj); // false
Object.isSealed(obj); // false
Object.isFrozen(obj); // false
```

该方法不会影响属性的修改和删除。

```js
// 不影响修改
obj.firstName = 'Sayaka';
obj.firstName; // 'Sayaka'

// 不影响删除
delete obj.lastName; // true
obj.lastName; // undefined
```

但新增属性时会失败，在严格模式直接报错，使用 Object.defineProperty() 新增一个属性也会报错。

```js
// 非严格模式下新增一个属性会失败，但不会报错
obj.age = 18;
obj.age; // undefined

// 严格模式下直接报错
// TypeError: Cannot define property age, object is not extensible
function fail() {
  'use strict';
  obj.age = 18;
}
fail();

// 新增属性直接报错
// TypeError: Cannot define property age, object is not extensible
Object.defineProperty(obj, 'age', {
  value: 18,
});

// 可以修改一个既有属性
Object.defineProperty(obj, 'firstName', {
  value: 'Sayaka'
})
obj.firstName; // 'Sayaka'
```

也不能给该对象的原型添加新属性。

```js
// TypeError: #<Object> is not extensible
obj.__proto__ = {
  newKey: 'something...',
};
```

此方法同样适用于数组。

```js
const colors = ['red', 'green', 'white'];

Object.preventExtensions(colors);

// 不能新增
// Uncaught TypeError: Cannot add property 3, object is not extensible
colors.push('black');

// 但可以正常修改
colors[0] = 'black';

// 也可以正常删除
colors.shift();
```

## 扩展

在 ES5 中，如果参数不是一个对象类型，将抛出一个 TypeError 异常。在 ES6+ 中，非对象参数将被视为一个不可扩展的普通对象，因此会被直接返回。

```js
// TypeError: 1 is not an object (ES5)
Object.preventExtensions(1);

// ES6+
Object.preventExtensions(1); // 1
```
