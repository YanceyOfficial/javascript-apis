---
id: getOwnPropertyDescriptors
title: Object.getOwnPropertyDescriptors()
---

## 语法

```ts
getOwnPropertyDescriptors<T>(o: T): {[P in keyof T]: TypedPropertyDescriptor<T[P]>} & { [x: string]: PropertyDescriptor };
```

## 描述

用来获取一个对象所有自有属性的描述符，如果没有任何自身属性，则返回空对象。

## 示例

下面的代码创建一个 obj 对象，该对象有三个属性 firstName, lastName, age 和一个方法 greeting. 其中 lastName 被重定义成访问器属性，age 属性不可写、不可配置、不可枚举。

```js
const obj = {
  firstName: 'Yancey',
  lastName: 'Leo',
  greeting() {
    return `Hello, ${this.firstName}!`
  },
}

Object.defineProperties(obj, {
  age: {
    value: 18,
    enumerable: false,
  },
  lastName: {
    get() {
      return 'Yancey'
    },
  },
})

obj.__proto__ = {
  somePrototypeKey: 'somrthing...',
}
```

通过 Object.getOwnPropertyDescriptors() 可获取一个对象所有自有属性的描述符，但不会输出原型上的属性。

> TIP
>
> 观察下面代码，我们很容易看出 Object.getOwnPropertyDescriptors() 的返回值其实就是 Object.defineProperties() 的 **第二个参数**。

```js
Object.getOwnPropertyDescriptors(obj);

// 输出如下：
{
  firstName: {
    value: 'Yancey',
    writable: true,
    enumerable: true,
    configurable: true
  },
  lastName: {
    get: [Function: get],
    set: undefined,
    enumerable: true,
    configurable: true
  },
  greeting: {
    value: [Function: greeting],
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: {
    value: 18,
    writable: false,
    enumerable: false,
    configurable: false
  }
}
```

如果没有任何自身属性，则返回空对象。

```js
Object.getOwnPropertyDescriptors({}) // {}
```

## 扩展

### 解决 Object.assign() 浅拷贝问题

Object.assign() 浅拷贝一个对象时存在以下问题：

- 只能拷贝源对象的可枚举的自身属性

- 无法拷贝属性的特性们

- 访问器属性会被转换成数据属性

- 无法拷贝源对象的原型

我们仍然使用 obj 对象，并使用 Object.assign() 克隆出一个新的对象。

```js
const newObj = Object.assign({}, obj);

Object.getOwnPropertyDescriptors(newObj);
// 输出：
{
  firstName: {
    value: 'Yancey',
    writable: true,
    enumerable: true,
    configurable: true
  },
  // lastName 从访问器属性变成了数据属性
  lastName: {
    value: 'Yancey',
    writable: true,
    enumerable: true,
    configurable: true
  },
  greeting: {
    value: [Function: greeting],
    writable: true,
    enumerable: true,
    configurable: true
  }
  // age因为不可枚举，所以没有被拷贝
}

// 原型也没有被拷贝
newObj.__proto__; // {}
```

所以我们可以使用 Object.getOwnPropertyDescriptors() 配合 Object.create() 和 Object.getPropertyOf() 来解决这个问题。

Object.create() 接收两个参数：

- 第一个是新创建对象的原型对象，这里我们通过 Object.getPrototypeOf(obj) 获取

- 第二个参数可选，需要传入属性描述符以及相应的属性名称，这些属性对应 Object.defineProperties() 的第二个参数，其中 **Object.defineProperties() 的第二个参数** 又可以通过 **Object.getOwnPropertyDescriptors(obj)** 获取。

```js
const newObj = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj),
);

// 描述符被正确拷贝
Object.getOwnPropertyDescriptors(newObj);

// 输出：
{ firstName:
  { value: 'Yancey',
    writable: true,
    enumerable: true,
    configurable: true },
 lastName:
  { get: [Function: get],
    set: undefined,
    enumerable: true,
    configurable: true },
 greeting:
  { value: [Function: greeting],
    writable: true,
    enumerable: true,
    configurable: true },
 age:
  { value: 18,
    writable: false,
    enumerable: false,
    configurable: false } }

// 原型属性也被拷贝
newObj.__proto__; // { somePrototypeKey: 'somrthing...' }
```

### 继承新思路

创建子类的典型方法是定义子类，将其原型设置为超类的实例，然后在该实例上定义属性。下面是一种新的思路可以尝试。

```js
function superclass() {}
superclass.prototype = {
  // 在这里定义方法和属性
}
function subclass() {}
subclass.prototype = Object.create(
  superclass.prototype,
  Object.getOwnPropertyDescriptors({
    // 在这里定义方法和属性
  }),
)
```
