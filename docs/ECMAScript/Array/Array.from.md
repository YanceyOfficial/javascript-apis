# Array.from() <Badge text="ES6"/>

## 语法

```ts
from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
```

## 描述

该方法从一个类数组或可迭代对象中创建一个新的数组实例。该方法支持三个参数：

- 第一个参数是类数组对象或可迭代对象(如 Set，Map，Array)

- 给第一个参数执行的回调函数

- 第三个参数用来设置执行回调函数的 this

## 类数组对象

类数组对象是可以通过索引访问元素，并且拥有 length 属性，但它没有数组的其他方法，例如 push, forEach, indexOf 等。最经典的类数组对象是函数中的 `arguments`。此外，我们可以通过 **Array.prototype.slice.call()** 来将类数组对象转换为真正的数组，当然你也可以简单使用 **[].slice.call()**

```js
/*
 * 类数组对象
 */
const foo = {
  0: 'Java',
  1: 'Python',
  2: 'Scala',
  length: 3,
};

Array.prototype.slice.call(foo); // ['Java', 'Python', 'Scala']
[].slice.call(foo); // ['Java', 'Python', 'Scala']

/*
 * arguments 也是一个类数组对象
 */
function arrayLikeToArray() {
  return Array.prototype.slice.call(arguments, 0);
}

arrayLikeToArray('令', '和', '元', '年'); // [ '令', '和', '元', '年' ]
```

## 示例

如果第一个参数是基本数据类型，Number, Symbol, Boolean 类型的参数会返回一个空数组，null 和 undefined 直接报错（**Uncaught TypeError: Cannot convert undefined or null to object**），而字符串有可能会被转换成类数组对象。

```js
// 转换基本数据类型
Array.from(true); // []
Array.from(123); // []
Array.from(null); // 报错
Array.from('abc'); // ['a', 'b', 'c']

// 转换数组
Array.from([1, 2, 3]); // [1, 2, 3]

// 转换 Set 对象
const set = new Set();
set
  .add(1)
  .add(3)
  .add(5)
  .add(7)
  .add(9);
Array.from(set); // [1, 3, 5, 7, 9]

// 转换 Map 对象
const map = new Map();
map.set(true, 1).set(false, 0);
Array.from(map); // [[true, 1], [false, 0]]

// 转换类数组对象
const foo = {
  0: 'Java',
  1: 'Python',
  2: 'Scala',
  length: 3,
};
Array.from(foo); // ['Java', 'Python', 'Scala']
```

第二个参数接受一个回调函数，用于修饰新数组中的每个元素。

```js
const arr = [1, 2, 3];
const foo = value => (value *= 2);
Array.from(arr, foo); // [2, 4, 6]
```

第三个参数是执行回调函数的 this，我们可以将被处理的数据和处理对象分离，将各种不同的处理数据的方法封装到不同的的对象中去。

```js
const obj = {
  add: function(n) {
    return n + 1;
  },
};

function add(x) {
  return this.add(x);
}

Array.from([1, 2, 3, 4, 5], add, obj); // [2, 3, 4, 5, 6]
```

## 扩展

获取 dom 集合的方式有两种，分别是：

```js
const dom = document.querySelectorAll('.some-class');
const dom1 = document.getElementsByClassName('.some-class');
```

第一个返回 NodeList，第二个返回 HTMLCollection，两者都是类数组，都可以使用 Array.from() 和 Array.prototype.slice.call() 将它变成数组。

## 参考

[Array.prototype.slice.call()方法详解](https://blog.csdn.net/i10630226/article/details/49702375)

[JavaScript 类数组对象](https://segmentfault.com/a/1190000005764629)

[ES6 中的 Array.from()函数的用法](https://www.cnblogs.com/zuobaiquan01/p/10169495.html)
