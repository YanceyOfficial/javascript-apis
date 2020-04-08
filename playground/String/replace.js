const str = 'can you Celebrate'

// 不传入参数时返回原字符串
console.log(str.replace()); // 'can you Celebrate'

// 不传入第二个参数，第二个参数被视为 undefined
console.log(str.replace('y')); // 'can undefinedou Celebrate'


/* 
* 第二个参数是字符串时可以插入一些特殊的变量名
*/

// "$$"是为了和捕获组的"$"的区分
console.log(str.replace(/[b-c]/ig, '$$')); // '$an you $ele$rate'

console.log(str.replace(/[b-c]/ig, '$&★')); // 'c★an you C★eleb★rate'

console.log(str.replace(/[b-c]/ig, '$`★')); // '★an you can you ★elecan you Cele★rate'

console.log(str.replace(/[b-c]/ig, '$\'★')); // 'an you Celebrate★an you elebrate★elerate★rate'

console.log(str.replace(/(^\w+).*?(\w+)$/, '$1')); // 'can'


// /* 
//  * 字符串 -> 字符串
//  */

// // 只会匹配到第一个小写的“c”
// console.log(str.replace('c', '★')); // '★an you Celebrate'

// // 第一个参数为“空字符串”时，会在原字符串首部加上第二个参数
// console.log(str.replace('', '★')); // '★can you Celebrate'

// // 匹配不到时返回原字符串
// console.log(str.replace('z', '★')); // 'can you Celebrate'

// /* 
//  * 正则 -> 字符串
//  */

// // 

// console.log(str.replace(/[a-c]/, '★')); // '★an you Celebrate'

// console.log(str.replace(/[a-c]/ig, '★')); // '★★n you ★ele★r★te'

// // 第二个参数可以用于提取捕获组
// console.log(str.replace(/(^\w+).*?(\w+)$/, '$1 $2')); // 'can Celebrate'
