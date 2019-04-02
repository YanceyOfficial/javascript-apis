console.log([1, 2, 3].concat([4, 5, 6], [7, 8, 9])); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

console.log([1, 2, 3].concat(true, 100, 'abc', undefined, null, Symbol('age')));
// [ 1, 2, 3, true, 100, 'abc', undefined, null, Symbol(age) ]

const obj = {
  name: 'yancey',
  hobbies: ['music', 'football']
}
const arr4 = [1, 2, 3].concat(obj);

arr4[3].name = 'sayaka';
arr4[3].hobbies.push('coding');
console.log(obj); // { name: 'sayaka', hobbies: [ 'music', 'football', 'coding' ] }