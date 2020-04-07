const str = 'messi';

console.log(str.padStart(9, 'goat')); // 'goatmessi'
console.log(str.padStart(1, 'goat')); // 'messi'
console.log(str.padStart(6, 'goat')); // 'gmessi'
console.log(str.padStart(10)); // '     messi'