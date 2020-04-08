const arr = [1, 2, 3];

const iterable = arr.entries();

console.log(iterable)

iterable.next(); // { value: [ 0, 1 ], done: false }
iterable.next(); // { value: [ 1, 2 ], done: false }
iterable.next(); // { value: [ 2, 3 ], done: false }
iterable.next(); // { value: undefined, done: true }

for (const i of iterable) {
  console.log(i)
}
// [ 0, 1 ]
// [ 1, 2 ]
// [ 2, 3 ]
// [ 3, 4 ]
// [ 4, 5 ]