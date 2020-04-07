---
id: isPrototypeOf
title: isPrototypeOf()
---

## 语法

```ts
isPrototypeOf(v: Object): boolean;
```

## 描述

用于检测一个对象是否存在于另一个对象的原型链上，返回一个 Boolean 值。

## 示例

```js
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
  return "喵";
};

const persian = new Cat("咪咪", "white");

Cat.prototype.isPrototypeOf(persian); // true

Animal.prototype.isPrototypeOf(persian); // true

Object.prototype.isPrototypeOf(persian); // true

Animal.prototype.isPrototypeOf(Cat.prototype); // true
```

## 扩展

### 浅谈 isPrototypeOf() 和 instanceof

`B instanceof A` 判断 A 的 **原型对象** 是否在 B 的原型链上，也就是判断 `A.prototype` 是否在 B 的原型链上

`A.isPrototypeOf(B)` 判断 A 是否在 B 的原型链上。

```js
persian instanceof Cat; // true

Cat.prototype.isPrototypeOf(persian); // true

persian instanceof Animal; // true

persian instanceof Object; // true

Cat.prototype instanceof Animal; // true
```

## 参考

[instanceof 与 isPrototypeOf 的区别](https://www.jianshu.com/p/31b09a13f212)

[isPrototypeOf 和 instanceof 的区别](https://www.cnblogs.com/ArthurXml/p/6555509.html)
