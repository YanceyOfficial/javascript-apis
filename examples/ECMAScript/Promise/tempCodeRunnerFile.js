promise
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  })
  .finally(() => {
    console.log('无论成功失败都会执行这个回调');
  });