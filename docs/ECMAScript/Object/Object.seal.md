# Object.seal()

## 语法

```ts
seal<T>(o: T): T;
```

## 描述

该方法阻止给对象添加 `新属性`，并将全部现有属性设为 `不可配置`。

- 不可配置意味着 **不能删除** 已存在的属性，同时 **不可将数据属性重新定义为访问器属性，也不可将访问器属性重新定义成为数据属性**；

- 特殊地，如果一个属性的值是个 **对象**，则这个对象中的属性 **不会被密封**，除非也给它设置了 **密封**。

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

// 访问器属性
Object.defineProperty(obj, 'age', {
  get() {
    return 18;
  },
});

Object.seal(obj);

Object.isExtensible(obj); // false
Object.isSealed(obj); // true
Object.isExtensible(obj); // false
```

新增属性和删除已有属性会失败，在严格模式下直接报错。

```js
// 不能删除已有属性
delete obj.firstName; // false

// 不能新增属性
obj.newProperty = 'something...';
obj.newProperty; // undefined

// 严格模式下直接报错
function fail() {
  'use strict';

  // Uncaught TypeError: Cannot delete property 'firstName' of #<Object>
  delete obj.firstName;

  // Uncaught TypeError: Cannot add property newProperty, object is not extensible
  obj.newProperty = 'something';
}
fail();
```

不可将数据属性重新定义成为访问器属性，同样也不可将访问器属性重新定义成为数据属性。

```js
// TypeError: Cannot redefine property: lastName
Object.defineProperty(obj, 'lastName', {
  get() {
    return this.lastName;
  },
});

// TypeError: Cannot redefine property: lastName
Object.defineProperty(obj, 'age', {
  value: 18,
});
```

只要属性是可写的，那么它的值可以被修改。

```js
obj.firstName = 'Sayaka';
obj.firstName; // 'Sayaka'
```

特殊地，如果一个属性的值是个 **对象**，则这个对象中的属性不会被密封，除非也给该属性设置了 **密封**。

```js
// 可以成功删除
delete obj.other.hobbies; // true
obj.other.hobbies; // undefined

// 也可以新增
obj.other.newProperty = 'somthing';
obj.other.newProperty; // 'somthing'
```

不会影响从原型链上继承的属性，但 **\_\_proto\_\_** 属性的值也会不能修改。

```js
// TypeError: #<Object> is not extensible
obj.__proto__ = {
  x: 20,
};
```

## 扩展

在 ES5 中，如果参数不是一个对象类型，将抛出一个 TypeError 异常。在 ES6+ 中，非对象参数将被视为已被密封的普通对象，因此会被直接返回。

```js
// TypeError: 1 is not an object (ES5)
Object.seal(1);

// ES6+
Object.seal(1); // 1
```
