---
outline: deep
---

# JavaScript 深浅克隆详解

## 1. 深浅拷贝的含义

### 1.1 浅拷贝

浅拷贝是指创建一个新对象，该对象对原始对象的**基本数据类型**属性进行值复制，但对**引用类型**属性仅复制引用地址。这意味着新对象和原始对象会共享同一个引用类型数据，**修改其中一个会影响另一个**。

### 1.2 `深拷贝`

`深拷贝`是指创建一个完全独立的新对象，不仅复制原始对象的基本数据类型值，还会递归复制所有引用类型属性，形成一个全新的引用链。新对象与原始对象完全独立，**修改任何一方都不会影响另一方**。

## 2. 浅拷贝的实现方式

### 2.1 Object.assign()

```javascript
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = Object.assign({}, obj);
shallowCopy.b.c = 3;
console.log(obj.b.c); // 输出: 3 (原始对象被修改)
```

### 2.2 扩展运算符 (...)

```javascript
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = { ...obj };
shallowCopy.b.c = 3;
console.log(obj.b.c); // 输出: 3 (原始对象被修改)
```

## 3. `深拷贝`的实现方式

### 3.1 JSON 序列化/反序列化

最简单的`深拷贝`方法，但存在局限性：无法拷贝函数、正则、Date 等特殊对象，且会忽略 undefined 和 Symbol 属性。

```javascript
const obj = { a: 1, b: { c: 2 }, d: new Date() };
const deepCopy = JSON.parse(JSON.stringify(obj));
console.log(deepCopy.d instanceof Date); // 输出: false (Date对象被转为字符串后无法还原)
```

### 3.2 递归实现`深拷贝`

手动实现递归拷贝函数，可处理各种数据类型：

```javascript
function deepClone(target) {
  // 处理null和基本数据类型
  if (target === null || typeof target !== 'object') {
    return target;
  }

  // 处理Date
  if (target instanceof Date) {
    return new Date(target);
  }

  // 处理RegExp
  if (target instanceof RegExp) {
    return new RegExp(target.source, target.flags);
  }

  // 处理数组和对象
  const cloneObj = Array.isArray(target) ? [] : {};

  // 递归拷贝属性
  Reflect.ownKeys(target).forEach(key => {
    cloneObj[key] = deepClone(target[key]);
  });

  return cloneObj;
}

// 使用示例
const obj = { a: 1, b: { c: 2 }, d: () => {}, e: new Date() };
const copy = deepClone(obj);
console.log(copy.b.c); // 输出: 2
console.log(copy.e instanceof Date); // 输出: true
```

### 3.3 使用第三方库实现`深拷贝`

- Lodash 的`cloneDeep`方法（推荐生产环境使用）

```javascript
import { cloneDeep } from 'lodash';
const obj = { a: 1, b: { c: 2 } };
const deepCopy = cloneDeep(obj);
```

## 4. 常见应用场景

- 状态管理（如 Vuex、Redux 中的状态更新）
- 表单数据处理
- 避免函数参数副作用
- 复杂对象的缓存和复用

## 5. 性能考量

- `深拷贝`比浅拷贝性能开销更大，尤其是大型复杂对象
- 递归`深拷贝`可能面临栈溢出风险（可通过尾递归优化或循环实现改进）
- 对于频繁操作的大型对象，可考虑使用结构共享等优化方案
