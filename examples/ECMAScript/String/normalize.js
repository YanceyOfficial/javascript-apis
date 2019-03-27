const str = '\u1E9B\u0323';

console.log(str.normalize('NFC')); // '\u1E9B\u0323'
console.log(str.normalize('NFD')); // '\u017F\u0323\u0307'