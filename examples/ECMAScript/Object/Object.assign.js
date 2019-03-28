// console.log(Object.assign({}, 0, 'abc', Symbol('name'), null, undefined, true))

// const target = {
//   name: 'Sayaka',
// }

// // 源对象1会覆盖掉与目标对象相同的属性，所以 name: 'Yancey' 会覆盖掉 name: 'Sayaka'
// const source_1 = {
//   name: 'Yancey',
//   say() {},
// }

// // 源对象2因为后于源对象1，所以 name: 'Lucy' 会覆盖掉 name: 'yancey'
// const source_2 = {
//   name: 'Lucy',
//   nullType: null,
// }

// const copy = Object.assign(target, source_1, source_2)

// console.log(copy)

// const source = {
//   food: {
//     japaneseFood: ['sushi', 'udon'],
//   },
//   name: 'Yancey',
// };

// const copy = Object.assign({}, source);

// source.name = 'Sayaka';

// source.food.japaneseFood = [...source.food.japaneseFood, 'natto'];

// console.log(copy.name); // 'Yancey'

// console.log(copy.food.japaneseFood); // ['sushi', 'udon', 'natto']

// console.log(copy.food === source.food) // true

// const source = {
//   name: 'Yancey',
//   age: 18,
// }

// Object.defineProperties(source, {
//   'age': {
//     enumerable: false,
//   },
//   'incoming': {
//     enumerable: true,
//     get() {
//       return '$1,000,000'
//     }
//   }
// })

// source.__proto__ = {
//   prototypeProperty: 'some'
// }

// const copy = Object.assign({}, source);

// console.log(Object.getOwnPropertyDescriptor(copy, 'incoming'))
// // { value: '$1,000,000',
// //   writable: true,
// //   enumerable: true,
// //   configurable: true }

const target = Object.defineProperty({}, 'foo', {
  value: 1,
  writable: false
});

Object.assign(target, {
  bar: 2
}, {
  foo2: 3,
  foo: 3,
  foo3: 3
}, {
  baz: 4
})

// console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
// console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
// console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
// console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
// console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。