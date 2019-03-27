# Object.defineProperty()

## 语法

```ts
defineProperty(o: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): any;
```

## 描述

用于在一个对象上定义新的属性或修改现有属性，并返回该对象。

### 参数

- `o` 目标对象

- `p` 需要定义的属性或方法名 (可修改既有的，也可添加新属性或方法)

- `attributes` 属性描述符，具体属性如下：

```ts
interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}
```

## 属性描述符

ECMAScript 中有两种属性：`数据属性` 和 `访问器属性`。

**数据属性**包括：**[[Configurable]]**, **[[Enumerable]]**, **[[Writable]]**, **[[Value]]**

**访问器属性**包括：**[[Configurable]]**, **[[Enumerable]]**, **[[Get]]**, **[[Set]]**

属性描述符可同时具有的键值：

|            | configurable | enumerable | value | writable | get | set |
| ---------- | ------------ | ---------- | ----- | -------- | --- | --- |
| 数据属性   | Yes          | Yes        | Yes   | Yes      | No  | No  |
| 访问器属性 | Yes          | Yes        | No    | No       | Yes | Yes |

简言之，定义了 **value** 或 **writable**，一定不能有 **get** 或 **set**，反之亦然，否则直接报错。

![描述符可同时具有的键值](/defineProperty.jpg)

### Configurable

如果某个属性的 configurable 为`false`，那么：

1. 将不能删除此属性，即 `delete obj.xxx` 无效，在严格模式下直接报错。

```js
// 非严格模式下删除一个"不可配置"的属性会返回false
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'yancey',
  configurable: false,
});

delete obj.name; // false

// obj.name并没有被删除
obj.name; // yancey
```

```js
// 严格模式下删除一个"不可配置"的属性直接报错
(function() {
  'use strict';
  var o = {};
  Object.defineProperty(o, 'b', {
    value: 2,
    configurable: false,
  });
  delete o.b; // Uncaught TypeError: Cannot delete property 'b' of #<Object>
  return o.b;
})();
```

2. 当 enumerable 或 writable 是`false`时, 再次将它们变成`true`则报错; 但当它们是`true`时, 却可以把它们变成`false` (
   注意必须是在`不可配置`的前提下, 如果属性`可配置`, enumerable 和 writable 可任意切换 true 和 false)

```js
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'yancey',
  configurable: false,
  writable: false,
});

// 当"writable"和"configurable"均为false时, 尝试将"writable"变为true会报错
// Uncaught TypeError: Cannot redefine property: name
Object.defineProperty(obj, 'name', { writable: true });
```

```js
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'yancey',
  configurable: false,
  writable: true,
});

// 但"writable"可成功从true切换到false
Object.defineProperty(obj, 'name', { writable: false });
```

3. 无论如何再次修改`get`和`set`都会报错, 因为两者的属性值是一个函数, 在 JS 中不可能存在一个相同的函数.

:::tip REVIEW
复杂数据类型在`栈`中存储**数据名**和一个**堆的地址**, 在`堆`中存储**属性**及**值**. 访问时先从栈获取地址, 再到堆中拿出相应的值.
:::

```js
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'yancey',
  configurable: false,
});

// Uncaught TypeError: Cannot redefine property: name
Object.defineProperty(obj, 'name', { get: function() {} });

// Uncaught TypeError: Cannot redefine property: name
Object.defineProperty(obj, 'name', { set: function() {} });
```

4. 只要`writable` 是 true, 可以`任意重新定义` value, 但当`writable`是 false 时, 需要看具体数据类型. 第一个例子中, 虽然 configurable 是 **false**, 但只要 writable 是 **true**, 便可以重新定义 value; 第二个例子中, value 是 `基本数据类型`, 所以再次定义 value 时只要覆盖原值即可; 第三个例子 value 是复杂数据类型, 同样因为 **堆栈** 问题而不能重新赋值.

```js {6}
const obj = {};

Object.defineProperty(obj, 'name', {
  value: [],
  configurable: false,
  writable: true,
});

// 任意重定义value不报错
Object.defineProperty(obj, 'name', { value: 123 }); // {name: 123}

// 任意重定义value不报错
Object.defineProperty(obj, 'name', { value: {}); // {name: {}}
```

