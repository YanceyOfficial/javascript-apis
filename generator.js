function* createIterator() {
  let first = yield 1
  let second
  try {
    second = yield first + 2
  } catch (ex) {
    second = 7
  }
  yield second + 3
}

let iterator = createIterator()

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next(4)) // { value: 6, done: false }
console.log(iterator.throw(new Error('Boom'))) // { value: 10, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
