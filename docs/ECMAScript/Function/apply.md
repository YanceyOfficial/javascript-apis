# apply()

## 语法

```ts
apply(this: Function, thisArg: any, argArray?: any): any;
```

## 描述

该方法是 call 的，只不过它第二个参数要传递一个数组，而 call 从第二个参数起需要传递一个参数序列。

## 示例

不传第一个参数或第一个参数为 null 以及 undefined。

```js
const o = { name: 'yancey' };

function foo() {
  console.log(this); // window
  console.log(arguments); // { '0': 'a', '1': 'b' }
}

foo.call(null, 'a', 'b');
```

第一个参数为对象。

```js
const o = { name: 'yancey' };

function foo() {
  console.log(this); // { name: 'yancey' }
  console.log(arguments); // { '0': 'a', '1': 'b' }
}

foo.call(o, 'a', 'b');
```

第一个参数为函数，下面以寄生组合继承为例。关于 JavaScript 的继承可以参考我的一篇文章 [JavaScript 七大继承全解析](https://juejin.im/post/5caeee53f265da03914d4e98)

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

第一个参数为原始数据类型。

```js
function foo() {
  console.log(this); // Number {1}
  console.log(arguments); // { '0': 'a', '1': 'b' }
}

foo.call(1, 'a', 'b');
```

## 手写 call 方法

先假设传递的 `thisArg` 是个普通对象。给该对象添加一个临时的键 `fn`，将被调用的函数作为 `fn` 的值，并把参数序列传递进去。接着删除这个临时的 `fn`，最后返回该函数的执行。

为了防止原对象本身就有 `fn` 方法，这里使用 Symbol 创建一个独一无二的变量。

当不传第一个参数或第一个参数为 null 以及 undefined 时，将 `thisArg` 替换成 `window`

为了保证原始类型和函数也能添加 `fn`，需要把它们先转换成相应的包装类型。下面的代码为了简单，将 `thisArg` 都做了一次装箱操作，实际像 `window` 和 `Object` 类型完全没有必要在再做一次装箱操作，你最好为这些情况加上必要的条件语句。

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
