import {
  arrayLikeToArray,
  foo,
  obj,
  add,
  set,
  map,
} from '../src/ecmascript/Array/Array.from'

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
    expect(arrayLikeToArray('令', '和', '元', '年')).toEqual([
      '令',
      '和',
      '元',
      '年',
    ])
    expect(Array.from('abc')).toEqual(['a', 'b', 'c'])
    expect(Array.from([1, 2, 3], (value) => (value *= 2))).toEqual([2, 4, 6])
    expect(Array.from([1, 2, 3, 4, 5], add, obj)).toEqual([2, 3, 4, 5, 6])

    expect(Array.from(set)).toEqual([1, 3, 5, 7, 9])
    expect(Array.from(map)).toEqual([
      [true, 1],
      [false, 0],
    ])
  })
})

describe('Array.isArray()', () => {
  test('', () => {
    expect(Array.isArray([])).toBeTruthy()
    expect(Array.isArray(new Array())).toBeTruthy()
    expect(Array.isArray(123)).toBeFalsy()
    expect(Array.isArray({})).toBeFalsy()
  })
})

describe('concat()', () => {
  test('', () => {
    expect([1, 2, 3].concat([4, 5, 6], [7, 8, 9])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ])
    const obj = {
      name: 'yancey',
      hobbies: ['music', 'football'],
    }
    const arr4: any = [1, 2, 3].concat(obj as any)
    arr4[3].name = 'sayaka'
    arr4[3].hobbies.push('coding')
    expect(obj).toEqual({
      name: 'sayaka',
      hobbies: ['music', 'football', 'coding'],
    })
  })
})
