console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true

console.log(Math.abs(-2)); // 2
console.log(Math.abs('-1')); // 1
console.log(Math.abs(null)); // 0
console.log(Math.abs(true)); // 1
console.log(Math.abs(undefined)); // NaN
console.log(Math.abs('yancey')); // NaN
console.log(Math.abs()); // NaN