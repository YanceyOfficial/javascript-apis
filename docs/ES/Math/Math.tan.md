---
id: tan
title: Math.正切系列()
---

## Math.tan()

### 语法

```ts
tan(x: number): number;
```

### 描述

返回一个数的正切值。注意，因为正切函数的作用域为 ${\displaystyle \{x|x\neq k\pi +{\frac {\pi }{2}},k\in Z\}}$，按理说传入 90° 会返回 `NaN`，然而事实却返回 `16331239353195370`

### 示例

```js
Math.tan(Math.PI / 2); // 16331239353195370
Math.tan(0); // 0
```

## Math.tanh()

### 语法

```ts
tanh(x: number): number;
```

### 描述

计算 x 的双曲正切函数值，即求 $\tanh x = \frac{\sinh x}{\cosh x} = \frac {e^x - e^{-x}} {e^x + e^{-x}} = \frac{e^{2x} - 1}{e^{2x}+1}$

### 示例

```js
Math.tanh(0); // 0
Math.tanh(Infinity); // 1
Math.tanh(-Infinity); // -1
Math.tanh(1); // 0.7615941559557649
```

## Math.atan()

### 语法

```ts
atan(x: number): number;
```

### 描述

计算一个值的反正切值，即 $arctan(x)$，定义域为 $R$，值域为 $(-{\frac  {\pi }{2}},{\frac  {\pi }{2}})$

### 示例

```js
Math.atan(0); // 0
Math.atan(1); // 0.7853981633974483
```

## Math.atan2()

### 语法

```ts
atan2(y: number, x: number): number;
```

### 描述

返回其参数比值的反正切值。

### 示例

```js
Math.atan2(Math.PI / 2, Math.PI / 6); // 1.2490457723982544
```

## Math.atanh()

### 语法

```ts
atanh(x: number): number;
```

### 描述

计算 x 的反双曲正切值，即求 $arctanhx = \frac{1}{2} \ln\left(\frac{1+x}{1-x}\right)$，定义域为 $(-1,1)$，值域为 $R$

### 示例

```js
Math.atanh(Math.PI / 4); // 1.0593061708232432
```
