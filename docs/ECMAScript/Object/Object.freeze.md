---
id: freeze
title: Object.freeze()
---

## 语法

```ts
freeze<T>(o: T): Readonly<T>;
```

## 描述

该方法用于 **冻结** 一个对象，即：

- 不能向该对象添加新属性，不能修改已存在的的属性，不能删除已存在的属性;

- 不能修改已有属性的 configurable、enumerable、writable、value、getter、setter，即使用 `Object.defineProperty()` 必定报错;

- 此对象的 **原型** 也不能被修改;

- 但是，当某个属性的属性值是 **对象** 时，该属性可以被修改，除非它也是个冻结对象.

## 示例

本篇换个口味，不再使用普通对象字面量的例子。这里以构造函数 Dog 和其实例 husky 为例。

```js{12}
function Dog(name, color) {
  this.name = name
  this.color = color
}

Dog.prototype.bark = function() {
  return '汪汪~'
}

const husky = new Dog('旺财', 'pink')

Object.freeze(husky)

Object.isExtensible(husky) // false
Object.isSealed(husky) // true
Object.isFrozen(husky) // true
```

在实例上添加、修改、删除属性无效，在严格模式下直接报错。

```js
// 新增属性无效
husky.species = '哈士奇'
husky.species // undefined

// 修改既有属性无效
husky.name = '咪咪'
husky.name // '旺财'

// 删除既有属性无效
delete husky.color // fasle

// 严格模式下直接报错
function fail() {
  'use strict'

  husky.species = '哈士奇'
  delete husky.name
  husky.name = '咪咪'
}

fail()
```

当使用 Object.defineProperty() 添加、修改属性时，直接报错。

```js
// TypeError: Cannot define property length, object is not extensible
Object.defineProperty(husky, 'length', {
  value: '100cm',
  configurable: true,
  enumerable: true,
  writable: true,
})

// TypeError: Cannot redefine property: color
Object.defineProperty(husky, 'color', {
  value: 'green',
  configurable: true,
  enumerable: true,
  writable: true,
})

// TypeError: Cannot redefine property: color
Object.defineProperty(husky, 'color', {
  get() {
    console.log('xxx')
    return this.color
  },
})
```

冻结一个对象后该对象的原型也不能被修改。

```js
// 不会报错，但原型并没有被修改
husky.bark = function() {
  return '喵喵~'
}
husky.bark() // 汪汪~

// Uncaught TypeError: #<Dog> is not extensible
Object.setPrototypeOf(husky, {
  bark: function() {
    return '喵喵~'
  },
})

// Uncaught TypeError: #<Dog> is not extensible
husky.__proto__ = {
  bark: function() {
    return '喵喵~'
  },
}
```

特殊地，当一个属性的属性值是 **对象** 时，该属性可以被修改（浅冻结），除非它也是个冻结对象。

> 对于一个常量对象，整个引用图（直接和间接引用其他对象）只能引用不可变的冻结对象。冻结的对象被认为是不可变的，因为整个对象中的整个对象状态（对其他对象的值和引用）是固定的。注意，字符串，数字和布尔总是不可变的，而函数和数组是对象。

```js
husky.other.country = 'Japan'
husky.other.country // 'Japan'
```

因此你可以递归的冻结每个类型为对象的属性（深冻结），但可能会带来无限循环的风险。

```js
function deepFreeze(obj) {
  // 取回定义在obj上的属性名
  var propNames = Object.getOwnPropertyNames(obj)

  // 在冻结自身之前冻结属性
  propNames.forEach(function(name) {
    var prop = obj[name]

    // 如果prop是个对象，冻结它
    if (typeof prop == 'object' && prop !== null) deepFreeze(prop)
  })

  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj)
}
```

数组同样可以被冻结，在严格模式下会报错。

```js
let colors = ['red', 'green', 'white']

Object.freeze(colors)

// 不可新增（新增直接报错，无论严格模式还是非严格模式）
// Uncaught TypeError: Cannot add property 3, object is not extensible
colors.push('gray')

// 不可修改（非严格模式下不会报错，但不会去修改）
colors[0] = 'black'
colors[0] // 'red'

// 不可删除（删除直接报错，无论严格模式还是非严格模式）
// Uncaught TypeError: Cannot delete property '2' of [object Array]
color.pop()
```

## 总结

截止到本篇，用于限制对象的三个方法 preventExtensions(), seal(), freeze() 已经写完了，为更加直观的比较三者的不同，这里通过表格做一下总结。

|                 | preventExtensions()                                                                                                       | seal()                                                                                                 | freeze()                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 概念            | 禁止给对象及其原型 **添加新属性**                                                                                         | 禁止给对象及其原型添加 **新属性**，并将全部现有属性设为 **不可配置**                                   | 禁止给对象及其原型 **添加 修改 删除** 新属性，不能修改已有属性的 configurable、enumerable、writable、value、getter、setter |
| isExtentsible() | false                                                                                                                     | false                                                                                                  | false                                                                                                                      |
| isSealed()      | 空对象返回 true，非空对象只要所有属性 **不可配置** 也返回 true，其余返回 false                                            | true                                                                                                   | true                                                                                                                       |
| isFrozen()      | 空对象返回 true，对于非空对象，当所有属性 **不可配置**，同时 **不可写** 或拥有 **访问器** 属性，返回 true，否则返回 false | 空对象返回 true，对于非空对象，当所有属性 **不可写** 或拥有 **访问器** 属性，返回 true，否则返回 false | true                                                                                                                       |

> TIP
>
> 关于 isExtentsible(), isSealed() 和 isFrozen() 三个方法请阅读接下来三篇文章。
