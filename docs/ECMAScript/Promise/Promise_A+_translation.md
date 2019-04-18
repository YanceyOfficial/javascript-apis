# Promise A+ 规范

**一个开放、可靠且通用的 JavaScript Promise 标准。由开发者制定，供开发者参考。**

_promise_ 代表着一个异步操作的最终结果，与之交互的主要方式是它的 `then` 方法，该方法注册了两个回调函数，用于接收 promise 最终的值或者失败的原因。

该规范详细描述了 `then` 方法的行为，所有遵循 Promises/A+ 规范实现的 promise 均可以本标准作为参照基础来实施。因此，这份规范是很稳定的。虽然 Promises/A+ 组织偶尔会修订这份规范，但大多是为了处理一些特殊的边界情况。这些改动都是微小且向下兼容的。如果我们要进行大规模不兼容的更新，我们一定会在事先进行谨慎地考虑、详尽的探讨和严格的测试。

最后，核心的 Promises/A+ 规范不会提供如何创建、解决和拒绝 promise，而是专注于提供一个通用的 `then` 方法。上述对于 promises 的操作方法将来在其他规范中可能会提及。

## 1. 术语

1.1. 'promise' 是一个拥有 `then` 方法的对象或者函数，且其行为符合此规范。

1.2. 'thenable' 是一个用来定义 `then` 方法的对象或者函数。

1.3. 'value' 是任何一个合法的 JavaScript 值 (包括 `undefined`，thenable 或者 promise)

1.4. 'exception' 是一个使用 throw 语句抛·出的值

1.5. 'reason' 表明了一个 promise 为什么会被拒绝

## 2. 要求

### 2.1. Promise 状态

promise 必须是三个状态之一：等待态(Pending)、执行态(Fulfilled)和拒绝态(Rejected)。

- 2.1.1. 当前状态为 pending 时，一个 promise：

  - 2.1.1.1 可以转换成 fulfilled 或者 rejected 状态

- 2.1.2. 当前状态为 fulfilled 时，一个 promise：

  - 2.1.2.1 不能再转换成其他任何状态

  - 2.1.2.2 必须拥有一个不可变的值

- 2.1.3. 当前状态为 rejected 时，一个 promise：

  - 2.1.3.1 不能再转换成其他任何状态

  - 2.1.3.2 必须拥有一个不可变的原因

这里的不可变指的是恒等(即可用 === 判断相等)，而不是意味着更深层次的不可变。(即当 value 或者 reason 为引用类型时，只要求引用地址相等即可，但属性值可以被修改)

### 2.2. `then` 方法

promise 必须提供一个 `then` 方法以访问它当前或最终的值或被拒绝的原因。

一个 promise 的 `then` 方法接收两个参数：

```js
promise.then(onFulfilled, onRejected);
```

- 2.2.1 `onFulfilled` 和 `onRejected` 都是可选参数。

  - 2.2.1.1 如果 `onFulfilled` 不是个函数，它将被忽略

  - 2.2.1.2 如果 `onRejected` 不是个函数，它将被忽略

- 2.2.2 如果 `onFulfilled` 是一个函数：

  - 2.2.2.1 它必须在 `promise` 完成式后被调用，并且以 `promise` 的值作为它的第一个参数。

  - 2.2.2.2 在 `promise` 未完成前不可调用

  - 2.2.2.3 此函数仅可调用一次

- 2.2.3 如果 `onRejected` 是一个函数：

  - 2.2.3.1 它必须在 `promise` 被拒绝后被调用，并且以 `promise` 的原因作为它的第一个参数。

  - 2.2.3.2 在 `promise` 未被拒绝前不可调用

  - 2.2.3.3 此函数仅可调用一次

