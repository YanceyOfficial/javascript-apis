const arr1 = [1, 2, 3];

const arr2 = [1, 2, 'yancey'];

console.log(Math.max(...arr1)); // 3
console.log(Math.max(...arr2)); // NaN
console.log(Math.max()); // -Infinity

console.log(Math.min(...arr1)); // 1
console.log(Math.min(...arr2)); // NaN
console.log(Math.min()); // Infinity

const arr = [1, 2, 3];

console.log(Math.max(1, 2, 3)); // 3
console.log(Math.max(...arr)); // 3
console.log(Math.max.apply(null, arr)); // 3