# bind()

## 语法

```ts
bind(this: Function, thisArg: any, ...argArray: any[]): any;
```

## 描述

bind() 方法会创建一个新的函数，称为绑定函数。与 call() 和 apply() 不同的是，bind() 方法不会立即执行调用它的函数，而是返回对绑定函数的引用。在调用这个绑定函数时，thisArg 就会作为函数的 this。

## 示例

当一个对象某个属性的属性值是函数时，如果将这个函数赋给外部变量，就会发生 this 丢失的问题 (这是 this 经典的面试题之一)。我们可以通过 bind() 来 `硬绑定` 到原对象上。

```js
const o = {
  name: 'Yancey',
  greeting() {
    console.log(`Hello, ${this.name}`);
  },
};

// 这里会发生绑定丢失，运行时的 this 指向全局
const otherGreeting = o.greeting;

// 找不到 this.name
otherGreeting();

const anotherGreeting = otherGreeting.bind(o);
anotherGreeting(); // Hello, Yancey
```

此外，当你想要为一个需要特定的 `this` 值的函数创建一个 shortcut 的时候，可以使用 bind()。

我们在前面说到 call() 时，已经知道 `Array.prototype.slice` 可以将一个类数组对象转换成真正的数组。当时的写法如下：

```js
Array.prototype.slice.apply(arguments);
```

而使用 bind() 可以更加的简单，slice 是 Function.prototype 的 apply() 方法的绑定函数，并且将 Array.prototype 的 slice() 方法作为 this 的值。

```js
const sliceForLikeArray = Function.prototype.apply.bind(Array.prototype.slice);

function foo() {
  console.log(sliceForLikeArray(arguments));
}

foo('上帝啊', '请', '赐给我一个女孩吧'); // ["上帝啊", "请", "赐给我一个女孩吧"]
```

## 手写 bind 方法

```js
Function.prototype.bind2 = function(thisArg, ...args) {
  if (typeof this != 'function') {
    throw TypeError('not a function');
  }

  const fn = this;

  const resFn = function() {
    // this instanceof resFn === true 时,说明返回的 resFn 被当做 new 的构造函数调用
    return fn.call(this instanceof resFn ? this : thisArg, ...args);
  };

  function F() {}
  F.prototype = this.prototype;
  resFn.prototype = new F();

  return resFn;
};
```

## 附录：浅谈柯里化
