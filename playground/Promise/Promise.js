/* const promise = new Promise((resolve, reject) => {
  resolve('success');
});

// promise.then(
//   res => {
//     console.log(res);
//   },
//   e => {
//     console.log(e);
//   },
// );

promise
  .then(res => {
    console.log(res);
    promise.then(res => {
      console.log(res);
    });
  })
  .catch(e => {
    console.log(e);
  })
  .finally(() => {
    console.log('无论成功失败都会执行这个回调');
  });

// promise
//   .then(res => {
//     console.log(res);
//   })
//   .then(null, e => {
//     console.log(e);
//   })
//   .finally(() => {
//     // 最终
//   }); */

// function Buy(name, goods, callback) {
//   console.log(name + ' buy ' + goods);
//   if (callback && typeof callback === 'function') {
//     callback();
//   }
// }

// Buy('xiaoming', 'apple', function() {
//   console.log('shopping finish');
// });