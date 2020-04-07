---
id: call
title: call()
---

## 语法

```ts
call(this: Function, thisArg: any, ...argArray: any[]): any;
```

## 描述

该方法通过指定 this 值并给出一个参数序列来调用函数。其中第一个参数有四种可能：

- 不传参数或者传 null、undefined，this 指向 window 对象（浏览器环境下）

- 传递一个函数名，this 指向该函数的引用

- 传递一个原始类型的值，this 指向该原始值的包装对象

- 传递一个对象，this 指向这个对象

## 示例

### 不传第一个参数或第一个参数为 null 以及 undefined

```js
const o = { name: 'yancey' };

function foo() {
  console.log(this); // window
  console.log(arguments); // { '0': 'a', '1': 'b' }
}

foo.call(null, 'a', 'b');
```

### 第一个参数为对象

```js
const o = { name: 'yancey' };

function foo() {
  console.log(this); // { name: 'yancey' }
  console.log(arguments); // { '0': 'a', '1': 'b' }
}

foo.call(o, 'a', 'b');
```

### 第一个参数为函数

下面以寄生组合继承为例。关于 JavaScript 的继承可以参考我的另一篇文章 [JavaScript 七大继承全解析](https://github.com/YanceyOfficial/interview/blob/master/JavaScript/JavaScript%20%E4%B8%83%E5%A4%A7%E7%BB%A7%E6%89%BF%E5%85%A8%E8%A7%A3%E6%9E%90.md)

```js
function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype); // 创建父类原型的副本
  prototype.constructor = child; // 将副本的构造函数指向子类
  child.prototype = prototype; // 将该副本赋值给子类的原型
}

function Vehicle(powerSource) {
  this.powerSource = powerSource;
  this.components = ['座椅', '轮子'];
}

Vehicle.prototype.run = function() {
  console.log('running~');
};

function Car(wheelNumber) {
  this.wheelNumber = wheelNumber;
  // 在子类中调用父类
  Vehicle.call(this, '汽油');
}

inheritPrototype(Car, Vehicle);

Car.prototype.playMusic = function() {
  console.log('sing~');
};
```

### 第一个参数为原始数据类型

```js
function foo() {
  // 原始类型会转换成相应的包装类型
  console.log(this); // Number {1}
  console.log(arguments); // { '0': 'a', '1': 'b' }
}

foo.call(1, 'a', 'b');
```

### 将类数组对象转换成数组

下面各例将类数组对象转换为真正的数组，关于类数组对象，可以参考我的另一篇文章 [Array.from | JavaScript 全解析系列](https://js.yanceyleo.com/ES/Array/from)，下面各例都会打印出 `["上帝啊", "请", "赐给我一个女孩吧"]`。

```js
function foo() {
  console.log(Array.prototype.slice.call(arguments));
  console.log([].slice.call(arguments));
  console.log(Array.from(arguments));

  // 只有类数组对象是可迭代对象时，才可以用下面这种方法
  console.log([...arguments]);
}

foo('上帝啊', '请', '赐给我一个女孩吧');
```

## 手写 call 方法

思路：先假设传递的 `thisArg` 是个普通对象。然后给该对象添加一个临时的键 `fn`，将此函数挂载到 `fn`，并把参数序列传递进去。接着删除这个临时的 `fn`，最后返回该函数的执行。

为了防止原对象本身就有 `fn` 这个键，这里使用 Symbol 创建一个独一无二的变量。

当不传第一个参数或第一个参数为 null 以及 undefined 时，将 `thisArg` 替换成 `window`。

为了保证原始类型和函数也能添加 `fn`，需要把它们先转换成相应的包装类型。下面的代码为了简单，将 `thisArg` 都做了一次装箱操作，实际像 `window` 和 `Object` 完全没有必要在再做一次装箱操作，你最好为这些情况加上必要的条件语句。

```js
Function.prototype.call2 = function(thisArg, ...args) {
  const fn = Symbol('fn');

  if (!thisArg || thisArg === null || thisArg === undefined) {
    thisArg = window;
  }

  const packing = Object(thisArg);

  packing[fn] = this;
  const result = packing[fn](...args);
  delete packing[fn];
  return result;
};
```

## 参考

[写给新人的 call、apply、bind](https://aotu.io/notes/2016/09/02/Different-Binding/)

[this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2)
