const str = 'Més que un Club';

console.log(str.split()); // ['Més que un Club']
console.log(str.split('')); // ['M', 'é', 's', ' ', 'q', 'u', 'e', ' ', 'u', 'n', ' ', 'C', 'l', 'u', 'b']
console.log(str.split(' ')); // ['Més', 'que', 'un', 'Club']
console.log(str.split(/\s*un\s*/)); // ['Més que', 'Club']
console.log(str.split(/(\s*un\s*)/)); // ['Més que', ' un ', 'Club']
console.log(str.split(' ', 1)); // ['Més']
console.log(str.split(' ', 0)); // []
console.log(str.split(' ', -1)); // ['Més', 'que', 'un', 'Club']
console.log(str.split(' ', 20)); // ['Més', 'que', 'un', 'Club']