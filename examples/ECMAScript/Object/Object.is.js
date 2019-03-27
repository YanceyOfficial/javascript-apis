// eslint-disable-next-line no-compare-neg-zero
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // fasle

// eslint-disable-next-line use-isnan
console.log(NaN === NaN); // fasle
console.log(Object.is(NaN, NaN)); // true

console.log(undefined === undefined); // true
console.log(Object.is(undefined, undefined)); // true

console.log(null === null); // true
console.log(Object.is(null, null)); // true

console.log(true === true); // true
console.log(Object.is(false, false)); // true

// eslint-disable-next-line no-undef
console.log(Object.is(global, global)); // true

const obj = {
  name: 'yancey',
}

console.log(obj === obj)
console.log(Object.is(obj, obj))