```js {4,6}
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 123,
  configurable: false,
  writable: false,
});

// 当value是基本数据类型, 用原值覆盖不会报错
Object.defineProperty(obj, 'name', { value: 123 }); // {name: 123}

// 用其他值代替必然报错
Object.defineProperty(obj, 'name', { value: {}); // Uncaught TypeError: Cannot redefine property: name
```

```js {4,6}
const obj = {};

Object.defineProperty(obj, 'name', {
  value: [],
  configurable: false,
  writable: false,
});

// 当value是复杂数据类型, 修改value必定报错, 同样是堆栈的原因
Object.defineProperty(obj, 'name', { value: [] }); // {name: 123}
```

### Writable

如果某个属性的`writable`设为`false`, 那么该属性将不能被`赋值运算符`改变. 但属性值假如是数组时, 将不受 `push`, `splice`等方法的影响.

```js {5}
const obj = {};

Object.defineProperty(obj, 'hobby', {
  value: ['girl', 'music', 'sleep'],
  writable: false,
  configurable: true,
  enumerable: true,
});

// "writable: false"并不对push、shift等方法起作用
obj.hobby.push('drink');
obj.hobby; // ['girl', 'music', 'sleep', 'drink']

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// 当 hobby 被"赋值"给一个空数组时, 此属性的属性值不会被改变
obj.hobby = [];
obj.hobby; // ['girl', 'music', 'sleep', 'drink']

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// 而当使用"严格模式"时, 给一个"不可写"属性赋值将直接报错
(function() {
  'use strict';
  var o = {};
  Object.defineProperty(o, 'b', {
    value: 2,
    writable: false
  });
  o.b = 3; // throws TypeError: "b" is read-only
  return o.b; // 2
}());
```

### Enumerable

定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举

```js {11,16}
const obj = {
  name: 'yancey',
  age: 18,
  say() {
    return 'say something...';
  },
};

Object.defineProperty(obj, 'hobby', {
  value: ['girl', 'music', 'sleep'],
  enumerable: true,
});

Object.defineProperty(obj, 'income', {
  value: '10,000,000',
  enumerable: false,
});

// 以下迭代器均不能输出"不可枚举属性", 即"income"的相关信息
for (const i in obj) {
  console.log(obj[i]);
}
Object.keys(obj);
Object.values(obj);
Object.entries(obj);

obj.propertyIsEnumerable('income'); // false
```

### Getter & Setter

Getter 为读取属性时调用的函数. Setter 为设置属性是调用的函数, Setter 会有一个参数, 即设置的那个值.

下面的代码创建一个 obj 对象, 定义了两个属性 name 和 \_time, 注意 \_time 的下划线是一个常用记号, 用于表示`只能通过对象方法访问的属性`.
而访问器属性 time 则包含一个 getter 函数和一个 setter 函数. getter 函数返回`被修饰`的 \_time 的值, setter 则根据`被设置的值`修改 name.
因此当`obj.time = 2`, name 会变成`我为长者+2s`. 这是使用访问器属性的常见方式, 即设置一个属性的值会导致其他属性发生变化.

```js
const obj = {
  name: '长者',
  _time: 1,
};

Object.defineProperty(obj, 'time', {
  configurable: true,
  get() {
    return `default: ${this._time}s`;
  },
  set(newValue) {
    if (Number(newValue)) {
      this._time = newValue;
      this.name = `我为${this.name}+${newValue}s`;
    }
  },
});

obj.time; // 'default: 1s'
obj.time = 2; // 2
obj.name; // '我为长者+2s'
```

