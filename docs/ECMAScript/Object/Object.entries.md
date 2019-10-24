---
id: entries
title: Object.entries()
---

## 语法

```ts
entries<T>(o: { [s: string]: T } | ArrayLike<T>): [string, T][];
```

## 描述

返回一个对象自身 `可枚举` 属性的 `键值对` 数组, 其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致, 不同的是 `Object.entries()` 不会枚举 `原型链上的属性`. 此外, 两者都不会遍历 `Symbol` 属性.

## 示例

Object.entries() 和 for...in 一样, 只会遍历自身 `可枚举` 且不为 `Symbol` 的属性.

```js{4,12}
const obj = {
  firstName: 'yancey',
  lastName: 'leo',
  [Symbol('age')]: 18,
  say() {
    return `Hello, ${this.firstName}!`;
  },
};

// 将“lastName”设为不可枚举
Object.defineProperty(obj, 'lastName', {
  value: 'leo',
  enumerable: false,
});

Object.entries(obj); // [['firstName', 'yancey'], ['say', [Function: say]]]

for (const i in obj) {
  console.log(i); // 依次打印出 firstName say
}
```

但是 Object.entries() 不会枚举 `原型链上的属性`, 而 for...in 可以.

```js{5,18}
function Animal(name) {
  this.name = name;
}

Animal.prototype.say = function() {
  return `I'm ${this.name}`;
};

function Cat(name, color) {
  // 继承属性
  Animal.call(this, name);
  this.color = color;
}

// 继承方法
Cat.prototype = new Animal();

Cat.prototype.bark = function() {
  return '喵';
};

const persian = new Cat('咪咪', 'white');

persian.name; // '咪咪'
persian.color; // 'white'
persian.say(); // 'I'm 咪咪'
persian.bark(); // '喵'

// 不会返回“原型链”上的属性
Object.entries(persian); // [['name', '咪咪'], ['color', 'white']]

// for...in会返回“原型链”上的属性
for (const i in persian) {
  console.log(i); // 依次打印出 name color bark say
}
```