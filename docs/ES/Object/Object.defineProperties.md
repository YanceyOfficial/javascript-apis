---
id: defineProperties
title: Object.defineProperties()
---

## 语法

```ts
defineProperties(o: any, properties: PropertyDescriptorMap & ThisType<any>): any;
```

## 描述

用于在一个对象上定义新的属性或修改现有属性, 并返回该对象. 该方法和`Object.defineProperty()`并无本质区别, 只不过该方法可以批量定义或修改`多个`属性.

> TIP
>
> 大部分理论知识都在[上一节](/ES/Object/defineProperty), 因此本篇只举一个基本的例子.

## 示例

```js
const obj = {
  name: 'Yancey',
  say() {
    return `Hello, ${this.name}`
  },
}

Object.defineProperties(obj, {
  name: {
    value: 'Sayaka',
    writable: true,
    enumerable: false,
    configurable: true,
  },
  age: {
    value: 18,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  hobby: {
    value: ['music', 'reading', 'soccer'],
    writable: false,
    enumerable: true,
    configurable: true,
  },
})

// 因为 age 的 configurable 设为了 false, 所以不会被删除
delete obj.age // false

// 因为 name 被设置为不可枚举, 所以依次打印出 say age hobby
for (const i in obj) {
  console.log(i)
}

obj.propertyIsEnumerable('name') // false

// splice, push 等方法可以修改一个"不可写属性"(类比 const)
obj.hobby.splice(0, 1)
obj.hobby // ['reading', 'soccer']

// 但"赋值"操作不能修改一个"不可写属性"
obj.hobby = ['eat']
obj.hobby // ['reading', 'soccer']
```
