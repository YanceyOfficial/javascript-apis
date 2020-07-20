---
id: assign
title: Object.assign()
---

## 语法

```ts
assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
```

## 描述

用于将所有 `可枚举` 、`非继承` 的属性（可以是 Symbol）从一个或多个源对象复制到目标对象，它将返回目标对象。其中第一个参数为目标对象，剩余参数为源对象。

- 如果目标对象和源对象具有相同的属性，则该属性将被源对象中的属性覆盖；类似地，后面的源对象的属性将覆盖前面的源对象的属性

- 当源参数是基本数据类型时，null 和 undefined 会被忽略，其他类型会被转换成对象。由于只有字符串的包装对象才可能有自身可枚举属性，所以其他基本类型作为源参数会被忽略

- 如果源对象某个属性的属性值是 `对象`，那么目标对象拷贝得到的只是这个对象的引用（浅拷贝）

## 示例

### 参数问题

不传入任何参数直接报错：**Uncaught TypeError: Cannot convert undefined or null to object**.

不能将 `undefined` 和 `null` 作为源对象，否则报错，同屋类型同上，因为两者不能被转换成对象类型。

当参数只有一个且为引用类型时，直接返回该参数；若该参数是除 `undefined、null` 之外的基本数据类型，将会执行装箱操作。

```js
// 以下三个全部报错
Object.assign()
Object.assign(undefined)
Object.assign(null)

// 当只有一个参数且参数为引用类型时直接返回该参数
Object.assign([1, 2, 3]) // [1, 2, 3]

// 除 undefined 和 null 以外的基本数据类型会被包装成对象形式
Object.assign(100).__proto__ === new Number(100).__proto__ // true
```

### 基本数据类型会被包装成对象

当源参数是基本数据类型时，null 和 undefined 会被忽略，其他类型会被转换成对象。由于只有字符串的包装对象才可能有自身可枚举属性，所以其他基本类型作为源参数会被忽略。

```js
// null undefined number boolean sysmbol 将会被忽略
Object.assign({}, 0, 'abc', Symbol('name'), null, undefined, true) // { '0': 'a', '1': 'b', '2': 'c' }
```

### 数组会被转换成类数组对象

下面这个例子中, 第一个数组 `[1, 2, 3]` 被转换成 `{'0': 1, '1': 2, '2': 3}`, 第二个数组 `[4, 5]` 被转换成 `{'0': 4, '1': 5}`, 后面的类数组对象将前面的类数组对象的同名属性覆盖, 故结果为 `[4, 5, 3]`

![数组会被转换成类数组对象](/img/docImages/assignLikedArray.jpg)

再看一个例子, 第一个是数组, 第二个是对象, 两者 assgin 变成了如下的样子:

![数组会被转换成类数组对象](/img/docImages/assignLikedArray2.jpg)

### 简单的对象复制

```js
const target = {
  name: 'Sayaka',
}

// 源对象1会覆盖掉与目标对象相同的属性，所以 name: 'Yancey' 会覆盖掉 name: 'Sayaka'
const source_1 = {
  name: 'Yancey',
  say() {},
}

// 源对象2因为后于源对象1，所以 name: 'Lucy' 会覆盖掉 name: 'Yancey'
const source_2 = {
  name: 'Lucy',
  nullType: null,
}

Object.assign(target, source_1, source_2) // { name: 'Lucy', say: [Function: say], nullType: null }
```

### 浅拷贝

如果源对象中某个属性的属性值是 `对象`，那么目标对象拷贝得到的只是这个对象的引用。

看下面这个例子，拷贝一个对象 source 之后，我们分别修改 **source.name** 和 **source.food.japaneseFood** 的值，打印出来发现 **copy.name** 还是 `Yancey`，而 **copy.food.japaneseFood** 却变成了 `['sushi', 'udon', 'natto']`，也就是说拷贝之后 **copy.food** 和 **source.food** 仍然指向的是同一个堆。

```js
const source = {
  food: {
    japaneseFood: ['sushi', 'udon'],
  },
  name: 'Yancey',
}

const copy = Object.assign({}, source)

// 分别修改 name 属性和 food 属性
source.name = 'Sayaka'
source.food.japaneseFood = [...source.food.japaneseFood, 'natto']

copy.name // 'Yancey'

copy.food.japaneseFood // ['sushi', 'udon', 'natto']

// 两者指向了同一个堆
copy.food === source.food // true
```

### 异常会打断后续拷贝

拷贝的源对象是按顺序读取，一旦中途出错，将停止拷贝。

```js
const target = Object.defineProperty({}, 'foo', {
  value: 1,
  writable: false,
})

// 直接报错
// TypeError: Cannot assign to read only property 'foo' of object '#<Object>'
Object.assign(
  target,
  {
    bar: 2,
  },
  {
    foo2: 3,
    // 错误出在了这一行
    foo: 3,
    foo3: 3,
  },
  {
    baz: 4,
  },
)

target.bar // 2
target.foo2 // 3

// 拷贝终止
target.foo // 1
target.foo3 // undefined
target.baz // undefined
```

## 扩展

### 给类添加属性

传统上我们给类添加属性是这样的，虽然无伤大雅，但还是有些繁琐。所以我们可以使用 Object.assign()，并且 在 ES6 中，当对象的属性和形参一样时，可以省略属性值，这就更方便了。

```js
class Rectangle {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
}

// use Object.assign()
class Rectangle {
  constructor(width, height) {
    Object.assign(this, { width, height })
  }
}
```

### 给构造函数批量添加方法

回到传统 ES5 的面向对象，我们一般会把方法挂载到构造函数的原型上，老方法是一个一个的在原型上添加，而现在使用 Object.assign() 可以一次性批量添加。

```js
function Dog(name) {
  this.name = name
}

Dog.prototype.say = () => {
  return 'say something...'
}
Dog.prototype.bark = () => {
  return 'yamette...'
}

// use Object.assign()
Object.assign(Dog.prototype, {
  say() {
    return 'say something...'
  },
  bark() {
    return 'yamette...'
  },
})
```

### Object.assign() "四宗罪"

- 只能拷贝源对象的可枚举的自身属性

- 无法拷贝属性的特性们

- 访问器属性会被转换成数据属性

- 无法拷贝源对象的原型

后面的章节在讲到 Object.getOwnPropertyDescriptors 时会来解决这个问题，具体可以戳 [解决 Object.assign() 浅拷贝问题](/ES/Object/getOwnPropertyDescriptors#%E8%A7%A3%E5%86%B3-objectassign-%E6%B5%85%E6%8B%B7%E8%B4%9D%E9%97%AE%E9%A2%98)。
