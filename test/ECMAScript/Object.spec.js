describe('Object.is()', () => {
  test('', () => {
    expect(+0 === -0).toBeTruthy()
    expect(Object.is(+0, -0)).toBeFalsy()
    expect(NaN === NaN).toBeFalsy()
    expect(Object.is(NaN, NaN)).toBeTruthy()
  })
})