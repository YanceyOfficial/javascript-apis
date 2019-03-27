# Object.values() <Badge text="ES8"/>

## 语法

```ts
values<T>(o: { [s: string]: T } |  ArrayLike<T>): T[];
```

## 描述

返回一个对象自身 `可枚举` 属性 `属性值` 组成的数组, 其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致, 不同的是 `Object.values()` 不会枚举 `原型链上的属性`. 此外, 两者都不会遍历 `Symbol` 属性.

## 示例

```js{4,11}
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

for (const key in obj) {
  console.log(key); // 依次打印出 firstName greeting
}

Object.values(obj); // ['yancey', [Function: greeting]]

for (const key of Object.values(obj)) {
  console.log(key); // 依次打印出 yancey [Function: greeting]
}

Object.values(obj).map(key => console.log(key)); // 依次打印出 firstName greeting
```

Object.values() 不会遍历 `原型链` 上的属性, 而 for...in 可以.

```js{5,18}
function Animal(name) {
  this.name = name;
}

Animal.prototype.say = function() {
  return `I'm ${this.name}`;
};

function Dog(name, color) {
  // 继承属性
  Animal.call(this, name);
  this.color = color;
}

// 继承方法
Dog.prototype = new Animal();

Dog.prototype.bark = function() {
  return '喵';
};

const husky = new Dog('咪咪', 'white');

husky.name; // '咪咪'
husky.color; // 'white'
husky.say(); // 'I'm 咪咪'
husky.bark(); // '喵'

Object.values(husky); // ['咪咪', 'white']

for (const i in husky) {
  console.log(i); // 依次打印出 name color bark say
}
```
