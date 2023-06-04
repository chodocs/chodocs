---
author: "HearLing"
date: 2023-06-04
---

# HearLing 的 2023 社招面试分享

分享我在今年 6 月社招面试求职的经历，现在前端确实会点卷，考察的东西会很多，有的也会问的很深入，所以大家要多准备，多总结，多学习。

> 最好养成习惯，把每一家面试的问题记录下来，然后回去总结自己回答不好的地方，调整优化，这样才能够更好的提升自己，有机会成功上岸。

## 需要根据自己经历进行梳理的问题

- 平常怎么学习前端的

- 项目的亮点

- 介绍你所做的项目

> 推荐使用 star 法则：Situation（应用的使用场景）Task（有哪些任务，解决 xxx 的问题）Action（在这之中所做的行动）Result（最终的结果）

这些问题答好了，能够给面试官一个比较好的印象，也能够让面试官知道你的学习能力，以及你的项目能力。

## 常考基础面试题

- 遍历数组的方法

- for in / for of 区别

- es6 新特性

- let 与 const 的区别

- promise 新方法，实现 Promise.all 或者 Promise.race

- set 与 map 的区别

- 浏览器缓存

- 事件循环机制

- 性能优化

- node 方面： eggjs 或者 express 中间件原理

- 为什么要使用 ssr ， next 与 nust 区别

- 跨域问题

- 介绍一下 TCP 协议，TCP 的可靠性怎么保证

- https

- 数据类型及判断数据类型的方法

- 大数相加

- 对一个只会 Vue 框架的前端开发者，你会怎么介绍 React 框架

- js 的 闭包，this 指向问题

- css flex 布局

- 平常怎么做移动端适配

## 手写 js

手写题不多，可能就口述一下，讲清楚就可以了。

### 1、reduce 原理

```javascript
function reduce(array, reducer, initialValue) {
  let accumulator = initialValue;
  let currentIndex = 0;
  if (initialValue === undefined) {
    accumulator = array[0];
    currentIndex = 1;
  }

  for (let i = currentIndex; i < array.length; i++) {
    accumulator = reducer(accumulator, array[i]);
  }

  return accumulator;
}
```

这个 reduce 方法接受三个参数:

- array:要进行扫描的数组
- reducer:累加器函数，用于合并两个值
- initialValue:可选的初始值，如果不指定会使用数组的第一个值作为初始值

reduce 方法的工作原理是:

1. 如果指定了 initialValue，那么 accumulator 直接使用这个初始值，currentIndex 从 0 开始。
2. 如果没有指定 initialValue，那么 accumulator 使用数组的第一个值，currentIndex 从 1 开始。
3. 从当前索引开始遍历数组，调用 reducer 函数来合并 accumulator 和当前值。
4. 返回最终的 accumulator 值。

举个例子，计算数组的总和:

```javascript
const sum = (a, b) => a + b;
const total = reduce([1, 2, 3], sum); // 6
const totalWithInitial = reduce([1, 2, 3], sum, 10); // 16
```

### 2、节流防抖

防抖：是指在一段时间内，不管触发多少次回调，都只执行最后一次。

```javascript
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

节流：是指在一段时间内，不管触发多少次回调，都只执行一次。

```javascript
function throttle(fn, delay) {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, dalay);
  };
}
```

### 3、Promise 实现

```javascript
function Promise(executor) {
  let self = this;
  self.status = "pending";
  self.value = undefined;
  self.reason = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.status === "pending") {
      self.status = "resolved";
      self.value = value;
      self.onResolvedCallbacks.forEach((fn) => fn());
    }
  }

  function reject(reason) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.reason = reason;
      self.onRejectedCallbacks.forEach((fn) => fn());
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  let promise2;
  if (self.status === "resolved") {
    promise2 = new Promise(function (resolve, reject) {
      try {
        let x = onFulfilled(self.value);
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  if (self.status === "rejected") {
    promise2 = new Promise(function (resolve, reject) {
      try {
        let x = onRejected(self.reason);
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  if (self.status === "pending") {
    promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function () {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });

      self.onRejectedCallbacks.push(function () {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  let called;
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

module.exports = Promise;
```

### 4、promiseAll、promiseRace

```javascript
async function promiseAll(promises) {
  let results = [];
  let count = 0;

  for (let i = 0; i < promises.length; i++) {
    try {
      results[i] = await promises[i];
      count++;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  if (count === promises.length) {
    return Promise.resolve(results);
  }
}
```

```javascript
async function promiseRace(promises) {
  let result;

  for (let i = 0; i < promises.length; i++) {
    try {
      result = await promises[i];
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
```

### 5、深拷贝

完整版参考链接：`https://github.com/x-extends/xe-utils/blob/master/func/clone.js`

```javascript
var objectToString = require("./staticObjectToString");

var objectEach = require("./objectEach");
var arrayEach = require("./arrayEach");

function getCativeCtor(val, args) {
  var Ctor = val.__proto__.constructor;
  return args ? new Ctor(args) : new Ctor();
}

function handleValueClone(item, isDeep) {
  return isDeep ? copyValue(item, isDeep) : item;
}

function copyValue(val, isDeep) {
  if (val) {
    switch (objectToString.call(val)) {
      case "[object Object]": {
        var restObj = Object.create(Object.getPrototypeOf(value));
        objectEach(val, function (item, key) {
          restObj[key] = handleValueClone(item, isDeep);
        });
        return restObj;
      }
      case "[object Date]":
      case "[object RegExp]": {
        return getCativeCtor(val, val.valueOf());
      }
      case "[object Array]":
      case "[object Arguments]": {
        var restArr = [];
        arrayEach(val, function (item) {
          restArr.push(handleValueClone(item, isDeep));
        });
        return restArr;
      }
      case "[object Set]": {
        var restSet = getCativeCtor(val);
        restSet.forEach(function (item) {
          restSet.add(handleValueClone(item, isDeep));
        });
        return restSet;
      }
      case "[object Map]": {
        var restMap = getCativeCtor(val);
        restMap.forEach(function (item, key) {
          restMap.set(key, handleValueClone(item, isDeep));
        });
        return restMap;
      }
    }
  }
  return val;
}

/**
 * 浅拷贝/深拷贝
 *
 * @param {Object} obj 对象/数组
 * @param {Boolean} deep 是否深拷贝
 * @return {Object}
 */
function clone(obj, deep) {
  if (obj) {
    return copyValue(obj, deep);
  }
  return obj;
}

module.exports = clone;
```

简易版，递归：

```javascript
function deepClone(target, weakMap = new WeakMap()) {
  if (typeof target !== "object" || target == null) {
    if (target instanceof Function) return target.bind(this, ...arguments);
    return target;
  }
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);
  let res = new target.constructor();
  if (weakMap.get(target)) return weakMap.get(target);
  weakMap.set(res, target);
  for (let key in target) {
    res[key] = deepClone(target[key], weakMap);
  }
  return res;
}
```
