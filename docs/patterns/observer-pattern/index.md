---
author: "Choi Yang"
date: 2023-02-20
---

# 观察者模式

使用观察者模式，我们可以观察某些对象，这些对象可叫做可观察的对象。当事件触发之后，可观察的对象会通知它所有的观察者。

可观察的对象通常包含 3 个重要部分：

- `observers` 观察者：每当发生特定事件时都会通知的观察者集合

- `subscribe()` 订阅：将观察者添加到观察者集合

- `Unsubscribe()` 取消订阅：从观察者集合中删除观察者

- `notify()` 通知：每当发生特定事件时通知所有观察者

下面，我们来创建一个可观察的对象，我们使用 ES6 class 语法，如下例子：

```js
class Observable {
  constructor() {
    this.observers = []
  }

  subscribe(func) {
    this.observers.push(func)
  }

  unsubscribe(func) {
    this.observers = this.observers.filter(subscriber => subscriber !== func)
  }

  notify(data) {
    this.observers.forEach(observer => observer(data))
  }
}
```

现在，我们可以使用 `subscribe` 方法将观察者添加到观察者列表当中，而使用 `unsubscribe` 方法可以删除指定的观察者，并且可以通过 `notify` 方法通知所有的订阅。

## 思路整理

我们不妨写一个简单的应用程序，如下我们仅仅包含两个组件，一个 `Button` 和一个 `Switch`。

```jsx
export default function App() {
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
    </div>
  )
}
```

这个应用程序的功能如下：

我们希望跟踪用户与应用程序的交互，无论用户何时单击按钮或拨动开关，我们都希望用时间戳记录此事件。

除了记录它之外，我们还想创建一个 `toast` 通知，在事件发生时显示。

简单来说，就是通过打印日志和弹窗通知两种形式来记录用户的操作行为，比如用户点了一下按钮，我就打印一下日志并且通知提醒一下我做了点击操作。

那么通过观察者模式，我们就可以这样拆解，将可观察对象订阅打印日志和通知事件，每当用户点击按钮或者拨动开关的时候，都会调用可观察对象 `notify` 方法，通过 `notify` 方法我们可以将数据传递给所有的订阅者，在这里就是打印日志和通知这两个订阅者。

## 演示

来看实现的例子吧：

<iframe src='https://stackblitz.com/edit/observer-pattern-demo?devToolsHeight=33&embed=1&file=src/App.js'></iframe>

> TODO：为什么这里会有两次弹窗通知？不影响演示效果（欢迎讨论交流，可提 PR）

我们可以在许多方面使用观察者模式，比如在使用异步，基于事件的数据时，它可能非常有用。也许您希望某些组件在某些数据下载完成后，或者每当用户向消息板发送新消息时，所有其他成员都应收到通知。

## 例子学习

使用观察者模式的一个流行库是 `RxJS`，RxJS 中有大量的内置特性和示例使用了观察者模式。

> ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events. - RxJS

ReactiveX 将观察者模式与迭代器模式和函数式编程结合在一起，以满足对管理事件序列的理想方式的需求。- RXJS

使用 RxJS，我们可以创建可观察对象并订阅某些事件!

让我们看一下他们的文档中介绍的一个示例，该示例记录用户是否在文档中拖拉。

<iframe src='https://stackblitz.com/edit/observer-pattern-rxjs-demo?ctl=1&devToolsHeight=33&embed=1&file=src/App.js'></iframe>

## 优点

使用观察者模式是实现关注点分离和单一职责原则的好方法。

观察者对象与可观察对象不是紧密耦合的，并且可以在任何时候解耦。可观察对象就只用负责监视事件，而观察者只是处理接收到的数据。

## 不足

如果观察者变得过于复杂，在通知所有订阅者时可能会导致性能问题。
