# bind()

## 语法

```ts
bind(this: Function, thisArg: any, ...argArray: any[]): any;
```

## 描述

## 示例


```js
```

## 手写 bind 方法

```js
Function.prototype.bind2 = function(thisArg) {
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
