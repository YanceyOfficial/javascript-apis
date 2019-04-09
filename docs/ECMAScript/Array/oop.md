# 从感性的角度认识原型/原型链 

> 最近在拜读 winter 大神的《重学前端》系列，一直以为 **原型**、**对象** 等名词纯粹是为编程而创造的，殊不知这些都源于日常的生活。有了感性的认知就能更好的理解这些 JavaScript 中“最难” 的一部分。这篇文章从原型、原型链，到面向对象及继承。

## 什么是面向对象?

一直以为“对象”仅仅是为编程语言而生的概念，毕竟 new 出的实例不是爱过的人。但英文的 Object 更应该

“先抽象(类)再具体(实例)”的符合人类思维模式的一种编程范式

Grandy Booch 在《面向对象分析与设计》中阐述到：从人类的认知角度来说，对象应该是下列事物之一：

- 一个可以触摸或者可以看见的东西；

- 人的智力可以理解的东西；

- 可以指导思考或行动（进行想象或施加动作）的东西。

## 神图

![图解原型链](https://yancey-assets.oss-cn-beijing.aliyuncs.com/161c172f0c940ffe.png)

之所以把上面这张图奉为神图，

## 构造函数

与传统的面向对象语言不同，JavaScript 并没有 **类** 的概念，即便是 ES6 增加了 `class` 关键字，也无非是原型的语法糖。当年 JavaScript 为了模仿 Java，也加入了 new 操作符。但它后面直接跟的是 `函数` 而非 `class`。

```js
function Dog(name, age) {
  this.name = name;
  this.age = age;
  this.bark = function() {
    return 'wangwang~';
  };
}

const husky = new Dog('Lolita', 2);
const alaska = new Dog('Roland', 3);
```

![属性和方法都放在构造函数里](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190408-182950%402x.jpg)

虽然上面的代码有了面向对象的味道，但它却有一个缺陷。我们根据 Dog 创建了两个实例，导致 bark 方法被创建了两次，但实际上两个实例的 bark 方法是一样的，这无疑造成了浪费。所以有没有一种办法将 bark 方法单独放到一个地方，让所有的实例都能访问到呢？

## 原型

何为“原型”? 从感性的角度来讲，原型是顺应人类自然思维的产物。有个成语叫做“照猫画虎”，这里的猫就是虎的原型，另一个俗语“比着葫芦画瓢”亦是异曲同工之妙。

所以我们可以这样认为，基于“类”的面向对象编程类似于根据图纸造房子，图纸是一个“虚”的事物、仅仅具有指导意义，类似于 xxxx 思想，而房子是实例。而基于“原型”的面向对象编程可以直接用某个实例（真实的）当作另一个实例（真实的）的原型。

因此，JavaScript 才是真正应该被称为“面向对象”的语言，因为它是少有的可以不通
过类，直接创建对象的语言。

在 JavaScript 中，每个函数都有一个 `prototype` 属性（这个说法并不严谨，像 Symbol 和 Math 就没有），该属性指向一个对象，称为 `原型对象`，当使用构造函数创建实例时，`prototype` 属性指向的原型对象就成为实例的原型对象。

原型对象默认有一个 `constructor` 属性，它指向该原型对象对应的构造函数。由于实例对象可以继承原型对象的属性，所以实例对象也拥有 `constructor` 属性，同样指向原型对象对应的构造函数。

![构造函数和原型对象的关系](https://yancey-assets.oss-cn-beijing.aliyuncs.com/68747470733a2f2f7773312e73696e61696d672e636e2f6c617267652f303036744e6337396c79316730326a3731396164626a333076613034696a72772e6a7067.jpeg)

```js
function Foo() {}

const foo = new Foo();

// 原型对象的 constructor 属性指向构造函数
Foo.prototype.constructor === Foo; // true

// 实例的 constructor 属性同样指向构造函数
foo.constructor === Foo; // true
```

每个实例都有一个隐藏的属性 `[[prototype]]`，指向它的原型对象，我们可以使用下面两种方式的任意一种来获取实例的原型对象。

```js
instance.__proto__;

Object.getPrototypeOf(instance);
```

注意：在 ES5 之前，为了能访问到 `[[Prototype]]`，浏览器厂商创造了 `__proto__` 属性。但在 ES5 之后有了标准方法 `Object.getPrototypeOf` 和 `Object.setPrototypeOf`。尽管为了浏览器的兼容性，已经将 `__proto__` 属性添加到 ES6 规范中，但它已被不推荐使用。

![实例、原型对象和构造函数之间的关系](https://yancey-assets.oss-cn-beijing.aliyuncs.com/68747470733a2f2f7773342e73696e61696d672e636e2f6c617267652f303036744e6337396c7931673032716b7264636d6b6a3330726b3064676a736f2e6a7067.jpeg)

至此，原型就基本上介绍完了，通过上面这张图片，我们很容易得到下面这个公式。

```js
Object.getPrototypeOf(实例) === 构造函数.prototype;
```

所以说，原型对象类似于一座“桥梁”，连通实例和构造函数，因此我们可以把公共的属性或方法放在原型对象里，这样就能解决构造函数实例化产生多个重复方法的问题了。我们修改一下构造函数那个例子，将 bark 方法放到 Dog 构造函数的原型中。

```js
function Dog(name, age) {
  this.name = name;
  this.age = age;
}

Dog.prototype.bark = function() {
  return 'wangwang~';
};

const husky = new Dog('Lolita', 2);
const alaska = new Dog('Roland', 3);

husky.bark(); // 'wangwang~'
alaska.bark(); // 'wangwang~'
```

![方法放在原型里](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190408-162254%402x.jpg)

## 属性设置与屏蔽

## 参考

《JavaScript 高级程序设计 (第三版)》 —— Nicholas C. Zakas

《深入理解 ES6》 —— Nicholas C. Zakas

《你不知道的 JavaScript (上卷)》—— Kyle Simpson

[三分钟看完 JavaScript 原型与原型链](https://juejin.im/post/5a94c0de5188257a8929d837)

[[进阶 5-1 期] 重新认识构造函数、原型和原型链](https://github.com/yygmind/blog/issues/32)

[[进阶 5-2 期] 图解原型链及其继承](https://juejin.im/post/5ca9cebb6fb9a05e505c5f81)

[详解 JS 原型链与继承](http://louiszhai.github.io/2015/12/15/prototypeChain/)
