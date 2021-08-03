describe('charAt()', () => {
  const twoBytesStr = 'yancey'

  test('passing one param', () => {
    expect(twoBytesStr.charAt(0)).toBe('y')
  })

  test('passing empty param', () => {
    expect(twoBytesStr.charAt(20)).toBe('')
  })

  test('passing one param that less than 0', () => {
    expect(twoBytesStr.charAt(-1)).toBe('')
  })
})

describe('charCodeAt()', () => {
  const twoBytesStr = 'yancey'

  const fourBytesStr = '𝌆'

  test('passing one param', () => {
    expect(twoBytesStr.charCodeAt(0)).toBe(121)
  })

  test('passing one param that more than length - 1', () => {
    expect(twoBytesStr.charCodeAt(100)).toBe(NaN)
  })

  test('passing one param that less than 0', () => {
    expect(twoBytesStr.charCodeAt(-1)).toBe(NaN)
  })

  test('passing empty param', () => {
    expect(twoBytesStr.charCodeAt(0)).toBe(121)
  })

  test('passing one param for four bytes string', () => {
    expect(fourBytesStr.charCodeAt(0)).toBe(55348)
  })
})

describe('codePointAt()', () => {
  const str = '𠮷l'

  test('passing the first index', () => {
    expect(str.codePointAt(0)).toBe(134071)
  })

  test('passing the second index', () => {
    expect(str.codePointAt(1)).toBe(57271)
  })

  test('passing the third index', () => {
    expect(str.codePointAt(2)).toBe(108)
  })

  test('passing one param that less than 0', () => {
    expect(str.codePointAt(-1)).toBe(undefined)
  })
})

describe('concat()', () => {
  const str = 'yancey'

  test('passing one param', () => {
    expect(str.concat('leo')).toBe('yanceyleo')
  })

  test('passing two params', () => {
    expect(str.concat(' is', ' best')).toBe('yancey is best')
  })

  test('passing empty', () => {
    expect(str.concat()).toBe('yancey')
  })
})

describe('endsWith()', () => {
  const str = 'yanceyleo'

  test('passing one param', () => {
    expect(str.endsWith('leo')).toBeTruthy()
  })

  test('passing empty param', () => {
    expect(str.endsWith('nce', 5)).toBeTruthy()
  })

  test('passing one param that less than 0', () => {
    expect(str.endsWith('yan', -1)).toBeFalsy()
  })

  test('passing one param that less than 0', () => {
    expect(str.endsWith('x')).toBeFalsy()
  })
})

describe('includes', () => {
  const str = 'messi'

  test('passing one param', () => {
    expect(str.includes('es')).toBeTruthy()
  })

  test('passing empty param', () => {
    expect(str.includes('leo')).toBeFalsy()
  })

  test('passing one param that less than 0', () => {
    expect(str.includes('me', 3)).toBeFalsy()
  })

  test('passing one param that less than 0', () => {
    expect(str.includes('me', -1)).toBeTruthy()
  })

  test('passing one param that less than 0', () => {
    expect(str.includes('')).toBeTruthy()
  })

  test('passing one param that less than 0', () => {
    expect(str.includes('x')).toBeFalsy()
  })
})

describe('indexOf()', () => {
  const str = 'rurula'

  test('passing one param', () => {
    expect(str.indexOf('ru')).toBe(0)
  })

  test('passing two params', () => {
    expect(str.indexOf('ru', 2)).toBe(2)
  })

  test('passing two params', () => {
    expect(str.indexOf('ru', 3)).toBe(-1)
  })

  test('passing two params', () => {
    expect(str.indexOf('ru', -1)).toBe(0)
  })

  test('passing two params while the first one is empty string', () => {
    expect(str.indexOf('', -1)).toBe(0)
  })

  test('passing two params while the first one is empty string', () => {
    expect(str.indexOf('', 1)).toBe(1)
  })

  test('passing two params while the first one is empty string', () => {
    expect(str.indexOf('', 10)).toBe(6)
  })
})

