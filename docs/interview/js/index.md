---
author: "HearLing"
---

# JS 相关面试题第一版

总结了关于 js 常见的面试题，由于涉及到的问题太多了，有个别的问题例如事件循环，如果是完全没基础的话，需要看网络专栏里的[事件循环](/interview/browser/principle/eventLoop.html)。

当然也是由于是第一版，还有一些问题没有解答的很深，也有可能存在错误，如果你有发现错误，或者想要补充问题或答案的，都可以在本站的 GitHub 上[提交 pr](https://github.com/chodocs/chodocs/pulls)。

![](/img/js.png)

## 数据类型

### 8 种基础数据类型

- 7 种原始数据类型：Undefined、Null、Boolean、Number、String、Symbol（es6 新增，表示独一无二的值）和 BigInt（es10 新增）

- 1 种引用数据类型——Object

按储存形式分：

- 原始数据类型：直接存储在栈（stack）中，占据空间小、大小固定，属于被频繁使用数据

- 引用数据类型：同时存储在栈（stack）和堆（heap）中，占据空间大、大小不固定。引用数据类型在栈中存储指针，指向堆中该实体的地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

### 数据类型的判断

#### typeOf

- 原始数据类型：除了 null 都可以显示正确的类型

- 引用数据类型（Object）：除了函数都会显示 object

```javascript
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof []); // object     []数组的数据类型在 typeof 中被解释为 object
console.log(typeof function () {}); // function
console.log(typeof {}); // object
console.log(typeof undefined); // undefined
console.log(typeof null); // object     null 的数据类型被 typeof 解释为 object
```

#### instanceof

- 能正确判断对象类型，不能精准判断原始数据类型
- 原理：通过判断对象的原型链中是不是能找到类型的 prototype

```javascript
console.log(2 instanceof Number); // false
console.log(true instanceof Boolean); // false
console.log("str" instanceof String); // false
console.log(Array.isArray([])); // true
console.log(function () {} instanceof Function); // true
console.log({} instanceof Object); // true
```

#### constructor

- 通过判断 constructor 确定数据类型
- 不可靠在于，创建对象更改了原型

```javascript
console.log((2).constructor === Number); // true
console.log(true.constructor === Boolean); // true
console.log("str".constructor === String); // true
console.log([].constructor === Array); // true
console.log(function () {}.constructor === Function); // true
console.log({}.constructor === Object); // true

function Fn() {}

Fn.prototype = [];

const f = new Fn();

console.log(f.constructor === Fn); // false
console.log(f.constructor === Array); // true
```

#### Object.prototype.toString.call()

- toString()调用时，会获取 this 指向的那个对象的`[[Class]]`属性的值(使用了 call)。
- 使用 Object 对象的原型方法 toString ，使用 call 进行狸猫换太子，借用 Object 的 toString 方法

```javascript
const a = Object.prototype.toString;

console.log(a.call(2)); // [object Number]
console.log(a.call(true)); // [object Boolean]
console.log(a.call("str")); // [object String]
console.log(a.call([])); // [object Array]
console.log(a.call(() => {})); // [object Function]
console.log(a.call({})); // [object Object]
console.log(a.call(undefined)); // [object Undefined]
console.log(a.call(null)); // [object Null]
```

### 精度问题 0.1+0.2!==0.3

在进制转换和进阶运算的过程中出现精度损失，JavaScript 使用 Number 类型表示数字(整数和浮点数)，使用 64 位表示一个数字。

- 进制转换

  0.1 和 0.2 转换成二进制后会无限循环：

```
0.1 -> 0.0001100110011001...(无限循环)
0.2 -> 0.0011001100110011...(无限循环)
```

由于 IEEE 754 尾数位数限制，需要将后面多余的位截掉，这样在进制之间的转换中精度已经损失。

- 对阶运算

将两个进行运算的浮点数的阶码对齐的操作,目的是为使两个浮点数的尾数能够进行加减运算。运算结果是：

```
0.0100110011001100110011001100110011001100110011001100
```

转换成十进制之后就是：`0.30000000000000004`

### null 和 undefined 的区别？

一般变量声明了但还没有定义的时候会返回 undefined，null 主要用于赋值给一些可能会返回对象的变量，作为初始化。

对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。当我们使用双等 号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

> 在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## JavaScript 执行机制/执行上下文

### 变量提升

所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined。

至于为什么要变量提升，在于 JavaScript 代码在执行前需要先编译，编译时变量和函数会被放到变量环境中。

模拟演示一下：

```javascript
// 这是我们正常写的代码：
showName();
console.log(myName);
var myName = "HearLing";
function showName() {
  console.log("showName");
}
```

模拟变量提升后的效果：

```javascript
const name = undefined;
function showName() {
  console.log("showName");
}

showName();
console.log(myName);
myName = "HearLing";
```

函数和变量在执行前都提升到代码开头。而对于出现了同名的变量或者函数，最终生效的是最后一个（覆盖）。

### 块级作用域

- 作用域：是指在程序中定义变量的区域，该位置决定了变量的生命周期。通俗地理解，作用域就是变量与函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期
- **全局作用域**中的对象在代码中的任何地方都能访问，其生命周期伴随着页面的生命周期
- **函数作用域**就是在函数内部定义的变量或者函数，并且定义的变量或者函数只能在函数内部被访问。函数执行结束之后，函数内部定义的变量会被销毁

**块级作用域**：就是使用一对大括号包裹的一段代码，比如函数、判断语句、循环语句，甚至单独的一个{}都可以被看作是一个块级作用域。

ES6 引入了 **let** 和 **const** 关键字，从而使 JavaScript 拥有了块级作用域，能够解决一些变量提升带来的问题。

使用 let 关键字声明的变量是可以被改变的，而使用 const 声明的变量其值是不可以被改变的。

以下是块级作用域的理解考察题：

```javascript
function foo() {
  const a = 1;
  const b = 2;
  {
    const b = 3;
    var c = 4;
    const d = 5;
    console.log(a);
    console.log(b);
  }
  console.log(b);
  console.log(c);
  console.log(d);
}
foo();
```

分析一下：

- 1. 变量环境：a = undefined; c = undefined;词法环境：b = undefined；
- 2. 变量环境：a = 1; c = undefined;词法环境：作用域块 1（或者叫 foo 函数执行上下文）：b = 2；作用域块 2：b = undefined；d = undefined；
- 3. 变量环境：a = 1; c = 4;词法环境：作用域块 1：b = 2；作用域块 2：b = 3；d = 5：
- 4. 先在词法环境找，再在变量环境找（作用域链），于是依次输出：1、3、2、4、err

### 作用域链、闭包

通过词法环境和变量环境来查找变量，这其中就涉及到作用域链的概念。理解作用域链是理解闭包的基础。

#### 解释

**作用域链**：是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和函数。

**闭包**：在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。

#### 例题

```javascript
function foo() {
  let myName = "HearLing";
  const test1 = 1;
  const test2 = 2;
  const innerBar = {
    getName() {
      console.log(test1);
      return myName;
    },
    setName(newName) {
      myName = newName;
    },
  };
  return innerBar;
}
const bar = foo();
bar.setName("hl");
bar.getName();
console.log(bar.getName());
```

根据词法作用域的规则，内部函数 getName 和 setName 总是可以访问它们的外部函数 foo 中的变量，所以当 innerBar 对象返回给全局变量 bar 时，虽然 foo 函数已经执行结束，但是 getName 和 setName 函数依然可以使用 foo 函数中的变量 myName 和 test1。

#### 使用场景

- 在函数外部能够访问到函数内部的变量。
- 使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

## this 指向相关面试题

全局 `this` 定为指向 `window`（一般面试是在游览器环境讨论）。

在下面的 默认绑定、隐式绑定、显示绑定等，我们来看看 this 的指向是什么样的~

### 默认绑定

函数调用时，没有前缀直接调用的情况，指向全局对象 `window fn()`;

### 隐式绑定

前面存在调用它的对象，这个 `this` 就会隐式绑定到这个对象 `obj.fn()` this 指向 `obj`

### 隐式丢失：

`var o = obj.fn() ; o();` this 指向全局进行了一个赋值了，那么这个 `o` 其实是走的默认绑定 this 指向全局 window

### 显示绑定

call、bind、apply 都是用来显示改变 this 指向 call、bind、apply 他们有什么区别： bind 返回函数, call 和 apply 他们传参的区别：apply 传数组。

call、apply、bind 的手写都要会，详情见[手写题](#this-call-apply-bind)。

### 箭头函数的绑定

箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值。 如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则 this 的值则被设置为全局对象。

重点：

- 创建箭头函数时，就已经确定了它的 this 指向。
- 箭头函数内的 this 指向外层的 this。

### new 的绑定

new 也要会手写，详情见[手写题 new](#new)。当使用 new 关键字调用函数时，函数中的 this 一定是 JS 创建的新对象。

### this 的优先级

显示>隐式>默认

new>隐式>默认

不好记住的话，你可以便利的记成：箭头函数、new、bind、apply 和 call、`obj.`、直接调用、不在函数里。

### 8 例题

```javascript
const name = "window";

const person1 = {
  name: "person1",
  show1() {
    console.log(this.name);
  },
  show2: () => console.log(this.name),
  show3() {
    return function () {
      console.log(this.name);
    };
  },
  show4() {
    return () => console.log(this.name);
  },
};
const person2 = { name: "person2" };

person1.show1();
person1.show1.call(person2);

person1.show2();
person1.show2.call(person2);

person1.show3()();
person1.show3().call(person2);
person1.show3.call(person2)();

person1.show4()();
person1.show4().call(person2);
person1.show4.call(person2)();

// 正确答案如下：

person1.show1(); // person1，隐式绑定，this指向调用者 person1
person1.show1.call(person2); // person2，显式绑定，this指向 person2

person1.show2(); // window，箭头函数绑定，this指向外层作用域，即全局作用域
person1.show2.call(person2); // window，箭头函数绑定，this指向外层作用域，即全局作用域

person1.show3()(); // window，默认绑定，这是一个高阶函数，调用者是window
// 类似于`var func = person1.show3()` 执行`func()`
person1.show3().call(person2); // person2，显式绑定，this指向 person2
person1.show3.call(person2)(); // window，默认绑定，调用者是window

person1.show4()(); // person1，箭头函数绑定，this指向外层作用域，即person1函数作用域
person1.show4().call(person2); // person1，箭头函数绑定，
// this指向外层作用域，即person1函数作用域
person1.show4.call(person2)(); // person2
```

## 原型与原型链

- 当我们使用构造函数新建一个对象后，在这个对象的内部 将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的**原型**。
- 当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又 会有自己的原型，于是就这样一直找下去，也就是**原型链**的概念。

## 原型链考察输出题

```javascript
function Fn() {
  this.x = 100;
  this.y = 200;
  this.getX = function () {
    console.log(this.x);
  };
}
Fn.prototype = {
  y: 400,
  getX() {
    console.log(this.x);
  },
  getY() {
    console.log(this.y);
  },
  sum() {
    console.log(this.x + this.y);
  },
};
const f1 = new Fn();
const f2 = new Fn();
console.log(f1.getX === f2.getX); // false
console.log(f1.getY === f2.getY); // true
console.log(f1.__proto__.getY === Fn.prototype.getY); // true
console.log(f1.__proto__.getX === f2.getX); // false
console.log(f1.getX === Fn.prototype.getx);
console.log(f1.constructor); // [Function:Object]
console.log(Fn.prototype.__proto__.constructor); // [Function:Object]
f1.getX(); // 100
f1.__proto__.getX(); // undefined
f2.getY(); // 200
f2.__proto__.getY(); // 400
f1.sum(); // 300
Fn.prototype.sum(); // undedined+400=NAN
```

## 实现继承的几种方式

实现继承的几种方式，主要有以下几种，其中重点为**寄生组合继承**。

### 原型继承

优点：

- 方法复用
- 由于方法定义在父类的原型上，复用了父类构造函数原型上的方法。

缺点：

- 创建的子类实例不能传参。
- 子类实例共享了父类构造函数的引用属性（如：arr）。

```javascript
const person = {
  stu: ["x", "y", "z"],
};

const p1 = Object.create(person);
p1.stu.push("A");

console.log(person.stu); // ['x','y','z','A']
```

### 组合式继承

优点：

● 可传参： 子类实例创建可以传递参数。 ● 方法复用： 同时所有子类可以复用父类的方法。 ● 不共享父类引用属性： 子类的改变不会引起父类引用类型的共享。

缺点：

● 组合继承调用了两次父类的构造函数，造成了不必要的消耗。

```javascript
function Father(name) {
  this.name = name;
  this.type = ["x", "y", "z"];
}

Father.prototype.sayName = function () {
  console.log(this.name);
};

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

Son.prototype = new Father();
Son.prototype.constructor = Son;

// 优点一：可传参
const son1 = new Son("aaa", 11);
const son2 = new Son("bbb", 12);

// 优点二：共享父类方法
son1.sayName();
son2.sayName();

// 优点三：不共享父类引用类型
son1.type.push("Q");

console.log(son1.type);
console.log(son2.type);
```

### 寄生组合继承

核心思想： 组合继承 + 原型继承结合两者的优点。 优点： 完美！ 缺点：无！

```javascript
function Father(name) {
  this.name = name;
  this.type = ["x", "y", "z"];
}
Father.prototype.sayName = function () {
  console.log(this.name);
};

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

Son.prototype = Object.create(Father.prototype);
Son.prototype.constructor = Son;

const son1 = new Son("kk", 18);

son1.sayName();
son1.type.push("Q");
console.log(son1.type);
```

### js 用几种方式实现继承（构造函数继承、原型链继承、组合方式继承）

- 构造函数继承:通过构造函数来实现的继承，只能继承父类构造函数的属性，如果原型 prototype 上面还有方法甚至原型链上的方法，不会继承。
- 借助原型链实现继承:当我们修改某一个对象时，该函数所产出的所有新实例都会发生改变，这就造成了 数据污染 问题，肯定不是我们想要的。（因为它们引用的是同一个父类实例对象）
- 组合方式实现继承:拿得是父类的原型对象，依旧没有自己的 constructor。（和父类的原型对象是同一个对象，导致 constructor 也指向父类）
- ES6 的 extend 继承:ES6 的 extend 继承其实就是寄生组合式继承的语法糖。

## Promise、async/await、setTimeout

此小结主要来总结，异步场景比较常见的一些面试题。

关于一些手写题，如手写 Promise、手写异步调度器等等这些都归纳在[经典手写题](#经典手写题)里了，这里就大部分说理论~

### Promise 是什么

Promise 是一个 ECMAScript 6 提供的类，目的是更加优雅地书写复杂的异步任务。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的 promise 对象。

关键点：

- 1、Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）
- 2、Promise 构造函数接收一个函数作为参数，该函数的两个参数分别是 resolve 和 reject
- 3、一个 promise 对象只能改变一次状态，成功或者失败后都会返回结果数据。
- 4、then 方法可以接收两个回调函数作为参数，第一个回调函数是 Promise 对象的状态改变为 resoved 是调用，第二个回调函数是 Promise 对象的状态变为 rejected 时调用。其中第二个参数可以省略。
- 5、catch 方法，该方法相当于最近的 then 方法的第二个参数，指向 reject 的回调函数，另一个作用是，在执行 resolve 回调函数时，如果出错，抛出异常，不会停止陨星，而是进入 catch 方法中。

### 除了 then 块以外，其它两种块能否多次使用？

可以，finally 与 then 一样会按顺序执行，但是 catch 块只会执行第一个，除非 catch 块里有异常。所以最好只安排一个 catch 和 finally 块。

### then 块如何中断？

then 块默认会向下顺序执行，return 是不能中断的，可以通过 throw 来跳转至 catch 实现中断。

### 什么是 async/await

async/await 是以更舒适的方式使用 promise 的一种特殊语法，同时它也非常易于理解和使用。

关键点：

- 1、async 确保了函数返回一个 promise，也会将非 promise 的值包装进去。
- 2、await 的关键词，它只在 async 函数内工作，语法是：`let value = await promise;`,让 JavaScript 引擎等待直到 promise 完成（settle）并返回结果。
- 3、如果有 error，就会抛出异常 —— 就像那里调用了 throw error 一样。否则，就返回结果。

## 经典手写题

以下是 js 考察中经常会被面试到的一些面试题及答案的总结，供参考：

### call

- 语法：fn.call(obj,...args)
- 功能：执行 fn，使 this 为 obj，并将后面的 n 个参数传给 fn

```javascript
Function.prototype.myCall = function (obj, ...args) {
  if (obj == undefined || obj == null) {
    obj = globalThis;
  }
  obj.fn = this;
  let res = obj.fn(...args);
  delete obj.fn;
  return res;
};
value = 2;

let foo = {
  value: 1,
};

let bar = function (name, age) {
  console.log(name, age, this.value);
};

bar.myCall(foo, "HearLing", 18); //HearLing 18 1
bar.myCall(null, "HearLing", 18); //HearLing 18 2
```

### apply

- 语法：fn.apply(obj,arr)
- 功能：执行 fn，使 this 为 obj，并 arr 数组中元素传给 fn

```javascript
Function.prototype.myAplly = function (obj, arr) {
  if (obj == undefined || obj == null) {
    obj = globalThis;
  }
  obj.fn = this;
  let res = obj.fn(...arr);
  delete obj.fn;
  return res;
};
value = 2;

let foo = {
  value: 1,
};

let bar = function (name, age) {
  console.log(name, age, this.value);
};

bar.myAplly(foo, ["HearLing", 18]); //HearLing 18 1
bar.myAplly(null, ["HearLing", 18]); //HearLing 18 2
```

### bind

- 语法：fn.bind(obj,...args)
- 功能：返回一个新函数，给 fn 绑定 this 为 obj，并制定参数为后面的 n 个参数

```javascript
Function.prototype.myBind = function (obj, ...args) {
  let that = this;
  let fn = function () {
    if (this instanceof fn) {
      return new that(...args);
    } else {
      return that.call(obj, ...args);
    }
  };
  return fn;
};

value = 2;

let foo = {
  value: 1,
};

let bar = function (name, age) {
  console.log(name, age, this.value);
};
let fn = bar.myBind(foo, "HearLing", 18);
//fn() //HearLing 18 1
let a = new fn(); //HearLing 18 undefined
console.log(a.__proto__); //bar {}
```

### 区别 call()/apply()/bind()

**call(obj)/apply(obj)：**:调用函数, 指定函数中的 this 为第一个参数的值

**bind(obj):** 返回一个新的函数, 新函数内部会调用原来的函数, 且 this 为 bind()指定的第一参数的值

### 节流

- 理解：在函数多次频繁触发时，函数执行一次后，只有大于设定的执行周期后才会执行第二次
- 场景：页面滚动（scroll）、DOM 元素的拖拽（mousemove）、抢购点击（click）、播放事件算进度信息
- 功能：节流函数在设置的 delay 毫秒内最多执行一次（简单点说就是，我上个锁，不管你点了多少下，时间到了我才解锁）

```javascript
function throttle(fn, delay) {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
}
```

### 防抖

- 理解：在函数频繁触发是，在规定之间以内，只让最后一次生效
- 场景：搜索框实时联想（keyup/input）、按钮点击太快，多次请求（登录、发短信）、窗口调整（resize）
- 功能：防抖函数在被调用后，延迟 delay 毫秒后调用，没到 delay 时间，你又点了，清空计时器重新计时，直到真的等了 delay 这么多秒。

```javascript
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### 节流与防抖的区别

首先概念上的不同，解释一下什么是防抖节流；然后就是使用场景的不同；经典区分图： ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df0bec093f754804b46a86704096215b~tplv-k3u1fbpfcp-zoom-1.image)

### 函数柯里化 curry

```javascript
function mycurry(fn, beforeRoundArg = []) {
  return function () {
    let args = [...beforeRoundArg, ...arguments];
    if (args.length < fn.length) {
      return mycurry.call(this, fn, args);
    } else {
      return fn.apply(this, args);
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let sumFn = mycurry(sum);
console.log(sumFn(1)(2)(3)); //6
```

### new

```javascript
function newInstance(Fn, ...args) {
  const obj = {};
  obj.__proto__ = Fn.prototype;
  const result = Fn.call(obj, ...args);
  // 如果Fn返回的是一个对象类型, 那返回的就不再是obj, 而是Fn返回的对象否则返回obj
  return result instanceof Object ? result : obj;
}
```

### instanceof

```javascript
function instance_of(left, right) {
  let prototype = right.prototype;
  while (true) {
    if (left === null) {
      return false;
    } else if (left.__proto__ === prototype) {
      return true;
    }
    left = left.__proto__;
  }
}
let a = {};
console.log(instance_of(a, Object)); //true
```

### 深拷贝

```javascript
// 浅拷贝的方法
//JSON.parse(JSON.stringify(obj))
function deepClone(target, hashMap = new WeakMap()) {
  if (typeof target !== "object" || target == null) {
    if (target instanceof Function) return target.call(this, ...arguments);
    return target;
  }
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);
  let res = new target.constructor();
  if (hashMap.get(target)) return hashMap.get(target);
  hashMap.set(res, target);
  for (let key in target) {
    res[key] = deepClone(deepClone(target[key], hashMap));
  }
  return res;
}

const a = {
  i: Infinity,
  s: "",
  bool: false,
  n: null,
  u: undefined,
  sym: Symbol(),
  obj: {
    i: Infinity,
    s: "",
    bool: false,
    n: null,
    u: undefined,
    sym: Symbol(),
  },
  array: [
    {
      nan: NaN,
      i: Infinity,
      s: "",
      bool: false,
      n: null,
      u: undefined,
      sym: Symbol(),
    },
    123,
  ],
  fn: function () {
    return "fn";
  },
  date: new Date(),
  re: /hi\d/gi,
};
let a2 = deepClone(a);
console.log(a2 !== a);
console.log(a2.i === a.i);
console.log(a2.s === a.s);
console.log(a2.bool === a.bool);
console.log(a2.n === a.n);
console.log(a2.u === a.u);
console.log(a2.sym === a.sym);
console.log(a2.obj !== a.obj);
console.log(a2.array !== a.array);
console.log(a2.array[0] !== a.array[0]);
console.log(a2.array[0].i === a.array[0].i);
console.log(a2.array[0].s === a.array[0].s);
console.log(a2.array[0].bool === a.array[0].bool);
console.log(a2.array[0].n === a.array[0].n);
console.log(a2.array[0].u === a.array[0].u);
console.log(a2.array[0].sym === a.array[0].sym);
console.log(a2.array[1] === a.array[1]);
console.log(a2.fn !== a.fn);
console.log(a2.date !== a.date);
console.log(a2.re !== a.re);
// 都要为 true
```

### 数组扁平化

```javascript
// 递归展开
function flattern1(arr) {
  let res = [];
  arr.foreach((item) => {
    if (Array.isArray(item)) {
      res.push(...flattern1(item));
    } else {
      res.push(item);
    }
  });
  return res;
}
```

### 数组去重

```javascript
function unique(arr) {
  const res = [];
  const obj = {};
  arr.forEach((item) => {
    if (obj[item] === undefined) {
      obj[item] = true;
      res.push(item);
    }
  });
  return res;
}
//其他方法
//Array.from(new Set(array))
//[...new Set(array)]
```

### 手写 reduce

```javascript
// 语法 array.reduce(function(prev, currentValue, currentIndex, arr), initialValue)
Array.prototype.MyReduce = function (fn, initialValue) {
  // 浅拷贝数组
  const arr = Array.prototype.slice.call(this);
  // 注意: reduce() 对于空数组是不会执行回调函数的。
  if (!arr.length) return;

  let res; // res(是上面的prev)
  // 默认初始值
  res = initialValue || arr[0];
  // 遍历数组的每一个值
  for (let i = initialValue ? 0 : 1; i < arr.length; i++) {
    // 每一个值都会在该方法中被（加工处理），
    res = fn.call(null, res, arr[i], i, this);
  }
  // 最后的返回值
  return res;
};
```

### 带并发的异步调度器

这类题目有很多，核心考察就是 **限制运行任务的数量**。

为了能快速理解，我先讲一个通俗的例子：首先要限制数量，我们可以用一个栈，栈不能超过两格（假设限制数量为`2`），当放进去的两个任务，一个快一些先执行完，那么弹出该任务，接下一个，如此类推。。。

> 进阶：两个请求一直占着位置，没有请求回数据，因为它们没执行完成导致后面的请求也进不来，导致阻塞，怎么办呢。。。第一肯定是要判断阻塞，两个请求占的时间过久。第二记录这两个请求并清空栈，允许其他链接请求。最后根据场景，对数据进行处理，比如你需要对没请求的数据再重新请求，或者提示等。

为了展示更加直观，我选了最经典的一道面试题：

#### setTimeout 实现

用 `setTimeout` 实现需要 **注意** 的是它是直接 `add` 的 `time` 和 `val` ，而不是返回 `promise` 的函数，所以可以在 `add` 里实现：

```javascript
// 设计并发调度器， 最多允许两个任务运行
const scheduler = new Scheduler(2);
// 这里的timer有的会写1有的会直接写1000，需要灵活解题
scheduler.addTask(5, "1");
scheduler.addTask(3, "2");
scheduler.addTask(1, "3");
scheduler.addTask(2, "4");
scheduler.start();
// 输出:2314
```

思路：

1. 用一个 `count` 记录并发的数量，用一个 `taskList` 数组保存任务。
2. `addTask` 如名字，将任务一一存入 `taskList` 。
3. 递归调用 `start` ，递归结束条件没有数据了，进入条件没有超过并发数。再通过 `count` 记录并发数量，从数组取出来一个 `count++` ，执行完一个 `count--` 。

```javascript
class Scheduler {
  constructor(maxNum) {
    this.maxNum = maxNum;
    this.count = 0;
    this.taskList = [];
  }

  addTask(time, val) {
    this.taskList.push([time, val]);
  }

  start() {
    if (!this.taskList.length) return;
    if (this.count < this.maxNum) {
      const [time, val] = this.taskList.shift();
      this.count++;
      setTimeout(() => {
        console.log(val);
        this.count--;
        this.start();
      }, time * 1000);
      this.start();
    }
  }
}
```

#### promise 实现

用 `promise` 写的话，实例代码就应该是下面这样：

```javascript
const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(5000, "1");
addTask(3000, "2");
addTask(1000, "3");
addTask(2000, "4");
```

需要注意的是使用 `promise` 实现的话也是离不开循环 `.then` 的，所以我们抽出一个函数来实现 `then` 的链式调用。

1. 需要一个函数来实现 `add` 记录要执行的 `promiseCreator` ，还需要一个函数在执行的时候就去第一个就可以了。

2. 要求只有一个 `add` 函数，所以我们需要在 `add` 里记录 `promiseCreator` 以及执行 `run` 。

3. `run` 来触发异步函数的执行，这里的触发有两处，一处为 `add` 一个 `promise` 就 `run` ，另一个是自己执行完一个再 `then` 里执行 `run` ，当大于 `max` 时阻止继续 `run` 。

> 这里如果想不明白的话，可以换一个生活里的场景。比如吃火锅，我喜欢吃虾滑，虾滑一个个下锅，煮熟就把它放到碗里，可碗就那么大只能放两个虾滑，吃一个才能从锅里取一个，直到锅里没有虾滑了。相信有了上述的这个场景，你能写出不一样的题解，这是我实现的既符合题意又相对简洁的 promise 实现：

```javascript
class Scheduler {
  constructor() {
    this.taskList = [];
    this.maxNum = 2;
    this.count = 0;
  }

  add(promiseCreator) {
    this.taskList.push(promiseCreator);
    this.run();
  }

  run() {
    if (this.count >= this.maxNum || this.taskList.length == 0) return;

    this.count++;
    this.taskList
      .shift()()
      .then(() => {
        this.count--;
        this.run();
      });
  }
}
```

#### async 实现

最简单地写法还得是 `async` （这里换了一种写法，你也可以用类实现），然后帮助理解如果没有 `start` 函数，怎么直接在 `add` 函数中实现逻辑：

1. 用一个 `count` 记录并发的数量，用一个 `taskList` 数组保存任务。
2. 异步函数 `add` 接受异步任务返回 `promise` 。
3. 这里没有递归调用， `add` 一个异步任务，就执行，并用 `count` 记录并发数量。
4. 关键思想：当并发数超过限制，我们 `await` 一个不被 `resolve` 的 `promise` ，当完成了一个请求有位置了，才 `resolve`。

```javascript
function scheduler(maxNum) {
  const taskList = [];
  let count = 0;

  return async function add(promiseCreator) {
    if (count >= maxNum) {
      await new Promise((resolve, reject) => {
        taskList.push(resolve);
      });
    }
    count++;
    const res = await promiseCreator();
    count--;
    if (taskList.length > 0) taskList.shift()();

    return res;
  };
}
```

### 实现一个 EventMitter（设计模式）

在这个类里我们要明确，需要具备的变量和函数：

1. 需要一个维护事件和监听者的对象
2. 使用 `on` 函数注册事件监听者
3. 使用 `emit` 函数发布事件
4. 使用 `off` 函数移除某个事件的一个监听者

```javascript
class EventEmitter {
  constructor() {
    // 维护事件及监听者
    this.listeners = {};
  }

  /**
   * 注册事件监听者
   * @param {String} type 事件类型
   * @param {Function} cb 回调函数
   */
  on(type, cb) {
    if (!this.listeners[type]) this.listeners[type] = [];

    this.listeners[type].push(cb);
  }

  /**
   * 发布事件
   * @param {String} type 事件类型
   * @param  {...any} args 参数列表，把emit传递的参数赋给回调函数
   */
  emit(type, ...args) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((cb) => {
        cb(...args);
      });
    }
  }

  /**
   * 移除某个事件的一个监听者
   * @param {String} type 事件类型
   * @param {Function} cb 回调函数
   */
  off(type, cb) {
    if (this.listeners[type]) {
      const targetIndex = this.listeners[type].findIndex((item) => item === cb);
      if (targetIndex !== -1) this.listeners[type].splice(targetIndex, 1);

      if (this.listeners[type].length === 0) delete this.listeners[type];
    }
  }
}
// 创建事件管理器实例
const ee = new EventEmitter();
// 注册事件监听者
ee.on(
  "设计模式",
  (fn1 = function (price) {
    console.log(`HearLing订阅设计模式这本书的价格是:${price}`);
  })
);
ee.on("你不知道JavaScript", (price) => {
  console.log(`HearLing订阅你不知道JavaScript这本书的价格是:${price}`);
});
ee.emit("设计模式", 100); // 输出HearLing订阅设计模式这本书的价格是:100

ee.off("设计模式", fn1);
ee.emit("设计模式"); // 此时事件监听已经被移除，没有console.log
```

### EventMitter 增强版

另增加函数，完善功能：

1. 使用 `once` 函数只执行一次
2. 使用 `offAll` 函数移除某个事件的所有监听者

```javascript
// 在上节代码新增
/**
 * 某个事件只监听一次
 * @param {String} type 事件类型
 * @param {Function} cb 回调函数
 */
once(type, cb) {
   const execFn = () => {
     cb.apply(this);
     this.off(type, execFn);
   };
   this.on(type, execFn);
}

/**
 * 移除某个事件的所有监听者
 * @param {String} type 事件类型
 */
offAll(type) {
    if (this.listeners[type]) {
        delete this.listeners[type]
    }
}
```

### 快排（算法）

- 时间复杂度：nlogn~n2
- 代码实现：

```javascript
function quickSort(arr) {
  if (arr.length < 2) return arr;

  const cur = arr[arr.length - 1];
  const left = arr.filter((v, i) => v <= cur && i !== arr.length - 1);
  const right = arr.filter((v) => v > cur);
  return [...quickSort(left), cur, ...quickSort(right)];
}
// console.log(quickSort([3, 6, 2, 4, 1]));
```

### 大数相加（算法）

```javascript
function add(a, b) {
  // 取两个数字的最大长度
  const maxLength = Math.max(a.length, b.length);
  // 用0去补齐长度
  a = a.padStart(maxLength, 0); // "0009007199254740991"
  b = b.padStart(maxLength, 0); // "1234567899999999999"
  // 定义加法过程中需要用到的变量
  let t = 0;
  let f = 0; // "进位"
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f !== 0) sum = `${f}${sum}`;

  return sum;
}
```

## js 常用方法（ES6 新特性）

常考的，比如简单列举，数组方法有哪些，以及 Set、Map、Proxy 等 ES6 方法

对于**数组方法、字符串方法**等还不熟悉的朋友，可以访问[网址链接](https://www.runoob.com/jsref/jsref-obj-array.html)，自己好好背和练习，这里就不一个个列举出来了。

**Set**: ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。关于 set 的使用：可以通过链式的使用 add 添加值，可以使用 has 方法检查 Set 实例中是否存在特定的值，可以使用 size 属性获得 Set 实例的长度，使用 clear 方法删除 Set 中的数据。

**WeakSet**： 与 Set 类似，也是不重复的值的集合。但是 WeakSet 的成员只能是对象，而不能是其他类型的值。WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。

**Map**：它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

**WeakMap**：与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。

**Proxy**：Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写（一种中介者模式）。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

**ES6** 新特性，涉及的内容会比较多，暂时不准备专门出一篇讲，已经有总结得很好的网站了 https://es6.ruanyifeng.com/ ，如果还没掌握的强烈建议多看几遍咯。一般面试，其实就要你说一说你了解的 ES6 的哪些东西，然后面试官再挑其中的一两个问，所以也不用太纠结部分不记得~
