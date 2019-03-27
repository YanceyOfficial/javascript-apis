# Object.getOwnPropertyDescriptor()

## 语法

```ts
getOwnPropertyDescriptor(o: any, p: PropertyKey): PropertyDescriptor | undefined;
```

## 描述

返回指定对象上一个自有属性对应的属性描述符。自有属性指的是直接赋予该对象的属性，因此原型链上的属性会返回 undefined.

## 示例

```js
const obj = {
  firstName: 'Yancey',
  lastName: 'Leo',
  greeting() {
    return `Hello, ${this.firstName}!`;
  },
};

Object.defineProperties(obj, {
  age: {
    value: 18,
    enumerable: true,
  },
  lastName: {
    get() {
      return 'Yancey';
    },
  },
});

Object.getOwnPropertyDescriptor(obj, 'firstName');
// 输出： {value: 'Yancey', writable: true, enumerable: true, configurable: true}

Object.getOwnPropertyDescriptor(obj, 'lastName');
// 输出：{get: [Function: get], set: undefined, enumerable: true, configurable: true}

Object.getOwnPropertyDescriptor(obj, 'age');
// 输出：{value: 18, writable: false, enumerable: true, configurable: false}
```

而对于原型链上的属性，该方法直接返回 **undefined**

```js
function Dog(name, color) {
  this.name = name;
  this.color = color;
}

Dog.prototype.bark = function() {
  return '汪汪~';
};

const husky = new Dog('旺财', 'pink');

Object.getOwnPropertyDescriptor(Dog, 'bark'); // false

Object.getOwnPropertyDescriptor(Dog, 'name');
// 输出：{value: 'Dog', writable: false, enumerable: false, configurable: true}

Object.getOwnPropertyDescriptor(husky, 'name');
// 输出：{value: '旺财', writable: true, enumerable: true, configurable: true}
```