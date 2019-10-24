---
id: flat
title: flat()
---

## 语法

```ts
flat(deep: number): [];
```

> WARNING
>
> 该方法目前只在 Chrome 69+, Firefox 62+, Safari 12+ 可以使用，Node 8.x 未实现此方法。

## 描述

该方法用于展平一个数组，参数是嵌套数组的结构深度，默认值为 1。

## 示例

```js
;[1, 2, [3]].flat() // [1, 2, 3]

;[1, 2, [3, [4, 5]]].flat() // [1, 2, 3, [4, 5]]

;[1, 2, [3, [4, 5]]].flat(2) // [1, 2, 3, 4, 5]
```

## 扩展

### 通过 reduce + concat 实现展平函数

reduce() 可以接受两个参数，第一个参数是回调函数，第二个参数是第一次调用回调函数时 acc 的初值，如果不传入此参数将会使用数组中的第一个元素。

单层展平方法。

```js
const flatSingle = arr => arr.reduce((acc, val) => acc.concat(val), [])
```

多层展平，可使用递归。

```js
const flattenDeep = arr =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    [],
  )
```
