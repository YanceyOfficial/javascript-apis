---
id: getOwnPropertyNames
title: Object.getOwnPropertyNames()
---

## 语法

```ts
getOwnPropertyNames(o: any): string[];
```

## 描述

方法返回一个由指定对象的所有自身属性的属性名组成的数组。

- 包括不可枚举属性

- 但不包括 Symbol 值作为名称的属性

- 不会获取到原型链上的属性

- 当不存在普通字符串作为名称的属性时返回一个空数组

## 示例

```js
const obj = {
  firstName: 'yancey',
  lastName: 'leo',
  [Symbol('age')]: '18',
  greeting() {
    return `Hello, ${this.firstName}!`;
  },
};

// lastName 不可枚举
Object.defineProperty(obj, 'lastName', {
  value: 'leo',
  enumerable: false,
});

Object.getOwnPropertyNames(obj); // ['firstName', 'lastName', 'greeting']
```

该方法同样适用于数组，值得注意的是该方法会返回一个 `length` 属性。

```js
Object.getOwnPropertyNames(['a', 'b', 'c']); // ['0', '1', '2', 'length']
```

该方法不会获取到原型链上的属性，但能获得该对象自身原型上的属性。

```js
function Dog(name, color) {
  this.name = name;
  this.color = color;
}

Dog.prototype.bark = function() {
  return '汪汪~';
};

const husky = new Dog('旺财', 'pink');

husky.say = function() {
  return 'say something...';
};

Object.getOwnPropertyNames(husky); // ['name', 'color', 'say']
```

## 扩展

在 ES5 中，如果参数不是一个原始对象类型，那么它会导致 TypeError。在 ES6+ 中，非对象参数被强制转换为对象。

```js
// TypeError: "foo" is not an object (ES5)
Object.getOwnPropertyNames('foo');

// ES6+
// 通过装箱操作，字符串 foo 被转换成了 {'0': 'f', '1': 'o', '2': 'o'}
Object.getOwnPropertyNames('foo'); // ['length', '0', '1', '2']
```
