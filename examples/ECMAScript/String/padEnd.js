const str = 'messi';

console.log(str.padEnd(9, 'goat')); // 'messigoat'
console.log(str.padEnd(1, 'goat')); // 'messi'
console.log(str.padEnd(6, 'goat')); // 'messig'
console.log(str.padEnd(10)); // 'messi     '