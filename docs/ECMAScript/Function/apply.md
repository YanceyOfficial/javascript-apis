# apply()

## 语法

```ts
apply(this: Function, thisArg: any, argArray?: any): any;
```

## 描述

该方法是 call 的语法糖，它的第一个参数和 call 方法相同，但第二个参数接收一个数组或者类数组，而 call 从第二个参数起接收一个参数序列。

## 示例

关于 apply，最经典的示例应该就是 Math.max() 传参的问题了。

```js
Math.max(1, 2, 3); // 3
Math.max.apply(this, [1, 2, 3]); // 3
Math.max(...[1, 2, 3]); // 3
```

## 手写 apply 方法

```js
Function.prototype.apply2 = function(thisArg) {
  const fn = Symbol('fn');

  if (!thisArg || thisArg === null || thisArg === undefined) {
    thisArg = window;
  }

  const packing = Object(thisArg);
  packing[fn] = this;

  if (arguments[1]) {
    const result = packing[fn](...arguments[1]); // 关键步骤
    delete packing[fn];
    return result;
  } else {
    const result = packing[fn]();
    delete packing[fn];
    return result;
  }
};
```

## 为什么 call 的性能比 apply 性能高？

### apply 运行原理

1、当函数不可调用时，直接抛出一个 TypeError 的异常。

2、如果 `argArray` 为 null 或者 undefined 或者未声明，则返回调用 Function 的 [[Call]] 内部方法的结果，提供 thisArg 和一个空数组作为参数。

3、如果 `argArray` 不是对象，则抛出 TypeError 异常。

4、获取 `argArray` 的长度。调用 `argArray` 的 [[Get]] 内部方法，找到属性 length。 赋值给 len。

5、定义 n 为 ToUint32。

6、初始化 argList 为一个空列表。

7、初始化 index 为 0。

8、循环迭代取出 argArray。重复循环 while（index < n）

- a、将下标转换成 String 类型。初始化 indexName 为 ToString(index)。
- b、定义 nextArg 为 使用 indexName 作为参数调用 argArray 的[[Get]]内部方法的结果。
- c、将 nextArg 添加到 argList 中，作为最后一个元素。
- d、设置 index ＝ index + 1

9、返回调用 Function 的 `[[Call]]` 内部方法的结果，提供 thisArg 作为该值，argList 作为参数列表。

### call 运行原理

1、当函数不可调用时，直接抛出一个 TypeError 的异常。

2、定义 argList 为一个空列表。

3、如果使用超过一个参数调用此方法，则以从 arg1 开始的从左到右的顺序将每个参数附加为 argList 的最后一个元素

4、返回调用 func 的[[Call]]内部方法的结果，提供 thisArg 作为该值，argList 作为参数列表。

综上所述，call 接收的参数序列正是引擎内部所需要的格式，而 apply 仅仅是 call 的语法糖，在编译过程需要做一定的格式转换。
