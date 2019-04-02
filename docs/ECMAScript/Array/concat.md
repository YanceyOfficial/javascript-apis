# concat()

## 语法

```ts
concat(...items: ConcatArray<T>[]): T[];
```

## 描述

用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。当合并一个对象时，原始数组和新数组都引用相同的对象（浅拷贝）。

## 示例

```js
// 可以合并多个数组。
[1, 2, 3].concat([4, 5, 6], [7, 8, 9]); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// 可以合并基本数据类型
[1, 2, 3].concat(true, 100, 'abc', undefined, null, Symbol('age'));
// [ 1, 2, 3, true, 100, 'abc', undefined, null, Symbol(age) ]

const obj = {
  name: 'yancey',
  hobbies: ['music', 'football'],
};
const arr4 = [1, 2, 3].concat(obj);

// 当我们修改了新数组的元素时
arr4[3].name = 'sayaka';
arr4[3].hobbies.push('coding');

// 原对象也同时发生了改变
obj; // { name: 'sayaka', hobbies: [ 'music', 'football', 'coding' ] }
```