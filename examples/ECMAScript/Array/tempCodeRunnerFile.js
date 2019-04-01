const foo = {
  0: 'Java',
  1: 'Python',
  2: 'Scala',
  length: 3,
};

console.log(Array.prototype.slice.call(foo));
console.log([].slice.call(foo));