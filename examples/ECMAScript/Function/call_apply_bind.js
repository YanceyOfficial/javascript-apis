// // function foo() {
// //   console.log(this.firstName);
// //   console.log(arguments);
// // }

// // const obj = {
// //   firstName: 'Yancey',
// // };

// // foo.call(obj, 'Leo');

// // console.log(Math.max(1, 2, 3, 4));
// // console.log(Math.max(...[1, 2, 3, 4]));
// // console.log(Math.max.apply(null, [1, 2, 3, 4]));

// // function bar() {
// //   console.log(this);
// // }

// // bar.call(null)

// // 当第一个参数是原始类型
// // this 指向该原始值的包装对象
// // function bar() {
// //   console.log(this);
// // }

// // bar.call(1);

// function foo() {
//   console.log(this.firstName);
//   console.log(arguments);
// }

// var firstName = 'YANCEY';

// var obj = {
//   firstName: 'Yancey',
// };

// function bar() {
//   console.log(this);
// }

// Function.prototype.call2 = function(thisArg, ...args) {
//   const fn = Symbol('fn');

//   if (!thisArg || thisArg === null || thisArg === undefined) {
//     thisArg = window;
//   }

//   const packing = Object(thisArg);

//   packing[fn] = this;
//   const result = packing[fn](...args);
//   delete packing[fn];
//   return result;
// };

// Function.prototype.apply2 = function(thisArg) {
//   const fn = Symbol('fn');

//   const flag = arguments[1] && Array.isArray(arguments[1]);

//   if (!thisArg || thisArg === null || thisArg === undefined) {
//     window[fn] = this;
//     if (flag) {
//       let result = window[fn](...arguments[1]);
//       delete window[fn];
//       return result;
//     } else {
//       let result = window[fn]();
//       delete window[fn];
//       return result;
//     }
//   } else if (typeof thisArg === 'object') {
//     thisArg[fn] = this;
//     if (flag) {
//       let result = thisArg[fn](...arguments[1]);
//       delete thisArg[fn];
//       return result;
//     } else {
//       let result = thisArg[fn]();
//       delete thisArg[fn];
//       return result;
//     }
//   } else {
//     const packing = Object(thisArg);
//     packing[fn] = this;
//     if (flag) {
//       let result = packing[fn](...arguments[1]);
//       delete packing[fn];
//       return result;
//     } else {
//       let result = packing[fn]();
//       delete packing[fn];
//       return result;
//     }
//   }
// };
function foo() {
  console.log(this); // window
  console.log(arguments); // { '0': 'a', '1': 'b' }
}

foo.call(1, 'a', 'b');

