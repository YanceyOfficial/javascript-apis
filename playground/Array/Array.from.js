export const foo = {
  0: 'Java',
  1: 'Python',
  2: 'Scala',
  length: 3,
};

console.log(Array.prototype.slice.call(foo));
console.log([].slice.call(foo));
console.log(Array.from(foo)); // ['Java', 'Python', 'Scala']

export function arrayLikeToArray() {
  return Array.prototype.slice.call(arguments, 0);
}

console.log(arrayLikeToArray('令', '和', '元', '年')); // [ '令', '和', '元', '年' ]

console.log(Array.from(true)); // []
console.log(Array.from(123)); // []
// console.log(Array.from(null)); // 报错
console.log(Array.from('abc')); // ['a', 'b', 'c']

console.log(Array.from([1, 2, 3], value => value *= 2)); // [2, 4, 6]

export const obj = {
  add: function (n) {
    return n + 1;
  }
}

export function add(x) {
  return this.add(x)
}

console.log(Array.from([1, 2, 3, 4, 5], add, obj)) // [2, 3, 4, 5, 6]

export const set = new Set();
set.add(1).add(3).add(5).add(7).add(9);

console.log(Array.from(set)); // [1, 3, 5, 7, 9]

export const map = new Map();
map.set(true, 1).set(false, 0)

console.log(Array.from(map)); // [[true, 1], [false, 0]]