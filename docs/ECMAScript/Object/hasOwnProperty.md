# hasOwnProperty()

## 语法

```ts
hasOwnProperty(v: PropertyKey): boolean;
```

## 描述

用来判断一个对象是否含有该属性，返回一个 Boolean 值，

- **继承属性** 一律返回 false

- `Symbol` 类型的属性也可以被检测

## 示例

```js
const age = Symbol('age');

const obj = {
  firstName: 'yancey',
  [age]: '18',
  greeting() {
    return `Hello, ${this.firstName}!`;
  },
};

obj.__proto__ = {
  other: 'something...',
};

// 修改属性描述符不影响该方法的使用
Object.defineProperties(obj, {
  firstName: {
    get() {
      return 'Yancey';
    },
  },
  lastName: {
    value: 'leo',
    configurable: false,
    writable: false,
    enumerable: false,
  },
});

obj.hasOwnProperty('firstName'); // true

obj.hasOwnProperty('lastName'); // true

// 不存在的属性返回 false
obj.hasOwnProperty('你xx'); // false

// Symbol类型的属性也可以被检测到
obj.hasOwnProperty(age); // true

obj.hasOwnProperty('greeting'); // true

// 继承属性返回 false
obj.hasOwnProperty('other'); // false

// 而 in 运算符可以获取到继承属性
'other' in obj; // true
```

## 扩展

JavaScript 并没有保护 hasOwnProperty 属性名，因此某个对象是有可能存在使用这个属性名的属性，所以我们需要获取 **原型链上真正的 hasOwnProperty 方法**。

```js
const foo = {
  hasOwnProperty: function() {
    return false;
  },
  bar: 'Here be dragons',
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，可以直接使用原型链上真正的 hasOwnProperty 方法
({}.hasOwnProperty.call(foo, 'bar')); // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```
