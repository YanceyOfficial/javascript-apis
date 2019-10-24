// const obj = {
//   name: '长者',
//   _time: 1,
// };

// Object.defineProperty(obj, 'time', {
//   configurable: true,
//   get() {
//     return `default：${this._time}s`;
//   },
//   set(newValue) {
//     if (Number(newValue)) {
//       this._time = newValue;
//       this.name = `我为${this.name}+${newValue}s`;
//     } else {
//       this.name = `我为${this.name}+1s`;
//     }
//   },
// });

// console.log(obj.time); // default：1s
// console.log((obj.time = 2)); // 2
// console.log(obj.name); // 我为长者+2s

// function Person(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.fullName = this.firstName + ' ' + this.lastName;
//   this.species = 'human';
// }

// const person = new Person('Yancey', 'Leo');

// /* 
//  * Change firstName or LastName
//  */

// // 虽然 firstName 和 lastName 被修改了，但 fullName 仍然是 "Yancey Leo"
// person.firstName = 'Sayaka';
// person.lastName = 'Yamamoto';

// /* 
//  * Change species
//  */

// // 我们定义了一个关于“人”的构造函数，所以并不希望 species 被修改成 fish
// person.species = 'fish';

// /* 
//  * Change fullName
//  */

// // 当我们修改了 fullName，也同样希望 firstName 和 flastName 被更新
// person.fullName = 'Kasumi Arimura'

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Object.defineProperty(Person.prototype, 'species', {
  value: 'human',
  writable: false,
})

Object.defineProperty(Person.prototype, 'fullName', {
  get() {
    return this.firstName + ' ' + this.lastName;
  },
  set(newValue) {
    const newValueArr = newValue.trim().split(' ');
    if (newValueArr.length === 2) {
      this.firstName = newValueArr[0];
      this.lastName = newValueArr[1];
    }
  },
})
