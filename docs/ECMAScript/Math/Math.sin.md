# Math.正弦系列()

在谈三角函数系列之前，先复习一下数学知识。一个完整的圆的弧度是 `2π`，因此由 `2π rad = 360°` 可推导出 `1°= π/180 rad`。所以 30° 在 JavaScript 中可表示为 `Math.PI / 6`

## Math.sin()

### 语法

```ts
sin(x: number): number;
```

### 描述

返回一个角度的正弦值，返回值在 [-1, 1] 之间。

### 示例

```js
// 因为 IEEE-754的原因，sin(30°) 不等于 0.5
Math.sin((Math.PI / 180) * 30); // 0.49999999999999994
Math.sin(Math.PI / 2); // 1

Math.sin(); // NaN
Math.sin('yancey'); // NaN
```

## Math.sinh() <Badge text="ES6"/>

### 语法

```ts
sinh(x: number): number;
```

### 描述

计算 x 的双曲正弦值，即求 $sinhx = \frac{e^x - e^{-x}}{2}$

### 示例

```js
Math.sinh(0); // 0
```

## Math.asin()

### 语法

```ts
asin(x: number): number;
```

### 描述

计算一个值的反正弦值，即 $arcsin(x)$，定义域为 $[-1, 1]$，超出此范围返回 NaN，值域为 $[-{\frac  {\pi }{2}},{\frac  {\pi }{2}}]$

### 示例

```js
Math.asin(2); // NaN
Math.asin(0); // 0
Math.asin(Math.PI / 4); // 0.9033391107665127
```

## Math.asinh() <Badge text="ES6"/>

### 语法

```ts
asinh(x: number): number;
```

### 描述

计算 x 的反双曲正弦值，即求 $arcsinhx = ln(x + \sqrt{x^2 + 1})$，定义域为 $R$，值域为 $R$

### 示例

```js
Math.asinh(1); // 0.881373587019543
```
