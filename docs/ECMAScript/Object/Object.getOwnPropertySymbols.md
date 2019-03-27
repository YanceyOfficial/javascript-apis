# Object.getOwnPropertySymbols() <Badge text="ES6"/>

## 语法

```ts
getOwnPropertySymbols(o: any): symbol[];
```

## 描述

返回一个给定对象自身的所有 Symbol 属性的数组。

- 包括不可枚举 Symbol 的属性

- 不包括普通字符串作为名称的属性

- 不会获取到原型链上的 Symbol 属性

- 当不存在 Symbol 作为名称的属性时返回一个空数组

## 示例

```js
const obj = {
  firstName: 'Yancey',
  [Symbol('lastName')]: 'Leo',
};

Object.defineProperty(obj, Symbol('age'), {
  value: 18,
});

Object.getOwnPropertySymbols(obj); // [Symbol(lastName), Symbol(age)]
```

和 Object.getOwnPropertyNames() 一样，该方法不会获取到原型链上的属性，但能获得该对象自身原型上的属性。

```js
function Dog(name, color) {
  this.name = name;
  this.color = color;
}

Dog.prototype[Symbol('bark')] = function() {
  return '汪汪~';
};

const husky = new Dog('旺财', 'pink');

husky[Symbol('say')] = function() {
  return 'say something...';
};

Object.getOwnPropertySymbols(husky); // [Symbol(say)]
```