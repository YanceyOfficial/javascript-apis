import * as random from '../playground/Math/Math.random';

describe('Math.abs()', () => {
  test('', () => {
    expect(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON).toBeTruthy()
    expect(Math.abs(-2)).toBe(2)
    expect(Math.abs('-1')).toBe(1)
    expect(Math.abs(null)).toBe(0)
    expect(Math.abs(true)).toBe(1)
    expect(Math.abs(undefined)).toBe(NaN)
    expect(Math.abs('yancey')).toBe(NaN)
    expect(Math.abs()).toBe(NaN)
  })
})

describe('Math.max/min()', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 'yancey'];
  test('', () => {
    expect(Math.max(...arr1)).toBe(3)
    expect(Math.max(...arr2)).toBe(NaN)
    expect(Math.max()).toBe(-Infinity)

    expect(Math.min(...arr1)).toBe(1)
    expect(Math.min(...arr2)).toBe(NaN)
    expect(Math.min()).toBe(Infinity)

    expect(Math.max(1, 2, 3)).toBe(3)
    expect(Math.max(...arr1)).toBe(3)
    expect(Math.max.apply(null, arr1)).toBe(3)

  })
})

describe('Math.random()', () => {
  test('', () => {
    expect(random.getRandomInt(1, 10)).toBeGreaterThanOrEqual(1)
    expect(random.getRandomInt(1, 10)).toBeLessThan(10)
    expect(random.getRandomInt1(1, 10)).toBeGreaterThanOrEqual(1)
    expect(random.getRandomInt1(1, 10)).toBeLessThanOrEqual(10)
  })
})

describe('Math.formulas()', () => {
  test('Math.exp()', () => {
    expect(Math.exp('yancey')).toBe(NaN)
    expect(Math.exp()).toBe(NaN)
    expect(Math.exp(-1)).toBe(0.36787944117144233)
  })

  test('Math.log()', () => {
    expect(Math.log(-1)).toBe(NaN)
    expect(Math.log(0)).toBe(-Infinity)
    expect(Math.log(1)).toBe(0)
    expect(Math.log(10)).toBe(2.302585092994046)
  })

  test('Math.log10()', () => {
    expect(Math.log10(1)).toBe(0)
    expect(Math.log10(100)).toBe(2)
  })

  test('Math.log1p()', () => {
    expect(Math.log1p(Math.E - 1)).toBe(1)
    expect(Math.log1p(Math.pow(Math.E, 2))).toBe(2.1269280110429722)
  })

  test('Math.log2()', () => {
    expect(Math.log2(1024)).toBe(10)
    expect(Math.log2(1)).toBe(0)
  })

  test('Math.sqrt()', () => {
    expect(Math.sqrt(1)).toBe(1)
    expect(Math.sqrt(0)).toBe(0)
    expect(Math.sqrt(-1)).toBe(NaN)
    expect(Math.sqrt(1024)).toBe(32)
  })

  test('Math.cbrt()', () => {
    expect(Math.cbrt(1)).toBe(1)
    expect(Math.cbrt(0)).toBe(0)
    expect(Math.cbrt(-1)).toBe(-1)
    expect(Math.cbrt(512)).toBe(8)
  })

  test('Math.pow()', () => {
    expect(Math.pow(2, 4)).toBe(16)
    expect(Math.pow()).toBe(NaN)
    expect(Math.pow(2)).toBe(NaN)
  })

  test('Math.hypot()', () => {
    expect(Math.hypot(3, -4)).toBe(5)
    expect(Math.hypot()).toBe(0)
  })

  test('Math.expm1()', () => {
    expect(Math.expm1(0)).toBe(0)
    expect(Math.expm1(1)).toBe(1.718281828459045)
  })
})

describe('Math.sin系列()', () => {
  test('', () => {
    expect(Math.abs(Math.sin(Math.PI / 180 * 30) - 0.5) < Number.EPSILON).toBeTruthy()
    expect(Math.sin()).toBe(NaN)
    expect(Math.sin('yancey')).toBe(NaN)
    expect(Math.sin(Math.PI / 2)).toBe(1)
    expect(Math.sinh(0)).toBe(0)
    expect(Math.asin(2)).toBe(NaN)
    expect(Math.asin(0)).toBe(0)
    expect(Math.asin(Math.PI / 4)).toBe(0.9033391107665127)
    expect(Math.asinh(1)).toBe(0.881373587019543)
  })
})

