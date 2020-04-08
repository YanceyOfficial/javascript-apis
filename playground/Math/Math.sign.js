console.log(Math.sign(3)); //  1
console.log(Math.sign(-3)); // -1
console.log(Math.sign('-3')); // -1
console.log(Math.sign(0)); //  0
console.log(Math.sign(-0)); // -0

console.log(Math.sign(NaN)); // NaN
console.log(Math.sign('foo')); // NaN
console.log(Math.sign()); // NaN