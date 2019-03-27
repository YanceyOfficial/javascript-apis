# Object.getPrototypeOf()

## 语法

```ts
getPrototypeOf(o: any): any;
```

## 描述

该方法返回指定对象的原型（内部[[Prototype]]属性的值），即 `Object.getPrototypeOf(obj) === obj.__proto__` 返回 true.

:::tip
\_\_proto\_\_ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 `Object.getPrototypeOf()` 来获取实例对象的原型，然后再来为原型添加方法/属性。
:::

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
  return '喵';
};

const persian = new Cat('咪咪', 'white');

Object.getPrototypeOf(persian) === persian.__proto__; // true
```

再看一个例子。

```js
const proto = {};
const obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

## 扩展

Object.getPrototypeOf() 可用来判断 JavaScript 数据类型。

```js
Object.getPrototypeOf('') === String.prototype; // true

Object.getPrototypeOf(new String('')) === String.prototype; // true

Object.getPrototypeOf(/^$/) === RegExp.prototype; // true

Object.getPrototypeOf(/^$/) === Object.prototype; // false
```

通过前两个例子可以看出，该方法和 `Object.prototype.toString.call()` 有共同的缺点，就是无法正确分辨 **基本数据类型** 和 **引用类型**，因此请配合 **typeof** 一起使用。

关于判断数据类型的若干方法，可阅读我的文章 [JS 判断数据类型的多种方式](https://www.yanceyleo.com/p/5c84fb02a22a8632e5857b6d)

## 其他

在 ES5 中，如果参数不是一个对象类型，那么它会导致 TypeError。在 ES6+ 中，非对象参数被强制转换为对象。

```js
// TypeError: "foo" is not an object (ES5)
Object.getPrototypeOf('foo');

// ES6+
Object.getPrototypeOf('foo'); // String.prototype
```