describe('lastIndexOf()', () => {
  const str = 'yancey'

  test('passing one param', () => {
    expect(str.lastIndexOf('y')).toBe(5)
  })

  test('passing two params', () => {
    expect(str.lastIndexOf('an', 2)).toBe(1)
  })

  test('passing two params', () => {
    expect(str.lastIndexOf('y', 10)).toBe(5)
  })

  test('passing two params', () => {
    expect(str.lastIndexOf('y', -1)).toBe(0)
  })
})

describe('startsWith()', () => {
  const str = 'yanceyleo'

  test('passing one param', () => {
    expect(str.startsWith('yan')).toBeTruthy()
  })

  test('passing empty param', () => {
    expect(str.startsWith('nce', 2)).toBeTruthy()
  })

  test('passing one param that less than 0', () => {
    expect(str.startsWith('yan', 1)).toBeFalsy()
  })

  test('passing one param that less than 0', () => {
    expect(str.startsWith('yan', -1)).toBeTruthy()
  })

  test('passing one param that less than 0', () => {
    expect(str.startsWith('x')).toBeFalsy()
  })
})

describe('localeCompare', () => {
  test('', () => {
    expect('あ'.localeCompare('い')).toBe(-1)
    expect('à'.localeCompare('ǎ', 'zh-Hans-CN')).toBe(-1)
  })
})

describe('padStart', () => {
  const str = 'messi'
  test('', () => {
    expect(str.padStart(9, 'goat')).toBe('goatmessi')
  })

  test('', () => {
    expect(str.padStart(1, 'goat')).toBe('messi')
  })

  test('', () => {
    expect(str.padStart(6, 'goat')).toBe('gmessi')
  })

  test('', () => {
    expect(str.padStart(10)).toBe('     messi')
  })
})

describe('padEnd', () => {
  const str = 'messi'
  test('', () => {
    expect(str.padEnd(9, 'goat')).toBe('messigoat')
  })

  test('', () => {
    expect(str.padEnd(1, 'goat')).toBe('messi')
  })

  test('', () => {
    expect(str.padEnd(6, 'goat')).toBe('messig')
  })

  test('', () => {
    expect(str.padEnd(10)).toBe('messi     ')
  })
})

describe('trim()', () => {
  const str = ' yancey  '
  test('', () => {
    expect(str.trim()).toBe('yancey')
  })

  test('', () => {
    expect(str.trimLeft()).toBe('yancey  ')
  })

  test('', () => {
    expect(str.trimRight()).toBe(' yancey')
  })
})

describe('repeat()', () => {
  const str = 'messi'
  test('', () => {
    expect(str.repeat(1)).toBe('messi')
  })

  test('', () => {
    expect(str.repeat(3)).toBe('messimessimessi')
  })

  test('', () => {
    expect(str.repeat(0)).toBe('')
  })
})

describe('to...Case()', () => {
  const str = 'Yancey Leo'
  test('', () => {
    expect(str.toLowerCase()).toBe('yancey leo')
  })
  test('', () => {
    expect(str.toUpperCase()).toBe('YANCEY LEO')
  })

  test('', () => {
    expect(str.toLocaleLowerCase()).toBe('yancey leo')
  })

  test('', () => {
    expect(str.toLocaleUpperCase()).toBe('YANCEY LEO')
  })
})

describe('substr()', () => {
  const str = 'yanceyleo'
  test('', () => {
    expect(str.substr(0)).toBe('yanceyleo')
  })

  test('', () => {
    expect(str.substr(4)).toBe('eyleo')
  })

  test('', () => {
    expect(str.substr(4, 3)).toBe('eyl')
  })

  test('', () => {
    expect(str.substr(4, 10)).toBe('eyleo')
  })

  test('', () => {
    expect(str.substr(-2, 10)).toBe('eo')
  })

  test('', () => {
    expect(str.substr(-100, 10)).toBe('yanceyleo')
  })

  test('', () => {
    expect(str.substr(10, 1)).toBe('')
  })

  test('', () => {
    expect(str.substr(4, 0)).toBe('')
  })

  test('', () => {
    expect(str.substr(4, -1)).toBe('')
  })
})

