---
author: "HearLing"
---

# 消息队列 和 事件循环系统

事件循环非常底层和重要，学会它能让你理解页面是怎么运行的。在春招面试中，这也是一个常考的点，在输入输出题中更是非常常见。可见他的重要性，好了，我们话不多说，进入正文。

如下是我整理的思维导图，星球里有源文件获取。

![](https://chodocs-1301295644.cos.accelerate.myqcloud.com/img/202304161854479.png?imageMogr2/format/webp)

## 相关推荐

- [Loupe 可视化工具](http://latentflip.com/loupe)：这是一个可视化的工具，能够帮助了解 js 的调用栈、事件循环、回调队列之间的调用关系等等的工具，帮助我们了解代码的执行情况。

下面是两个我觉得讲的比较好的视频推荐：

- [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=cCOL7MC4Pl0&t=1592s)

- [Jake Archibald: In The Loop - JSConf.Asia](https://www.youtube.com/watch?v=8aGhZQkoFbQ)。

## 什么是事件循环

为了协调事件、用户交互、脚本、UI 渲染、网络请求，用户代理必须使用 事件循环机制（Event Loop）。

这种事件循环机制是由 JavaScript 的宿主环境来实现的，在浏览器运行环境中由浏览器内核引擎实现，而在 NodeJS 中则由 libuv 引擎实现。

主线程运行时候，产生堆（Heap）和栈（Stack），栈中的代码调用各种外部 API，它们在任务队列中加入各种事件。只要栈中的代码执行完毕，主线程就会通过事件循环机制读取任务队列，依次执行那些事件所对应的回调函数。

**运行机制：**

- 所有同步任务都在主线程上执行，形成一个 执行栈（Execution Context Stack）
- 主线程之外，还存在一个 任务队列（Task Queue）。只要异步任务有了运行结果，就在 任务队列 之中放置一个事件
- 一旦 执行栈 中的所有同步任务执行完毕，系统就会读取 任务队列，看看里面有哪些待执行事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行
- 主线程不断重复上面的第三步

> 以上是消息队列的宏任务执行过程，之后会讲到任务队列、微任务的等等一些专有名词，不用慌，下面都会讲到的~

那我们就从简单的开始说，由浅入深！

## 任务的处理

为了能更好的理解，我们来搞个场景，搞几个任务来看怎么安排：比如在大学里面我们会举行班级活动，假设是班主任要求举行一次关于 职业规划与梦想相关的主题班会，而班长就会和班委们集思广益一起探讨相关任务。

- 任务 1：确定主题名称 我们的征途是星辰大海
- 任务 2：写好活动策划书，班委各司其职
- 任务 3：采购物资与班会地点安排
- 任务 4：进行复盘总结

围绕这几个任务，看看是怎么处理的吧~

（这里例子之前也出现在博客中哈，应该有点熟悉了 hh）

## 单线程处理安排好的任务

单线程处理任务，就类似于：班主任提出需求，线程开始，各班委分配好任务，将任务按照顺序依次执行，等所有任务都执行完，班会结束，线程主动退出。整个流程如下图所示：

![](https://img-blog.csdnimg.cn/20201203204714660.png#pic_center)

### 错误机制（出现问题）

怎么样会出现问题呢？主要出现在班委分配任务上，并不是班主任一提出要求，就能把任务安排的好，可能在执行的过程中又提出新的任务了对吧，那就不好办了。。。

怎么解决呢？请看下一节：

### 引入循环机制

这个机制就是来解决：**要想在线程运行过程中，能接收并执行新的任务**。

那较为简单的实现，我们加一个`for`循环不就好了？这样线程就能一直循环执行了，如下图：

![](https://img-blog.csdnimg.cn/20201203213057423.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70#pic_center)

### 安全退出

当确定要退出当前页面的时候，页面主线程会设置一个退出标志变量，在执行完一个任务之后，判断是否有设置退出标志，来判断时候终止当前所有任务，退出线程。

## 处理其它线程发送的任务

还是这个场景，我们再扩展一下，我们上一节中说的都是【单线程】，也就是班委组织内部（主线程）的任务处理，现实情况往往可能存在于其它非班委同学也想参与，也提出任务安排，那怎么解决呢？

我们以 IO 线程为例，看看是怎么将消息发送给主线程的：

![](https://img-blog.csdnimg.cn/20201204090245424.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70#pic_center)

由上图可看到，主线程会频繁收到 IO 线程的一些任务，这里我稍微扩展一下：

- 接收到鼠标点击事件之后，渲染主线程就要开始执行`javascript` 脚本处理该点击事件。
- 接受到资源加载完成的信息后，渲染进程要开始进行 DOM 解析等。

那每个任务不能你来了就执行吧，一个不错的方法就是存起来，也就是下面要说的消息队列：

### 引入消息队列

消息队列是一种数据结构，可以存放要执行的任务，“先进先出”，也就是说新的任务添加到队尾，取任务在队头。就如图这样：

![](https://img-blog.csdnimg.cn/20201204090245424.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70#pic_center)

### 消息队列中的任务类型

包含了很多内部消息类型，如输入事件（鼠标滚动、点击、移动）、微任务、文件读写、WebSocket、JavaScript 定时器等等。

除此之外，消息队列中还包含了很多与页面相关的事件，如 JavaScript 执行、解析 DOM、样式计算、布局计算、CSS 动画等。

以上这些事件都是在主线程中执行的，所以在编写 Web 应用时，你还需要衡量这些事件所占用的时长，并想办法解决单个任务占用主线程过久的问题。

### 引入微任务

也是鉴于消息队列的“先进先出”的数据结构，后加入的任务需要等待前面的任务执行完，才会被执行，所以有问题需要被解决：

一个常见的场景就是 DOM 节点变化监听，这是一个典型的观察者模式。

不过这样也有问题：

- 因为 DOM 操作很频繁，如果每次变化都直接调用相应的 JavaScript 接口，那这个当前的任务执行时间就会被拉长，从而降低执行效率。

- 那我不直接执行，而是把这些 DOM 变化做成异步的消息时间，添加到消息队列的话，又会影响实时性。

总结：如果 DOM 发送变化，采用同步通知的方式会影响当前任务的执行效率，如果采用异步的方式，又会造成监控的实时性问题。

针对这两个问题，**微任务**产生了。

我们通常把在消息队列中的任务称为`宏任务`，每个`宏任务`中都包含了一个微任务队列，在执行`宏任务`过程中，如果有`微任务`（DOM 变化），那么就添加到`微任务`队列中，这样即不会影响`宏任务`的执行（解决执行效率问题），同时一个`宏任务`完成，渲染进程不着急执行下一个`宏任务`，而是执行当前`宏任务`的`微任务`（解决实时性问题）。

> 这小节只是说为什么引入微任务，后面章节我们再详细聊微任务

## 事件循环总结

我们来总结一下上述几节讲的内容，汇总成一张图：

![](https://img-blog.csdnimg.cn/20201204094049494.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70#pic_center)

## 处理其它进程发送的任务

还是班级活动的场景，咱们再扩充一下呢？讲了线程和其它线程（班级内部）怎么处理，那进程（其它班级）之间呢。

> 请先理解上面的【处理其它线程发送的任务】，之后再来看这张图，就很好理解了！

这个比较简单，之间看图吧：

![](https://img-blog.csdnimg.cn/2020120409534555.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70#pic_center)

渲染进程（我们班级），里面有一个专门的 IO 线程（班级外交官），用来接收其它进程（专门接收其它班级消息）传过来的消息，接到的消息再通过【处理其它线程发送的任务】给到主线程。

## 消息队列和事件循环小结

我们通过一个安排班会的场景例子带入，最后能总结以下这几点（这里就按准确一些的语言描述，避免和例子搞混）：

- 如果有一些确定好的任务，如主线程上确定好的任务，使用单线程按照顺序处理，只是第一版本的模型，显然很粗糙。

- 在线程执行中接收并处理新的任务，引入事件循环（循环语句和事件系统），能满足单线程的接收处理任务，。这是第二版，还是不够。

- 对于其它线程呢？我们引入消息队列，接收其它线程发送的任务。

- 由于消息队列的机制并不灵活，于是引入微任务，能满足效率和实时性

- 对于其它进程呢？不只是渲染进程一个进程做事啊，其它进程也会有任务发送过来，于是通过 IPC 将任务发送给 IO 线程，IO 线程再发送给主线程。

## 宏任务微任务

我们通常把在消息队列中的任务称为`宏任务`，每个`宏任务`中都包含了一个微任务队列。

### 宏任务

页面中大多数任务都是在主线程上执行，包括：渲染事件（如解析 DOM、计算布局、绘制）、用户交互事件（如鼠标点击、滚动页面、放大缩小等）、JavaScript 脚本执行事件、网络请求完成、文件读写完成事件。

简单来说就是以下这几种类型：

- script(整体代码)
- setTimeout()
- setInterval()
- postMessage
- I/O
- UI 交互事件

### setTimeout

讲到宏任务，总是离不开 setTimeout，简单来说它是一个定时器，用来指定某个函数在多少秒后执行。

也是由于它**延迟后执行** 的特性，并且还需要在指定时间间隔执行，让原本的按顺序执行的消息队列无法满足，于是 Chrome 又搞了一个消息队列，专门来存放这些延迟执行的任务，一般我们叫延迟队列。

他会等待主线程的顺序消息队列（为了和延迟消息队列做区分才这么叫）处理完，之后再到延迟队列拿里面的任务。这也就能解释，为什么尽管你设置了倒计时，然而实际上并不是在那个时间点立即被执行了。

还有一个常考的点，就是**setTimeout 的 this 指向**，不符合直觉：

```js
const name = 1
const myObj = {
  name: 2,
  showName() {
    console.log(this.name)
  },
}
setTimeout(myObj.showName, 1000) // 输出1

// 可以通过bind改变this指向
setTimeout(myObj.showName.bind(myObj), 1000)
```

### 宏任务不足点（或者问为什么不能只用宏任务）

页面的诸多任务，随时都有可能被添加到队列中，由系统操作，JavaScript 代码无法精准掌握任务在队列中的位置，很难掌控开始执行任务的时间。

因此，对于一些高实时性的需求，由于宏任务的时间间隔不能精准控制，也就无法完成。

于是有了微任务：

### 微任务

微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。每个宏任务都关联着一个微任务队列。

**微任务产生时机**

- 一种是使用 MutationObserver 监控某个 DOM 节点，然后通过 JavaScript 来修改这个节点等，当 DOM 节点发送变化，就会产生 DOM 变化记录的微任务。
- 另一种是使用 Promise，当调用 Promise.resolve()或者 Promise.reject()方法是，也会产生微任务。

**微任务执行时机**

当宏任务中 JavaScript 快执行完时，JavaScript 引擎会检查全局执行上下文中的微任务队列，然后按照顺序执行微任务。

下图，描述了在执行 ParseHTML 这个宏任务的过程中，遇到 JavaScript 脚本，进入到 JavaScript 的执行环境，全局上下中包含了微任务列表（此时是空）。在 JavaScript 脚本继续执行的过程中，分别通过`Prpomise` 和 `removeChild`创建了两个微任务，并被添加到微任务队列：

![](https://img-blog.csdnimg.cn/20201205112212220.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70#pic_center)

接着到 JavaScript 脚本执行结束，准备退出全局执行上下文（也就是检查点）的过程：

> WHATWG 把执行微任务的时间点称为检查点，检查点 JavaScript 引擎会检查微任务列表，并依次执行微任务，等微任务队列清空就退出全局执行上下文。

![](https://img-blog.csdnimg.cn/20201205112220930.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70#pic_center)

## 宏任务微任务总结（宏任务与微任务的关系）

- 每个宏任务都会创建自己的微任务队列。微任务和宏任务是绑定的关系。

- 微任务的执行时间会影响宏任务的时长。在宏任务中，微任务执行的时间比如说 1000 毫秒，这个时间也会被体现在宏任务中。

- 在一个宏任务中，创建的微任务和用于回调的宏任务，由于产生的宏任务是要插到消息队列尾端的，需要在下一次的事件循环中才会被执行，而微任务是会在这次的事件循环执行，所以可以说，微任务都早于宏任务执行（后面会有经典的例子带你理解这段话）。

## 例题巩固

由简单到复杂，话不多说直接开始：

### 例题 1

```js
console.log('start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve()
  .then(() => {
    console.log('promise1')
  })
  .then(() => {
    console.log('promise2')
  })

console.log('end')
```

解析：

![](https://img-blog.csdnimg.cn/20201205175403179.gif#pic_center)

输出：

```
start
// 存宏任务和微任务，不会直接执行
end
// 栈空，执行微任务队列中的任务（经常会有坑，需要注意一下）
promise1
promise2
// 再下一轮eventloop执行宏任务
setTimeout
```

### 例题 2

这个是有 async promise 和 setTimeout 的，杂糅：

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(() => {
  console.log('setTimeout')
}, 0)
async1()
new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})
console.log('script end')
```

输出：

```
//从上往下看，定义的两个async函数先别管（执行再说）
script start
//setTimeout放到宏任务队列
// 执行了async1（异步函数）
async1 start
// await 后面是 async2()，执行 async2（）异步函数
async2
// await 后面的代码是微任务，放入微任务队列
promise1
// .then()放到微任务队列
script end
// 同步代码（同时也是宏任务）执行完成，接着执行微任务
async1 end
promise2
//微任务队列清空，执行宏任务
setTimeout
```

### 例题 3

我把这类题成为嵌套搞死人型题，执行代码会产生很多个宏任务，每个宏任务中又会产生微任务。

```js
console.log('start')
setTimeout(() => {
  console.log('children2')
  Promise.resolve().then(() => {
    console.log('children3')
  })
}, 0)

new Promise((resolve, reject) => {
  console.log('children4')
  setTimeout(() => {
    console.log('children5')
    resolve('children6')
  }, 0)
}).then((res) => {
  console.log('children7')
  setTimeout(() => {
    console.log(res)
  }, 0)
})
```

输出：

```
start
// 遇到setTimeout，放入宏任务队列，称为宏任务1
children4
// 遇到setTimeout，放入宏任务队列，称为宏任务2
// 遇到.then  !!!不会被放到微任务队列!!!，因为resolve 是放到 setTimeout中执行的。
// 执行完检查微任务队列是空的，于是执行宏任务1
children2
// 把Promise.resolve().then放入微任务队列
// 宏任务队列1空了，检查微任务队列，执行微任务
children3
// 微任务清空，执行宏任务2
children5
// .then放入微任务队列，宏任务2执行完，执行微任务
children7
// setTimeout放入宏任务中，微任务执行完后执行
children6
```

哇，结束了~晕了晕了。多理几遍就好了嘛，也不是很难 hh

## 总结

花了一天的时间来整理，事件循环、消息队列、宏任务微任务等等的系列知识，希望对你有用~