describe('Math.cos系列()', () => {
  test('', () => {
    expect(Math.cos(2 * Math.PI)).toBe(1)
    expect(Math.cos(0)).toBe(1)
    expect(Math.cosh(0)).toBe(1)
    expect(Math.acos(2)).toBe(NaN)
    expect(Math.acos(0)).toBe(1.5707963267948966)
    expect(Math.acos(Math.PI / 4)).toBe(0.6674572160283838)
    expect(Math.acosh(1)).toBe(0)
  })
})

describe('Math.tan系列()', () => {
  test('', () => {
    expect(Math.tan(0)).toBe(0)

    expect(Math.tanh(0)).toBe(0)
    expect(Math.tanh(Infinity)).toBe(1)
    expect(Math.tanh(-Infinity)).toBe(-1)
    expect(Math.tanh(1)).toBe(0.7615941559557649)

    expect(Math.atan(0)).toBe(0)
    expect(Math.atan(1)).toBe(0.7853981633974483)

    expect(Math.atan2(Math.PI / 2, Math.PI / 6)).toBe(1.2490457723982544)

    expect(Math.atanh(Math.PI / 4)).toBe(1.0593061708232432)
  })
})

describe('Math.floor/ceil/round()', () => {
  test('floor', () => {
    expect(Math.floor()).toBe(NaN)
    expect(Math.floor('yancey')).toBe(NaN)
    expect(Math.floor(1.5)).toBe(1)
    expect(Math.floor(1.6)).toBe(1)
    expect(Math.floor(1.1)).toBe(1)
    expect(Math.floor(-1.1)).toBe(-2)
    expect(Math.floor(-1.5)).toBe(-2)
    expect(Math.floor(-1.9)).toBe(-2)
    expect().toBe()
    expect().toBe()
  })
  test('floor', () => {
    expect(Math.floor()).toBe(NaN)
    expect(Math.floor('yancey')).toBe(NaN)
    expect(Math.floor(1.5)).toBe(1)
    expect(Math.floor(1.6)).toBe(1)
    expect(Math.floor(1.1)).toBe(1)
    expect(Math.floor(-1.1)).toBe(-2)
    expect(Math.floor(-1.5)).toBe(-2)
    expect(Math.floor(-1.9)).toBe(-2)
  });
  test('ceil', () => {
    expect(Math.ceil(1.5)).toBe(2)
    expect(Math.ceil(1.6)).toBe(2)
    expect(Math.ceil(1.1)).toBe(2)
    expect(Math.ceil(-1.1)).toBe(-1)
    expect(Math.ceil(-1.5)).toBe(-1)
    expect(Math.ceil(-1.9)).toBe(-1)
  });

  test('round', () => {
    expect(Math.round(1.5)).toBe(2)
    expect(Math.round(1.49)).toBe(1)
    expect(Math.round(1.51)).toBe(2)
    expect(Math.round(1.6)).toBe(2)
    expect(Math.round(1.1)).toBe(1)
    expect(Math.round(-1.1)).toBe(-1)
    expect(Math.round(-1.5)).toBe(-1)
    expect(Math.round(-1.51)).toBe(-2)
    expect(Math.round(-1.9)).toBe(-2)
  })
})

describe('Math.fround()', () => {
  test('', () => {
    expect(Math.fround(1.5)).toBe(1.5)
    expect(Math.fround(1.337)).toBe(1.3370000123977661)
  })
})

describe('Math.trunc()', () => {
  test('', () => {
    expect(Math.trunc(Math.PI)).toBe(3)
    expect(Math.trunc(0.1 + 0.2)).toBe(0)
    expect(Math.trunc(Infinity)).toBe(Infinity)
  })
})

describe('Math.clz32()', () => {
  test('', () => {
    expect(Math.clz32(1)).toBe(31)
    expect(Math.clz32(1000)).toBe(22)
    expect(Math.clz32(true)).toBe(31)
    expect(Math.clz32(3.5)).toBe(30)
  })
})

describe('Math.imul()', () => {
  test('', () => {
    expect(Math.imul(2, 4)).toBe(8)
    expect(Math.imul(-1, 8)).toBe(-8)
    expect(Math.imul(-2, -2)).toBe(4)
  })
})

describe('Math.sign()', () => {
  test('', () => {
    expect(Math.sign()).toBe(NaN)
    expect(Math.sign(3)).toBe(1)
    expect(Math.sign(-3)).toBe(-1)
    expect(Math.sign('-3')).toBe(-1)
    expect(Math.sign(0)).toBe(0)
    expect(Math.sign(-0)).toBe(-0)
    expect(Math.sign(NaN)).toBe(NaN)
    expect(Math.sign('foo')).toBe(NaN)
  })
})