再看另一个例子, 通过 Object.defineProperty 劫持 `obj.input`, 将输入的值 **set** 到 id 为 `name` 的标签里. 这里便有了种 Vue.js 的味道, 推荐一篇文章 [剖析 Vue 实现原理 - 如何实现双向绑定 mvvm](https://github.com/DMQ/mvvm).

```js
<p>Hello, <span id='name'></span></p>
<input type='text' id='input'>

const obj = {
  input: '',
};

const inputDOM = document.getElementById('input');
const nameDOM = document.getElementById('name');

inputDOM.addEventListener('input', function (e) {
  obj.input = e.target.value;
})

Object.defineProperty(obj, 'input', {
  set: function (newValue) {
    nameDOM.innerHTML = newValue.trim().toUpperCase();
  }
})
```

![MVVM?](/mvvm.jpg)

最后看一个关于继承的例子, 我们创建了一个 **Person** 构造函数, 它包括两个参数: **firstName** 和 **lastName**, 此构造函数暴露出四个属性: **firstName**, **lastName**, **fullName**, **species**, 我们想让前三个属性动态变化, 最后一个属性是一个常量而不允许变化.

下面这段代码显然没有达到想要的效果: 在尝试修改 **firstName** 或 **lastName** 时, **fullName** 并没有实时被更新; **species**属性能随意被改变.

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = this.firstName + ' ' + this.lastName;
  this.species = 'human';
}

const person = new Person('Yancey', 'Leo');

// 虽然 firstName 和 lastName 被修改了, 但 fullName 仍然是 "Yancey Leo"
person.firstName = 'Sayaka';
person.lastName = 'Yamamoto';

// 我们定义了一个关于"人"的构造函数, 所以并不希望 species 被修改成 fish
person.species = 'fish';

// 当我们修改了 fullName, 也同样希望 firstName 和 lastName 被更新
person.fullName = 'Kasumi Arimura';
```

所以我们使用 Object.defineProperty() 重写这个例子. 需要注意的是: **被劫持的属性应放在原型里**. 通过下面这种方式, 即使创建多个实例, 也不会冲突,
所以可以放心使用.

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Object.defineProperty(Person.prototype, 'species', {
  value: 'human',
  writable: false,
});

Object.defineProperty(Person.prototype, 'fullName', {
  get() {
    return this.firstName + ' ' + this.lastName;
  },
  set(newValue) {
    const newValueArr = newValue.trim().split(' ');
    if (newValueArr.length === 2) {
      this.firstName = newValueArr[0];
      this.lastName = newValueArr[1];
    }
  },
});

const person = new Person('Yancey', 'Leo');

person.firstName = 'Sakaya';
person.lastName = 'Yamamoto';
person.fullName; // 'Sayaka Yamamoto'

person.fullName = 'Kasumi Arimura';
person.firstName; // 'Kasumi'
person.lastName; // 'Arimura'

person.species = 'fish';
person.species; // 'human'
```

## 扩展

除了 Object.defineProperty() 中的 Getter 和 Setter, 还有两种类似的方式.

### \_\_defineGetter\_\_ 和 \_\_defineSetter\_\_()

\_\_defineGetter\_\_ 方法可以为一个`已经存在`的对象设置 (新建或修改) 访问器属性, \_\_defineSetter\_\_ 方法可以将一个函数绑定在当前对象的指定属性上, 当那个属性被赋值时, 你所绑定的函数就会被调用.

```js
var o = {};
o.__defineGetter__('gimmeFive', function() {
  return 5;
});
o.gimmeFive; // 5
```

:::danger
该特性是非标准的, 请尽量不要在生产环境中使用它!

该特性已经从 Web 标准中删除, 虽然一些浏览器目前仍然支持它, 但也许会在未来的某个时间停止支持, 请尽量不要使用该特性.
:::

### 对象字面量中的 get 语法

对象字面量中的 get 语法只能在`新建一个对象`时使用.

```js
var o = {
  get gimmeFive() {
    return 5;
  },
};
o.gimmeFive; // 5
```

## 参考

[Vue 核心之数据劫持](https://juejin.im/entry/589ff26486b599006b3dea9b)

[不会 Object.defineProperty 你就 out 了](https://imweb.io/topic/56d40adc0848801a4ba198ce)

[vue.js 关于 Object.defineProperty 的利用原理](https://www.jianshu.com/p/07ba2b0c8fca)

[面试官: 实现双向绑定 Proxy 比 defineproperty 优劣如何?](https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf)

[JAVASCRIPT ES5: MEET THE OBJECT.DEFINEPROPERTY() METHOD](https://x-team.com/blog/es5-object-defineproperty-method/)

<style scope>
  img {
    margin: 0 auto;
    display: block;
  }
</style>
