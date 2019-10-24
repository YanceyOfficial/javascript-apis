---
id: fromEntries
title: Object.fromEntries()
---

## 语法

```ts
Object.fromEntries(iterable); (暂未找到相应 types)
```

## 描述

Object.fromEntries() 方法是 Object.entries() 的逆操作，用于将一个键值对数组转为对象。

> WARNING
>
> 该方法目前只在 FF 中实现(笔者当前版本是 v65.x), 在 Chrome 72+ 以及 Node.js 8.x 中尚未实现, 请谨慎使用.

## 示例

```js
const arr = [
  ["firstName", "Yancey"],
  ["lastName", "Leo"],
  [
    "say",
    function() {
      console.log("say something...");
    }
  ]
];

const obj = Object.fromEntries(arr);

obj.say(); // 'say something...'
```

此方法可用于 Map 转对象.

```js
const entries = new Map([["foo", "bar"], ["baz", 42]]);

Object.fromEntries(entries); // { foo: "bar", baz: 42 }
```

也可以将 url 中的 params 转成对象

```js
const params = new URLSearchParams("foo=bar&baz=qux");
Object.fromEntries(params); // { foo: "bar", baz: "qux" }
```

## 参考

[ECMAScript 6 入门](http://es6.ruanyifeng.com/?search=keys&x=0&y=0#docs/object-methods#Object-keys%EF%BC%8CObject-values%EF%BC%8CObject-entries)