describe('substr()', () => {
  const str = 'yanceyleo'
  test('', () => {
    expect(str.substring(0)).toBe('yanceyleo')
  })

  test('', () => {
    expect(str.substring(3)).toBe('ceyleo')
  })

  test('', () => {
    expect(str.substring(3, 5)).toBe('ce')
  })

  test('', () => {
    expect(str.substring(5, 5)).toBe('')
  })

  test('', () => {
    expect(str.substring(5, 3)).toBe('ce')
  })

  test('', () => {
    expect(str.substring(-1, 3)).toBe('yan')
  })

  test('', () => {
    expect(str.substring(3, -2)).toBe('yan')
  })
})

describe('slice()', () => {
  const str = 'yanceyleo'
  test('', () => {
    expect(str.slice()).toBe('yanceyleo')
  })

  test('', () => {
    expect(str.slice(1)).toBe('anceyleo')
  })

  test('', () => {
    expect(str.slice(100)).toBe('')
  })

  test('', () => {
    expect(str.slice(-2)).toBe('eo')
  })

  test('', () => {
    expect(str.slice(1, 2)).toBe('a')
  })

  test('', () => {
    expect(str.slice(-1, -2)).toBe('')
  })

  test('', () => {
    expect(str.slice(-2, -1)).toBe('e')
  })
})

describe('split()', () => {
  const str = 'Més que un Club'

  test('', () => {
    expect(str.split('')).toEqual([
      'M',
      'é',
      's',
      ' ',
      'q',
      'u',
      'e',
      ' ',
      'u',
      'n',
      ' ',
      'C',
      'l',
      'u',
      'b',
    ])
  })

  test('', () => {
    expect(str.split(' ')).toEqual(['Més', 'que', 'un', 'Club'])
  })

  test('', () => {
    expect(str.split(/\s*un\s*/)).toEqual(['Més que', 'Club'])
  })

  test('', () => {
    expect(str.split(/(\s*un\s*)/)).toEqual(['Més que', ' un ', 'Club'])
  })

  test('', () => {
    expect(str.split(' ', 1)).toEqual(['Més'])
  })

  test('', () => {
    expect(str.split(' ', 0)).toEqual([])
  })

  test('', () => {
    expect(str.split(' ', -1)).toEqual(['Més', 'que', 'un', 'Club'])
  })
  test('', () => {
    expect(str.split(' ', 20)).toEqual(['Més', 'que', 'un', 'Club'])
  })
})

describe('search()', () => {
  const str = 'yanceyLEO1'

  test('', () => {
    expect(str.search(/[a-e]/gi)).toBe(1)
  })

  test('', () => {
    expect(str.search(/[a-e]/i)).toBe(1)
  })

  test('', () => {
    expect(str.search(/(\s*y\s*)/)).toBe(0)
  })

  test('', () => {
    expect(str.search(/\s*y\s*/)).toBe(0)
  })
})

describe('String.fromCharCode()', () => {
  test('', () => {
    expect(String.fromCharCode(97, 98, 99)).toBe('abc')
  })

  test('', () => {
    expect(String.fromCharCode(97)).toBe('a')
  })
})

describe('String.fromCodePoint()', () => {
  test('', () => {
    expect(String.fromCodePoint()).toBe('')
  })

  test('', () => {
    expect(String.fromCodePoint(97)).toBe('a')
  })

  test('', () => {
    expect(String.fromCodePoint(97, 98, 119558)).toBe('ab𝌆')
  })
})
