---
id: proxy
title: Proxy 和 Reflect
---

> 一提到代理，立刻就想到 Fan Qiang. -- 鲁迅

## 从 Object.defineProperty() 谈起

既然要讲 Proxy，就不得不提起 Object.defineProperty()。作为 Vue.js v1 和 v2 的技术核心，

## Proxy

代理是一种可以拦截并改变底层 JavaScript 引擎操作的包装器，在新语言中通过它暴露内部运作的对象。

- handler 包含陷阱（traps）的占位符对象。

- traps 提供属性访问的方法。

- 代理虚拟化的对象。它通常用作代理的存储后端。根据目标验证关于对象不可扩展性或不可配置属性的不变量（保持不变的语义）。

| 代理陷阱                | 复写的特性                                                                  | 默认特性                          |
| ----------------------- | --------------------------------------------------------------------------- | --------------------------------- |
| get                     | 读取一个属性值                                                              | Reflect.get()                     |
| set                     | 写入一个属性                                                                | Reflect.set()                     |
| has                     | in 操作符                                                                   | Reflect.has()                     |
| deleteProperty          | delete 操作符                                                               | Reflect.deleteProperty()          |
| getPropertyOf           | Object.getPropertyOf()                                                      | Reflect.getPropertyOf()           |
| setPropertyOf           | Object.setPropertyOf()                                                      | Reflect.setPropertyOf()           |
| isExtensible            | Object.isExtensible()                                                       | Reflect.isExtensible()            |
| preventExtensions       | Object.preventExtensions()                                                  | Reflect.preventExtensions()       |
| getOwnPropertyDesciptor | Object.getOwnPropertyDesciptor()                                            | Reflect.getOwnPropertyDesciptor() |
| defineProperty          | Object.defineProperty()                                                     | Reflect.defineProperty()          |
| ownKeys                 | Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols() | Reflect.ownKeys()                 |
| apply                   | 调用一个函数                                                                | Reflect.apply()                   |
| construct               | 用 new 调用一个函数                                                         | Reflect.construct()               |
