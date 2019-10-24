---
id: setPrototypeOf
title: Object.setPrototypeOf()
---

## 语法

```ts
setPrototypeOf(o: any, proto: object | null): any;
```

## 描述

用于给一个对象设置原型。

o.\_\_proto\_\_ = Foo.prototype 等价于 Object.setPrototypeOf(o, Foo.prototype)

简言之，Object.getPrototypeOf() 和 Object.setPrototypeOf() 存在的意义就是避免让我们写 **\_\_proto\_\_**，因为它严格意义上不是一个标准的属性。

## 示例

手写 new 的实现。

```js
function Foo(name) {
  this.name = name;
}

// use __proto__
const o = {};
o.__proto__ = Foo.prototype;
Foo.call(o)

// use Object.setPrototypeOf()
const o1 = {};
Object.setPrototypeOf(o1, Foo.prototype);
Foo.call(o1)
```
