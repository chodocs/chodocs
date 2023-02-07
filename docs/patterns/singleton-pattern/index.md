---
author: "Choi Yang"
contributors: ["HearLing"]
---

# 单例模式

<script setup>
import Demo1 from './demo1.vue';
import Demo2 from './demo2.vue';
</script>

<VideoLink bvId="BV1FA411o7Vm">【编程】单例模式是啥，面试居然也会问？ | Singleton Pattern
B 站视频传送门</VideoLink>

## 前言

还记得当年校招的时候，我鼓起勇气吹了自己懂一点设计模式，本来以为会是面试利器，可以和面试官交流一波。

没想到第一个问的就是单例模式，而我当时就大概学了一手 vue 源码中的代理模式和装饰者模式。

我当时的回答是，单例模式就是只能实例化一次，单个实例...

现如今当我真正了解了单例模式之后，越发觉得当时知识点是多么的浅陋。

## 概念

单例模式中的单例就是指实例化一次，就可以在全局访问了，也就是在整个应用程序中均可以共享。

直接看下面这个例子：

```js
let counter = 0

class Counter {
  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}
```

上述代码，还会有问题，单例模式只能实例化一次，如下所示，我们可以多次实例化，实例化出来的对象也是可以修改的。

```js
const counter1 = new Counter() // [!code ++]
const counter2 = new Counter() // [!code ++]
```

## Demo

<DemoContainer pkg='patterns/singleton-pattern' path='demo1.vue'>
    <Demo1/>
</DemoContainer>

## 解决多次实例化以及可修改问题

对于多实例化问题，我们可以通过变量来保存一下实例，如果实例化过了，那么就会有报错提示，如下创建了一个 instance 变量。

对于可修改问题，我们可以将实例化出来的对象用 [Object.freeze()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) 方法`冻结`一下。

> 一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

```js
let instance
let counter = 0

class Counter {
  constructor() {
    if (instance)
      throw new Error('You can only create one instance!') // [!code hl]

    instance = this // [!code hl]
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const singletonCounter = Object.freeze(new Counter()) // [!code hl]
export default singletonCounter // [!code hl]
```

基于以上代码，我们在不同文件引入，当我们调用增加或者减少的时候，会发现 count 值都会变化。

## Demo

<DemoContainer pkg='patterns/singleton-pattern' path='demo2.vue'>
    <Demo2/>
</DemoContainer>

## 优缺点

### 优点

通过限制仅仅实例化一次，即只有单个实例，可以节省大量内存空间，我们不必每次都 new 一下，开新的空间了。

不过由于 JavaScript 特殊性，我们其实可以直接创建对象，根本不需要 new，其它面向对象的编程语言（比如 Java、C++），需要创建类 class，然后再 new 一个对象，也就是我们常常说的，没对象咋办，自己 new 一个呗~

如下，我们不需要像上文那样利用 class 然后再 new 一个对象，而可以直接创建一个对象：

```js
let count = 0

const counter = {
  increment() {
    return ++count
  },
  decrement() {
    return --count
  },
}

Object.freeze(counter)
export { counter }
```

### 不足

- 测试

对于自动化测试来说的话，因为不能新创建实例，这就会导致之后的测试用例会依赖于之前的测试，那么在测试的过程中顺序很重要。

- 全局问题

单例模式共享很好，但是把一个变量放在全局多多少少会出现一些意外的问题。还有一种是组件之前相互依赖，那么对于数据流的理解也会变得复杂，在不同的组件调用来调用去，代码逻辑也会显得很混乱。

## React 当中的状态管理

在 React 中，想必大家也比较熟悉了，常用的 Redux 以及相关的拓展工具，还有 React 的一个 Hook，React Context，以及我平常也会用的 [Recoil](https://recoiljs.org/zh-hans/)。

这些只能说是与单例模式相似，但从概念和定义来看，其实是对于单例模式进行了修改与优化。

这些工具提供了仅读取状态，而上文所表述的单例模式状态其实是可变的。

在使用 Redux 时，我们不会直接去操作数据，而是在组件中通过 action 来 dispatch 一下，通知 reducer 帮我们更新数据。

可能一开始会觉得这样做是不是多此一举了，但其实这样可以避免我们直接操作数据，对于全局共享的值我们又可以进行改变，数据更新就交给 reducer 去做就好了，在组件使用角度，我们依旧还是在读取数据。

> 文章内容并不代表权威，如若有任何表述问题，欢迎大家提出以及共建文档。
