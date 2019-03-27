# Object.assign()  <Badge text="ES6"/>

用于将所有`可枚举`、`非继承`的属性从一个或多个源对象复制到目标对象，它将返回目标对象，其中第一个参数为目标对象，后面的参数为源对象。

## 语法

```ts
assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
```

## 描述

- `继承属性`和`不可枚举属性`将不会被拷贝

- 未传入源对象时，将返回原目标对象

- 由于`undefined`和`null`无法转成对象，所以不能将这两者作为源对象，否则报错

```js
Uncaught TypeError: Cannot convert undefined or null to object
```

- 如果目标对象和源对象具有相同的键，则该属性将被源对象中的属性覆盖；类似地，后面的源对象的属性将覆盖前面的源对象的属性

- 当源参数是基本数据类型时，它将会被包装(尝试转换成对象)，因为只有字符串的包装对象才可能有自身可枚举属性，所以其他基本类型会被忽略

- `Object.assign()`是`浅拷贝`，也就说如果源对象某个属性的属性值是`对象`，那么目标对象拷贝得到的只是这个对象的引用

## 示例

### 参数问题

若不传入参数，将会报错。

当参数只有一个且为引用类型时，直接返回该参数；若该参数是除 `undefined、null` 之外的基本数据类型，将会被包装为`对象`返回。如下面的例子返回 `true`

```js
Object.assign(100).__proto__ === new Number(100).__proto__
```

### 基本对象复制

```js
const source_1 = {
  name: 'Yancey',
  say() {},

// 源对象2因为后于源对象1，所以 name: 'Lucy' 会覆盖掉 name: 'yancey'
const source_2 = {
  name: 'Lucy',
  nullType: null,
}

// 字符串会先被转换成对象格式，即 {'0': 'l', '1': 'e', 2: 'o'}
const str = 'leo';

// 数字类型的变量会被忽略
const num = 123;

const copy = Object.assign({}, source_1, source_2, str, num)
```

示例输出：

    { '0': 'l',
    '1': 'e',
    '2': 'o',
    name: 'Lucy',
    age: 16,
    say: [Function: say],
    other: [],
    emptyProperty: null,
    eat: [Function: eat] }

### 浅拷贝

```js
const source = {
  food: {
    japaneseFood: ['sushi', 'udon']
  },
  name: 'Yancey'
}

const copy = Object.assign({}, source)

source.name = 'Leo'

source.food.japaneseFood = [...source.food.japaneseFood, 'natto']
```

打印出`copy`，可以发现`copy`的`name`属性的属性值还是`Yancey`，而`food.japaneseFood`却变成了`[ 'sushi', 'udon', 'natto' ]`

### 原型链上的属性（即继承属性）和不可枚举属性不可被拷贝

```js
const source = Object.create({
  type: 'husky'
}, {
  name: {
    value: 'lolita',
    enumerable: true,
  },
  gender: {
    value: 'girl',
    enumerable: false,
  },
})

const copy = Object.assign({}, source)
```

源中的`type`属性是`原型链上的属性`，而`gender`属性不可枚举，故最后输出`{ name: 'lolita' }`
