# Math.余弦系列()

## Math.cos()

### 语法

```ts
cos(x: number): number;
```

### 描述

返回一个数值的余弦值，值域为 $[-1, 1]$。

### 示例

```js
Math.cos(2 * Math.PI); // 1
Math.cos(0); // 1
```

## Math.cosh() <Badge text="ES6"/>

### 语法

```ts
cosh(x: number): number;
```

### 描述

计算 x 的双曲余弦值，即求 $coshx = \frac{e^x + e^{-x}}{2}$

### 示例

```js
Math.cosh(0); // 1
```

## Math.acos()

### 语法

```ts
acos(x: number): number;
```

### 描述

计算一个值的反余弦值，即 $arccos(x)$，定义域为 $[-1, 1]$，在定义域之外返回 NaN，值域为 $[0,\pi ]$

### 示例

```js
Math.acos(2); // NaN
Math.acos(0); // 1.5707963267948966
Math.acos(Math.PI / 4); // 0.6674572160283838
```

## Math.acosh() <Badge text="ES6"/>

### 语法

```ts
acosh(x: number): number;
```

### 描述

计算 x 的反双曲余弦值，即求 $arccoshx = ln(x + \sqrt{x^2 - 1})$，定义域为 $[1,+\infty)$，值域为 $[0,+\infty)$

### 示例

```js
Math.acosh(1); // 0
```
