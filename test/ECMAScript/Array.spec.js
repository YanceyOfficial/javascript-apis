import {
  arrayLikeToArray,
  foo,
  obj,
  add,
  set,
  map
} from '../../examples/ECMAScript/Array/Array.from';

describe('Array.of()', () => {
  test('', () => {
    expect(Array.of(3)).toEqual([3])
  })
})

describe('Array.from()', () => {
  test('', () => {
    expect(Array.prototype.slice.call(foo)).toEqual(['Java', 'Python', 'Scala'])
    expect([].slice.call(foo)).toEqual(['Java', 'Python', 'Scala'])
    expect(Array.from(foo)).toEqual(['Java', 'Python', 'Scala'])
    expect(arrayLikeToArray('令', '和', '元', '年')).toEqual(['令', '和', '元', '年'])
    expect(Array.from(true)).toEqual([])
    expect(Array.from(123)).toEqual([])
    expect(Array.from('abc')).toEqual(['a', 'b', 'c'])
    expect(Array.from([1, 2, 3], value => value *= 2)).toEqual([2, 4, 6])
    expect(Array.from([1, 2, 3, 4, 5], add, obj)).toEqual([2, 3, 4, 5, 6])

    expect(Array.from(set)).toEqual([1, 3, 5, 7, 9])
    expect(Array.from(map)).toEqual([
      [true, 1],
      [false, 0]
    ])
  })
})