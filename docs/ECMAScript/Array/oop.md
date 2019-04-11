# JavaScript 七大继承全解析

> 继承作为基本功和面试必考点，必须要熟练掌握才行。小公司可能仅让你手写继承（一般写 `寄生组合式继承` 即可），大厂就得要求你全面分析各个继承的优缺点了。这篇文章深入浅出，让你全面了解 JavaScript 继承及其优缺点，以在寒冬中立于不败之地。

## 原型链继承

上一篇文章[《从感性角度谈原型 / 原型链》](https://juejin.im/post/5cac4e0af265da03973a8c84)介绍了什么是原型和原型链。我们简单回忆一下构造函数、原型、原型链之间的关系：每个构造函数有一个 `prototype` 属性，它指向原型对象，而原型对象都有一个指向构造函数的指针 `constructor`，实例对象都包含指向原型对象的内部指针 `[[prototype]]`。如果我们让原型对象等于另一个构造函数的实例，那么此原型对象就会包含一个指向另一个原型的指针。这样一层一层，逐级向上，就形成了原型链。

根据上面的介绍，我们可以写出 `原型链继承`。

```js
function Vehicle(powerSource) {
  this.powerSource = powerSource;
  this.components = ['座椅', '轮子'];
}

Vehicle.prototype.run = function() {
  console.log('running~');
};

function Car(wheelNumber) {
  this.wheelNumber = wheelNumber;
}

Car.prototype.playMusic = function() {
  console.log('sing~');
};

// 将父构造函数的实例赋值给子构造函数的原型
Car.prototype = new Vehicle();

const car1 = new Car(4);
```

上面这个例子中，首先定义一个叫做 `交通工具` 的构造函数，它有两个属性分别是是 `驱动方式` 和 `组成部分`，还有一个原型方法是 `跑`；接下来定义叫做 `汽车` 的构造函数，它有 `轮胎数量` 属性和 `播放音乐` 方法。我们将 `Vehicle` 的实例赋值给 `Car` 的原型，并创建一个名叫 `car1` 的实例。

![原型链继承](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190409-180518%402x.jpg)

但是该方式有几个缺点：

- 多个实例对引用类型的操作会被篡改

- 子类型的原型上的 constructor 属性被重写了

- 给子类型原型添加属性和方法必须在替换原型之后

- 创建子类型实例时无法向父类型的构造函数传参

### 缺点 1

从上图可以看出，父类的实例属性被添加到了实例的原型中，当原型的属性为引用类型时，就会造成数据篡改。

我们新增一个实例叫做 `car2`，并给 `car2.components` 追加一个新元素。打印 `car1`，发现 `car1.components` 也发生了变化。这就是所谓多个实例对引用类型的操作会被篡改。

```js
const car2 = new Car(8);

car2.components.push('灯具');

car2.components; // ['座椅', '轮子', '灯具']
car1.components; // ['座椅', '轮子', '灯具']
```

### 缺点 2

该方式导致 `Car.prototype.constructor` 被重写，它指向的是 `Vehicle` 而非 `Car`。因此你需要手动将 `Car.prototype.constructor` 指回 `Car`。

```js
Car.prototype = new Vehicle();
Car.prototype.constructor === Vehicle; // true

// 重写 Car.prototype 中的 constructor 属性，指向自己的构造函数 Car
Car.prototype.constructor = Car;
```

### 缺点 3

因为 `Car.prototype = new Vehicle();` 重写了 Car 的原型对象，所以导致 `playMusic` 方法被覆盖掉了，因此给子类添加原型方法必须在替换原型之后。

```js
function Car(wheelNumber) {
  this.wheelNumber = wheelNumber;
}

Car.prototype = new Vehicle();

// 给子类添加原型方法必须在替换原型之后
Car.prototype.playMusic = function() {
  console.log('sing~');
};
```

### 缺点 4

显然，创建 `car` 实例时无法向父类的构造函数传参，也就是无法初始化 `powerSource` 属性。

```js
const car = new Car(4);

// 只能创建实例之后再修改父类的属性
car.powerSource = '汽油';
```

## 借用构造函数继承

该方法又叫 `伪造对象` 或 `经典继承`。它的实质是 `在创建子类实例时调用父类的构造函数`。

```js
function Vehicle(powerSource) {
  this.powerSource = powerSource;
  this.components = ['座椅', '轮子'];
}

Vehicle.prototype.run = function() {
  console.log('running~');
};

function Car(wheelNumber) {
  this.wheelNumber = wheelNumber;

  // 继承父类属性并且可以传参
  Vehicle.call(this, '汽油');
}

Car.prototype.playMusic = function() {
  console.log('sing~');
};

const car = new Car(4);
```

![借用构造函数继承](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190409-195416%402x.jpg)

使用经典继承的好处是可以给父类传参，并且该方法不会重写子类的原型，故也不会损坏子类的原型方法。此外，由于每个实例都会将父类中的属性复制一份，所以也不会发生多个实例篡改引用类型的问题（因为父类的实例属性不在原型中了）。

然而缺点也是显而易见的，我们丝毫找不到 `run` 方法的影子，这是因为该方式只能继承父类的实例属性和方法，不能继承原型上的属性和方法。

回忆上一篇文章讲到的构造函数，为了将公有方法放到所有实例都能访问到的地方，我们一般将它们放到构造函数的原型中。而如果让 `借用构造函数继承` 运作下去，显然需要将 `公有方法` 写在构造函数里而非其原型，这在创建多个实例时势必造成浪费。

## 组合继承

组合继承吸收上面两种方式的优点，它使用原型链实现对原型方法的继承，并借用构造函数来实现对实例属性的继承。

```js
function Vehicle(powerSource) {
  this.powerSource = powerSource;
  this.components = ['座椅', '轮子'];
}

Vehicle.prototype.run = function() {
  console.log('running~');
};

function Car(wheelNumber) {
  this.wheelNumber = wheelNumber;
  Vehicle.call(this, '汽油'); // 第二次调用父类
}

Car.prototype = new Vehicle(); // 第一次调用父类

// 修正构造函数的指向
Car.prototype.constructor = Car;

Car.prototype.playMusic = function() {
  console.log('sing~');
};

const car = new Car(4);
```

![组合继承](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190410-112047%402x_meitu_2.jpg)

虽然该方式能够成功继承到父类的属性和方法，但它却调用了两次父类。第一次调用父类的构造函数时，`Car.prototype` 会得到 `powerSource` 和 `components` 两个属性；当调用 `Car` 构造函数生成实例时，又会调用一次 `Vehicle` 构造函数，此时会在这个实例上创建 `powerSource` 和 `components`。根据原型链的规则，实例上的这两个属性会屏蔽原型链上的两个同名属性。

## 原型式继承

该方式通过借助原型，基于已有对象创建新的对象。

首先创建一个名为 `object` 的函数，然后在里面中创建一个空的函数 `F`，并将该函数的 `prototype` 指向传入的对象，最后返回该函数的实例。本质来讲，`object()` 对传入的对象做了一次 `浅拷贝`。

```js
function object(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

const cat = {
  name: 'Lolita',
  friends: ['Yancey', 'Sayaka', 'Mitsuha'],
  say() {
    console.log(this.name);
  },
};

const cat1 = object(cat);
```

![原型式继承](https://yancey-assets.oss-cn-beijing.aliyuncs.com/nani.jpg)

虽然这种方式很简洁，但仍然有一些问题。因为 `原型式继承` 相当于 `浅拷贝`，所以会导致 `引用类型` 被多个实例篡改。下面这个例子中，我们给 `cat1.friends` 追加一个元素，却导致 `cat.friends` 被篡改了。

```js
cat1.friends.push('Hachi');

cat.friends; // ['Yancey', 'Sayaka', 'Mitsuha', 'Hachi']
```

如果你读过 `Object.create()` 的 polyfill，应该不会对上面的代码感到陌生。该方法规范了原型式继承，它接收两个参数：第一个参数传入用作新对象原型的对象，第二个参数传入属性描述符对象或 null。关于此 API 的详细文档可以点击 [Object.create() | JavaScript API 全解析](https://js.yanceyleo.com/ECMAScript/Object/Object.create.html)

```js
const cat = {
  name: 'Lolita',
  friends: ['Yancey', 'Sayaka', 'Mitsuha'],
  say() {
    console.log(this.name);
  },
};

const cat1 = Object.create(cat, {
  name: {
    value: 'Kitty',
    writable: false,
    enumerable: true,
    configurable: false,
  },
  friends: {
    get() {
      return ['alone'];
    },
  },
});
```

## 寄生式继承

该方式创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作一样返回对象。

```js
const cat = {
  name: 'Lolita',
  friends: ['Yancey', 'Sayaka', 'Mitsuha'],
  say() {
    console.log(this.name);
  },
};

function createAnother(original) {
  const clone = Object.create(original); // 获取源对象的副本

  clone.gender = 'female';

  clone.fly = function() {
    // 增强这个对象
    console.log('I can fly.');
  };

  return clone; // 返回这个对象
}

const cat1 = createAnother(cat);
```

![寄生式继承](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190410-175812%402x.jpg)

和 `原型式继承` 一样，该方式会导致 `引用类型` 被多个实例篡改，此外，`fly` 方法存在于 `实例` 而非 `原型` 中，因此 `函数复用` 无从谈起。

## 寄生组合式继承

上面我们谈到了 `组合继承`，它的缺点是会调用两次父类，因此父类的实例属性会在子类的实例和其原型上各自创建一份，这会导致实例属性屏蔽原型链上的同名属性。

好在我们有 `寄生组合式继承`，它本质上是通过 `寄生式继承` 来继承父类的原型，然后再将结果指定给子类的原型。这可以说是在 ES6 之前最好的继承方式了，面试写它没跑了。

```js
function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype); // 创建父类原型的副本
  prototype.constructor = child; // 将副本的构造函数指向子类
  child.prototype = prototype; // 将该副本赋值给子类的原型
}
```

然后我们尝试写一个例子。

```js
function Vehicle(powerSource) {
  this.powerSource = powerSource;
  this.components = ['座椅', '轮子'];
}

Vehicle.prototype.run = function() {
  console.log('running~');
};

function Car(wheelNumber) {
  this.wheelNumber = wheelNumber;
  Vehicle.call(this, '汽油');
}

inheritPrototype(Car, Vehicle);

Car.prototype.playMusic = function() {
  console.log('sing~');
};
```

![寄生组合式继承](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190410-195127%402x.jpg)

看上面这张图就知道为什么这是最好的方法了。它只调用了一次父类，因此避免了在子类的原型上创建多余的属性，并且原型链结构还能保持不变。

硬要说缺点的话，给子类型原型添加属性和方法仍要放在 `inheritPrototype` 函数之后。

## ES6 继承

功利主义来讲，在 ES6 新增 class 语法之后，上述几种方法已沦为面试专用。当然 class 仅仅是一个语法糖，它的核心思想仍然是 `寄生组合式继承`，下面我们看一看怎样用 ES6 的语法实现一个继承。

```js
class Vehicle {
  constructor(powerSource) {
    // 用 Object.assign() 会更加简洁
    Object.assign(
      this,
      { powerSource, components: ['座椅', '轮子'] },

      // 当然你完全可以用传统的方式
      // this.powerSource = powerSource;
      // this.components = ['座椅', '轮子'];
    );
  }

  run() {
    console.log('running~');
  }
}

class Car extends Vehicle {
  constructor(powerSource, wheelNumber) {
    // 只有 super 方法才能调用父类实例
    super(powerSource, wheelNumber);
    this.wheelNumber = wheelNumber;
  }

  playMusic() {
    console.log('sing~');
  }
}

const car = new Car('核动力', 3);
```

![“类”继承](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190411-112218.jpg)

下面代码是继承的 polyfill，思路和 `寄生组合式继承` 一致。

```js
function _inherits(subType, superType) {
  // 创建对象，创建父类原型的一个副本

  subType.prototype = Object.create(superType && superType.prototype, {
    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
    constructor: {
      value: subType,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superType) {
    // 指定对象，将新创建的对象赋值给子类的原型
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subType, superType)
      : (subType.__proto__ = superType);
  }
}
```

## ES5 和 ES6 继承的比较

ES5 是用构造函数创建类，因此会发生 `函数提升`；而 class 类似于 let 和 const，因此不能够先创建实例，再声明类，否则直接报错。

```js
// Uncaught ReferenceError: Rectangle is not defined
let p = new Rectangle();

class Rectangle {}
```

ES5 的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到 this 上，即 `Parent.call(this)`.

ES6 的继承有所不同，实质上是先创建父类的实例对象 this，然后再用子类的构造函数修改 this。因为子类没有自己的 this 对象，所以必须先调用父类的 super()方法，否则新建实例报错。

## 最后

欢迎关注我的微信公众号：进击的前端

![进击的前端](https://yancey-assets.oss-cn-beijing.aliyuncs.com/qrcode_for_gh_541158abcb21_344.jpg)

## 参考

《JavaScript 高级程序设计 (第三版)》 —— Nicholas C. Zakas

[[进阶 5-2 期] 图解原型链及其继承](https://juejin.im/post/5ca9cebb6fb9a05e505c5f81)

[JavaScript 常用八种继承方案](https://github.com/yygmind/blog/issues/7)
