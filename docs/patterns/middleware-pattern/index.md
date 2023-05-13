---
author: "Choi Yang"
date: 2023-03-07
---

# 中介/中间件模式

通过中间件模式，我们能够更好地处理组件之间的通信，可以想象成有一个中心点，其它组件只需要由它来进行接受和转发信息即可，组件之间不需要直接对话，在 `JS` 中，一个中间件可以是一个对象字面量或者一个函数。

举个例子，可以将这种模式转换为空中交通管制员和飞行员之间的关系，飞行员只需要与空中交通管制员对话，而不是让飞行员直接相互交谈，想想，如果是直接交谈，你找我我找你，到底听谁的呢？山里都得有个老大不是哈哈，没有人管控就会非常混乱。

那么在这当中空中交通管制员的任务就是要确保所有飞机都接收到安全飞行所需的信息，不会撞到其他飞机。

那么同样在 `JS` 中，如果有大量的组件，没有一个领头的，相互之间通信也会非常混乱，对于开发者而言也很痛苦，不知道这个数据到底怎么传，如下图所示：

<CloudinaryImg publicId='patterns/middleware-pattern-1_uynu2e' alt='middleware-pattern-1'/>

那么，使用了中间件模式之后，不需要让组件之间去通信了，而是直接从多对多的关系变为了多对一的关系，如下图所示。

<CloudinaryImg publicId='patterns/middleware-pattern_ebrees' alt='middleware-pattern'/>

## 简单的聊天室

我们以一个简单的聊天室来演示中介/中间件模式，在这个聊天室里面的用户不需要私聊，而是把这个聊天室当做用户之间的中介，由聊天室来接受信息并转发信息，我们来看看代码：

<iframe src='https://stackblitz.com/edit/middleware-pattern-chatroom?devToolsHeight=33&embed=1&file=index.js'></iframe>

## Express 中的中间件学习

了解 `Express.js` 的同学一定知道它的中间件，我们现在来回顾一下，对于前端的接口路由，我们可以添加一个回调，如下代码所示：

```js 5
const app = require('express')()

app.use('/', (req, res, next) => {
  req.headers['test-header'] = 1234
  next()
})
```

注意第 5 行代码，有个 next 方法执行，代表我们会执行下一个回调，那么通过这样，在请求和响应之间就可以创建中间件函数链，如下图所示：

<CloudinaryImg publicId='patterns/middleware-express_lgniew' alt='middleware-express'/>

我们再把上述代码完善一下，看看下方的 demo，展示一个中间件链的使用：

<iframe src='https://stackblitz.com/edit/middleware-pattern-node-express?ctl=1&embed=1&file=index.js'></iframe>

当我们访问根路径 `/` 时，请求和响应之间的两个中间件都会调用。

## 总结

中间件模式让所有通信都通过一个中心点，从而简化对象之间的多对多关系。
