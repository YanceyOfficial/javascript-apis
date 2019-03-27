# Math.random()

## 语法

```ts
random(): number;
```

## 描述

返回一个浮点型伪随机数字, 范围在 [0, 1) 之间

## 示例

```js
Math.random(); // 0.5228997870936947
```

## 扩展

### 一个经典的数组乱序算法

```js
const shuffle = arr => {
  let i = arr.length,
    j;
  while (i) {
    j = Math.floor(Math.random() * i--);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const colors = ['red', 'white', 'blue', 'green', 'orange'];

shuffle(colors); // ['white', 'orange', 'green', 'red', 'blue']
```

### 获取两数之间的随机值，可能包括最小值但不包括最大值

```js
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
```

### 获取两数之间的随机值，包括这两个数（两个数是整数）

```js
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
```

## 其他

1. 我在 GitHub 开了一个仓库 [JS-Utility-Functions](https://github.com/YanceyOfficial/JS-Utility-Functions)，存放一些常用工具函数，欢迎 fork.

2. Math.random() 不能提供所谓安全的随机数字，可以选择一个更加靠谱的方法 [window.crypto.getRandomValues()](https://developer.mozilla.org/zh-CN/docs/Web/API/RandomSource/getRandomValues)
