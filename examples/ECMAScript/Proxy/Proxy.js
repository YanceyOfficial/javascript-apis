const target = {};

const proxy = new Proxy(target, {});

// 给代理创建一个 name 属性，它会直接将该操作转发到目标对象。
proxy.name = 'proxy';

// 因此 target.name 也是 'proxy'
console.log(proxy.name); // proxy
console.log(target.name); // proxy

// 因为 proxy.name 和 target.name 引用的都是 target.name
// 因此修改 target.name 导致两者都会发生变化 
target.name = 'target';

console.log(proxy.name); // target
console.log(target.name); // target
