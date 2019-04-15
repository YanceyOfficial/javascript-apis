# 手摸手教你实现一个遵循 Promise/A+ 规范的 Promise

> Hello, promise

## 异步

## 回调

## 何为 Promise

《你不知道的 JavaScript (中卷)》举了一个有趣的例子：

我在快餐店点了一个汉堡，并支付了 1.07 美金。这意味着我对某个值（汉堡）发出了请求。

接着收银员给我一张 `取餐单据`，它保证了我最终会得到汉堡，因此 `取餐单据` 就是一个 `承诺`。

在等待取餐的过程中，我可以做点其他的事情，比如刷刷女神的微博，看看 [996.icu](https://github.com/996icu/996.ICU) 今天又涨了多少 star。之所以我可做点儿其他的事情，是因为 `取餐单据` 代表了我 `未来的` 汉堡。它在某种意义上已经成了汉堡的 `占位符`。从本质上来讲，这个 `占位符` 使得这个值不再依赖时间，这是一个 `未来值`。

终于，我听到服务员在喊 `250号前来取餐`，我就可以拿着 `取餐单据` 换我的汉堡了。~~结果座位被别人占了。~~

但是可能还有另一种结果，在我去取餐时，服务员充满抱歉的告诉我汉堡已经售罄了，除了愤怒，我们还可以看到 `未来值` 可能成功，也可能失败。

## Promise 生命周期

每个 Promise 都会经历一个短暂的生命周期：先是处于 `进行中 (pending)`，此时操作尚未完成，因此它也是 `未处理 (unsettled)` 的；一旦异步操作执行结束，Promise 变成 `已处理 (settled)` 状态，此时它会进入到以下两个状态中的其中一个：

- Fulfilled：Promise 异步操作成功完成

- Rejected：由于程序错误或其他原因，异步操作未能成功完成

Pending -> Fulfilled
Pending -> Rejected

## Promise 的 then 方法

then() 方法接收两个函数作为参数，第一个作为 `完成` 时的回调，第二个作为 `拒绝` 时的回调。两个参数均为可选，因此你可以只监听 `完成`，或者只监听 `拒绝`。其中当第一个参数为 `null`，第二个参数为回调函数时，它意味着监听 `拒绝`。因此为了更好的处理异步请求结果，`完成` 和 `拒绝` 都应当被监听。

```js
const promise = new Promise((resolve, reject) => {
  resolve('success');
});

// 监听完成和拒绝
promise.then(
  res => {
    // 完成
    console.log(res);
  },
  e => {
    // 拒绝
    console.log(e);
  },
);

// 只监听完成
promise.then(res => {
  console.log(res);
});

// 第一个参数为 null 时意味着拒绝
promise.then(null, res => {
  // 完成
  console.log(res);
});
```

Promise 还有两个方法分别是 catch() 和 finally()，前者用于监听 `拒绝`，后者无论成功失败都会被执行到。这种链式调用的方式显然比上面的写法更加清晰明了，因此强烈推荐此模型。

```js
promise
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  })
  .finally(() => {
    console.log('无论成功失败都会执行这句');
  });
```

我们通过一个读取文件的小例子来复习一下：

```js
const fs = require('fs');

const promise = path =>
  new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/' + path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });

promise('someFile.js')
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  });
```

## 执行器错误

在执行器内部跑出一个错误，它会被 catch() 方法捕获。

```js
const promise = new Promise((resolve, reject) => {
  throw new Error('执行器内部抛出错误');
});

promise.catch(e => {
  console.log(e.message); // '执行器内部抛出错误'
});
```

因为每个执行器都隐含一个 try-catch 块，所以错误会被捕获并传入拒绝处理函数。此例等价于下面的代码。后面我们手写 Promise 的时候要把 executor() 放到一个 try-catch 语句块中。

```js
const promise = new Promise((resolve, reject) => {
  try {
    throw new Error('执行器内部抛出错误');
  } catch (e) {
    reject(e);
  }
});

promise.catch(e => {
  console.log(e.message); // '执行器内部抛出错误'
});
```

## 串联 Promise

每次调用 then() 或 catch() 方法时都会创建并返回一个新的 Promise，只有当第一个 Promise 完成或被拒绝后，第二个才会被解决。

看下面这个例子，p.then() 完成后返回第二个 Promise，接着又调用了它的 then() 方法，也就是说只有当第一个 Promise 被解决之后才会调用第二个 then() 方法的 `then()` 。

```js
let p = new Promise((resolve, reject) => {
  resolve(42);
});

p.then(value => {
  console.log(value); // 42
}).then(() => {
  console.log('可以执行到'); // '可以执行到'
});
```

将上述示例拆开，看起来是这样的。调用 p1.then() 的结果被存储到 p2 中，p2.then() 被调用来添加最终的 `then()` 。

```js
let p1 = new Promise((resolve, reject) => {
  resolve(42);
});

let p2 = p1.then(value => {
  console.log(value);
});

p2.then(() => {
  console.log('可以执行到');
});
```

### 捕获错误

当 then() 方法或者 catch() 方法抛出错误时，链式调用的下一个 Promise 中的 catch() 方法可以通过 `catch()` 接收这个错误。侧面来讲，异常不一定只发生在 Promise 中，还有可能发生在 `then()` 或者 `catch()` 中。

```js
let p1 = new Promise((resolve, reject) => {
  resolve(42);
});

p1.then(value => {
  throw new Error(' `then()` 错误');
}).catch(e => {
  console.log(e.message); // ' `then()` 错误'
});
```

不仅 `then()` 可以抛出异常，`catch()` 也可以抛出的异常，且可以被下一个 `catch()` 捕获。因此，无论如何都应该在 Promise 链的末尾留一个 `catch()` ，以保证能够正确处理所有可能发生的错误。看下面这个例子。

```js
let p1 = new Promise((resolve, reject) => {
  throw new Error('执行器错误');
});

p1.catch(e => {
  console.log(e.message); // '执行器错误'
  throw new Error(' `catch()` 错误');
}).catch(e => {
  console.log(e.message); // ' `catch()` 错误'
});
```

### Promise 链的返回值

上面的例子可能实际意义并不大，在处理程序中抛出异常...我暂时没能想出现实场景。但是 Promise 链的返回值却很常见。

下面是获取城市天气的场景：我们首先需要调用 `getCity` 接口来获取 `城市id`，接着调用 `getWeatherById/城市id` 来获取城市的天气信息。

首先用 Promise 封装一个原生 Ajax。（敲黑板，面试可能要求手写）

```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();
  });

  return promise;
};

const baseUrl = 'https://5cb322936ce9ce00145bf070.mockapi.io/api/v1';
```

第一种方式，直接在第一个 `then()` 中调用第二个接口。

```js
getJSON(`${baseUrl}/getCity`)
  .then(value => getJSON(`${baseUrl}/getWeatherById/${value.cityId}`))
  .then(value => console.log(value))
  .catch(e => {
    console.log(e);
  });
```

第二种方式，我们在第一个 `then()` 中将值作为返回值，以参数的形式传递给下游 Promise，第二个 `then()` 同样可以接收到上一个 `then()` 的值。这个例子可能不太合理... 毕竟比上面那个多出一个 then()，不过可以说明的是，返回值可以供给下一个处理程序使用。

```js
getJSON(`${baseUrl}/getCity`)
  .then(value => {
    return value;
  })
  .then(value => {
    getJSON(`${baseUrl}/getWeatherById/${value.cityId}`).then(value => {
      console.log(value);
    });
  })
  .catch(e => {
    console.log(e);
  });
```

下面再看一个稍微清晰点儿的例子。

```js
let p1 = new Promise((resolve, reject) => {
  resolve(42);
});

p1.then(value => {
  throw new Error(' `then()` 错误');
}).catch(e => {
  console.log(e.message); // ' `then()` 错误'
});
```

看一个面试题，想想会输出什么？

```js
function task() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('task');
    }, 1000);
  });
}

task()
  .then(res => {
    console.log(res);
    return 'taskB';
  })
  .then(res => {
    console.log(res);
    return 'taskC';
  })
  .then(res => {
    console.log(res);
    throw new Error();
  })
  .catch(e => {
    console.log(e);
    return 'taskD';
  })
  .then(res => {
    console.log(res);
  });
```