- 2.2.4 `onFulfilled` 和 `onRejected` 只有在 [执行上下文](https://es5.github.io/#x10.3) 堆栈仅包含平台代码时才可被调用。[^3.1]

- 2.2.5 `onFulfilled` 和 `onRejected` 必须被作为函数调用 (即没有 this 值)。[^3.2]

- 2.2.6 `then` 在相同的 promise 可以被调用多次

  - 2.2.6.1 当 `promise` 是完成态， 所有相应的 `onFulfilled` 回调必须按其原始调用的顺序执行。

  - 2.2.6.2 当 `promise` 是拒绝态，所有相应的 `onRejected` 回调必须按其原始调用的顺序执行。

- 2.2.7 每个 `then` 方法必须返回一个 promise [^3.3]。

  ```js
  promise2 = promise1.then(onFulfilled, onRejected);
  ```

  - 2.2.7.1 如果 `onFulfilled` 或者 `onRejected` 返回一个值 `x` ，则运行下面的 Promise 解决过程：`[[Resolve]](promise2, x)`

  - 2.2.7.2 如果 `onFulfilled` 或者 `onRejected` 抛出一个异常 `e` ，则 `promise2` 必须拒绝执行，并返回拒因 `e`

  - 2.2.7.3 如果 `onFulfilled` 不是函数且 `promise1` 成功执行， `promise2` 必须成功执行并返回相同的值

  - 2.2.7.4 如果 `onRejected` 不是函数且 `promise1` 拒绝执行， `promise2` 必须拒绝执行并返回相同的拒因

### 2.3. Promise 解决过程

**Promise 解决过程**是一个抽象的操作，它接收一个 promise 和一个值，我们可以表示为 `[[Resolve]](promise, x)`，如果 `x` 是一个 thenable 的对象，解决程序将试图接受 `x` 的状态，否则用 `x` 的值来执行 `promise`。

这种对 thenales 的处理使得 promise 的实现更加有普适性，只要它暴露出一个兼容 Promises/A+ 规范的 `then` 方法。它还允许让遵循 Promise/A+ 规范的实现和不太规范但可用的实现良好共存。

为了运行 `[[Resolve]](promise, x)`，要执行下面的步骤：

- 2.3.1 如果 `promise` 和 `x` 指向同一个对象，将以 `TypeError` 作为拒因拒绝执行 `promise`。

- 2.3.2 如果 `x` 是一个 promise，那么将 promise 将接受它的状态 [^3.4]：

  - 2.3.2.1 如果 `x` 是等待态，`promise` 必须保留等待状态直到 `x` 被完成或者被拒绝。

  - 2.3.2.2 如果 `x` 是完成态，用相同的值执行 `promise`

  - 2.3.2.3 如果 `x` 是拒态，用相同的原因拒绝 `promise`

- 2.3.3 如果 `x` 是一个对象或者是一个函数，

  - 2.3.3.1 把 `x.then` 赋值给 `then`。[^3.5]

  - 2.3.3.2 如果取 `x.then` 的值时抛出错误 `e`，则以 `e` 为拒因拒绝 `promise`

  - 2.3.3.3 如果 `then` 是函数，将 `x` 作为函数的作用域 `this` 来调用它。传递两个回调函数作为参数，第一个参数叫做 `resolvePromise`，第二个参数叫做 `rejectPromise`:

    - 2.3.3.3.1 如果 `resolvePromise` 以 `y` 为参数被调用，执行 `[[Resolve]](promise, y)`

    - 2.3.3.3.2 如果 `rejectPromise` 以 `r` 为原因被调用，则以拒因 `r` 拒绝 promise

    - 2.3.3.3.3 如果 `resolvePromise` 和 `rejectPromise` 都被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用。

    - 2.3.3.3.4 如果调用 `then` 抛出一个异常 `e`

      - 2.3.3.3.4.1 如果 `resolvePromise` 和 `rejectPromise` 都被调用，则忽略掉它

      - 2.3.3.3.4.2 否则，以 `e` 为拒因拒绝这个 `promise`

  - 2.3.3.4 如果 `then` 不是个函数，则以 `x` 为参数执行 `promise`

- 2.3.4 如果 `then` 不是个函数或者对象，则以 `x` 为参数执行 `promise`

如果一个 promise 被一个循环的 thenable 链中的对象解决，而 `[[Resolve]](promise, thenable)` 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 TypeError 为拒因来拒绝 promise [^3.6]。

## 3. 注释

[^3.1]: 这里的“平台代码”意味着引擎，环境和 promise 实施代码，在实践中要确保 `onFulfilled` 和 `onRejected` 异步执行，且应该在 `then` 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制，类似于 `setTimeOut` 或者 `setImmediate`，也可以使用“微任务（micro-task）”机制来实现，类似于 `MutationObserver` 或 `process.nextTick`。因为 promise 实现被认为是平台代码，所以它本身可能包含一个任务调度队列或跳板，在其中调用处理程序。

[^3.2]: 在严格模式下 `this` 为 `undefined`，而在非严格模式中，`this` 为全局对象。

[^3.3]: 代码实现在满足所有要求的情况下可以允许 `promise2 === promise1` 。每个实现都要文档说明其是否允许以及在何种条件下允许 `promise2 === promise1` 。

[^3.4]: 总体来说，如果 `x` 符合当前实现，我们才认为它是真正的 promise 。这一规则允许那些特例实现接受符合已知要求的 Promises 状态。

[^3.5]: 这步我们先是存储了一个指向 `x.then` 的引用，然后测试并调用该引用，以避免多次访问 `x.then` 属性。这种预防措施确保了该属性的一致性，因为其值可能在检索调用时被改变。

[^3.6]: 实现不应该对 thenable 链的深度设限，并假定超出本限制的递归就是无限循环。只有真正的循环递归才应能导致 `TypeError` 异常；如果一条无限长的链上 thenable 均不相同，那么递归下去永远是正确的行为。
