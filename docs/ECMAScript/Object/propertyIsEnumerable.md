# propertyIsEnumerable()

## 语法

```ts
propertyIsEnumerable(v: PropertyKey): boolean;
```

## 描述

该方法判读指定的属性是否可枚举，返回一个 Boolean 值。

- 无法判断通过原型链继承的属性是否可枚举（继承属性恒返回 false）

- 如果对象没有指定的属性，返回 false

- 此方法也可以用在数组上

## 示例

该方法可用在对象和数组上。

```js
const obj = {
  firstName: 'Yancey',
};

Object.defineProperty(obj, 'lastName', {
  enumerable: false,
});

obj.propertyIsEnumerable('firstName'); // true
obj.propertyIsEnumerable('lastName'); // false

// 如果对象没有指定的属性，返回 false
obj.propertyIsEnumerable('age'); // false

const arr = ['abc', 'def'];

Object.defineProperty(arr, 1, {
  enumerable: false,
});

arr.propertyIsEnumerable(0); // true
arr.propertyIsEnumerable(1); // false
```

此方法也可以查询 JS 内置对象属性的可枚举情况。

```js
Math.propertyIsEnumerable('random'); // false
this.propertyIsEnumerable('Math'); // false
```

无法判断通过原型链继承的属性是否可枚举（继承属性恒返回 false）。

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
  return '喵';
};

const persian = new Cat('咪咪', 'white');

/*
 * 自身属性
 */
persian.propertyIsEnumerable('name'); // true
persian.propertyIsEnumerable('color'); // true

/*
 * 不存在的属性
 */
persian.propertyIsEnumerable('age'); // false

/*
 * 原型链上的属性恒返回 false，无论是否可枚举
 */
persian.propertyIsEnumerable('bark'); // false
persian.propertyIsEnumerable('say'); // false
```
