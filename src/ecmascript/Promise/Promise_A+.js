const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
  constructor(executor) {
    // state 的初始状态为等待态
    this.state = PENDING

    // 成功的值 (1.3)
    this.value = undefined

    // 失败的原因 (1.5)
    this.reason = undefined

    // 因为 then 在相同的 promise 可以被调用多次，所以需要将所有的 onFulfilled 存到数组 (2.2.6)
    this.onResolvedCallbacks = []

    // 因为 then 在相同的 promise 可以被调用多次，所以需要将所有的 onRejected 存到数组 (2.2.6)
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      // 只有当前是 pending，才可能转换为 fulfilled
      // 并且不能再转换成其他任何状态，且必须拥有一个不可变的值
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        // onFulfilled 回调按原始调用顺序依次执行 (2.2.6.1)
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }

    const reject = (reason) => {
      // 只有当前是 pending，才可能转换为 rejected
      // 并且不能再转换成其他任何状态，且必须拥有一个不可变的原因
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        // onRejectec 回调按原始调用顺序依次执行 (2.2.6.1)
        this.onRejectedCallbacks.forEach((fn) => fn()) // (2.2.6.2)
      }
    }

    // 若 executor 报错，直接执行 reject()
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled 和 onRejected 都是可选参数 (2.2.1)

    // 如果 onFulfilled 不是函数，则必须将它忽略 (2.2.1.1)
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value

    // 如果 onRejected 不是函数，则必须将它忽略 (2.2.1.2)
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err
          }

    // 为了做到链式调用，规定每个 then 方法必须返回一个 promise，称为 promise2
    const promise2 = new Promise((resolve, reject) => {
      // 在 promise 完成后方可调用 onFulfilled (2.2.2)
      if (this.state === FULFILLED) {
        // onFulfilled/onRejected 必须被异步调用，因此我们用延时函数模拟 (2.2.4)
        setTimeout(() => {
          try {
            // value 作为完成函数的第一个参数 (2.2.2.1)
            // onFulfilled 函数被记做 x (2.2.7.1)
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            // 如果 onFulfilled/onRejected 抛出异常，则 promise2 必须拒绝执行，并返回拒因 e (2.2.7.2)
            reject(e)
          }
        }, 0)
      }

      // 在 promise 被拒绝后方可调用 onRejected (2.2.3)
      if (this.state === REJECTED) {
        // onFulfilled/onRejected 必须被异步调用，因此我们用延时函数模拟 (2.2.4)
        setTimeout(() => {
          try {
            // reason 作为拒绝函数的第一个参数 (2.2.3.1)
            // onRejected 函数被记做 x (2.2.7.1)
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            // 如果 onFulfilled/onRejected 抛出异常，则 promise2 必须拒绝执行，并返回拒因 e (2.2.7.2)
            reject(e)
          }
        }, 0)
      }

      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // onFulfilled/onRejected 必须被异步调用，因此我们用延时函数模拟 (2.2.4)
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              // 如果 onFulfilled/onRejected 抛出异常，则 promise2 必须拒绝执行，并返回拒因 e (2.2.7.2)
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          // onFulfilled/onRejected 必须被异步调用，因此我们用延时函数模拟 (2.2.4)
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              // 如果 onFulfilled/onRejected 抛出异常，则 promise2 必须拒绝执行，并返回拒因 e (2.2.7.2)
              reject(e)
            }
          }, 0)
        })
      }
    })

    // 返回 promise2 (2.2.7)
    return promise2
  }

  // catch 实际是 then 的语法糖
  catch(fn) {
    return this.then(null, fn)
  }

  finally(fn) {
    return this.then(
      (value) => Promise.resolve(fn()).then(() => value),
      (reason) =>
        Promise.resolve(fn()).then(() => {
          throw reason
        }),
    )
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  // 如果 promise 和 x 指向同一个对象，将以 TypeError 作为拒因拒绝执行 promise (2.3.1)
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }

  // onFulfilled 和 onRejected 只能被调用一次，因此这里加一个 flag 作为判断 (2.2.2.3 & 2.2.3.3)
  let isCalled = false

  // 如果 x 是一个对象或者是一个函数 (2.3.3)
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // (2.3.3.1)
      const then = x.then

      // 如果 then 是函数，就以 x 作为 this 调用它 (2.3.3.2 & 2.3.3.3)
      if (typeof then === 'function') {
        // 后面接收两个回调，第一个是成功的回调，第二个是失败的回调 (2.3.3.3)
        then.call(
          x,
          (y) => {
            if (isCalled) return
            isCalled = true
            // 如果 resolvePromise 以 y 为参数被调用，执行 [[Resolve]](promise, y) (2.3.3.3.1)
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (isCalled) return
            isCalled = true
            // 如果 rejectPromise 以 r 为原因被调用，则以拒因 r 拒绝 promise (2.3.3.3.2)
            reject(r)
          },
        )
      } else {
        // 如果 then 不是个函数，则以 x 为参数执行 promise (2.3.3.4)
        resolve(x)
      }
    } catch (e) {
      if (isCalled) return
      isCalled = true
      // 如果取 x.then 报错，则以 e 为拒因拒绝 `promise` (2.3.3.2)
      reject(e)
    }
  }
  // 如果 then 不是个函数或者对象，则以 x 为参数执行 promise (2.3.4)
  else {
    resolve(x)
  }
}

// Promise.resolve
Promise.resolve = function (promises) {
  if (promises instanceof Promise) {
    return promises
  }
  return new Promise((resolve, reject) => {
    if (promises && promises.then && typeof promises.then === 'function') {
      setTimeout(() => {
        promises.then(resolve, reject)
      })
    } else {
      resolve(promises)
    }
  })
}

// Promise.reject
Promise.reject = (reason) => new Promise((resolve, reject) => reject(reason))

// Promise.all
Promise.all = (promises) => {
  return new Promise((resolve, reject) => {
    let resolvedCounter = 0
    let n = promises.length
    let resolvedValues = []

    promises.forEach((promise, i) => {
      Promise.resolve(promise).then(
        (value) => {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter === n) {
            return resolve(resolvedValues)
          }
        },
        (reason) => {
          return reject(reason)
        },
      )
    })
  })
}

// Promise.race
Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promises[i]).then(
        (data) => {
          resolve(data)
          return
        },
        (err) => {
          reject(err)
          return
        },
      )
    })
  })
}

// Promise.any
Promise.any = (promises) => {
  return new Promise((resolve, reject) => {
    let hasOneResolved = false
    let remaining = promises.length
    const errors = []

    promises.forEach((promise, i) => {
      promise.then(
        (data) => {
          if (hasOneResolved) return
          hasOneResolved = true
          resolve(data)
        },
        (err) => {
          if (hasOneResolved) return
          remaining--
          errors[i] = err
          remaining || reject(errors)
        },
      )
    })
  })
}

// Promise.allSettled
Promise.allSettled = function (promises) {
  return new Promise(function (resolve) {
    const res = []
    const count = 0
    const n = promises.length
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((value) => {
          res[i] = {
            status: FULFILLED,
            value,
          }
          count++
          if (count === n) {
            resolve(res)
          }
        })
        .catch((reason) => {
          res[i] = {
            status: REJECTED,
            reason: reason,
          }
          count++
          if (count === n) {
            resolve(res)
          }
        })
    })
    resolve(res)
  })
}

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
