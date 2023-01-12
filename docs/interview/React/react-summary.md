# React 模拟面试题 2023 版

> 之前总结了 Vue 相关的面试题，看的人没想到挺多的，但是也为我带来了不小的争议。虽然我有明确写出答案《仅供参考》但是还是有同学照抄呀，这么说呢就是你完全没有思考直接跟面试官对答，就算你没说错但也经不起细问的呀。

废话不多说，俺还是比较关心大伙的春秋招面试准备得咋样了，面试的 React 复习得怎么样了呢？

如果你感觉在 React 这方面还比较薄弱的话，不如来做一做这套模拟面试吧，看看大伙能不能打个满分，祝你顺利~

🌸🌸🌸🌸🌸**答案仅供参考**🌸🌸🌸🌸🌸

欢迎访问[GitHub 仓库](https://github.com/Chocolate1999/Front-end-learning-to-organize-notes/issues)，目前已经有 `552` 道大厂真题了，涵盖各类前端的真题。也可以访问我的 [个人博客](https://chodocs.cn/meeting/) ，我的文章会第一时间更新在这。

## 免杠声明

1、咱们是 **模拟面试** 并且是 **React** 专题 ，不是你真实面试的场景，咱们是把 React 面试题集中到了这场模拟面试中了。

2、因为是模拟面试，所以会有一些 **情景导入** 以及模拟面试官（也就是我）的 **心理活动**。目的是能让你有点被面试的感觉，以及让你了解一些面试官在想些什么。当然如果觉得啰嗦的话，直接点目录就可以到你想看的题了。

3、<font color="red">**答案仅供参考**</font> **答案会详略得当，不会面面俱到**。我更偏向于告诉你，这个题第一层你可以怎么展开，第二层在你展开的这几点各自下面的重要点又是什么。至于你要不要扩充各个层级的点，以及要不要更深入增加层级，就是需要自己去思考和研究的了。

## ------ 进入正题化身为面试官 ------

📞📞 电话拨通中，喂～，听得到吗，听得到是吧 😊，那我们面试开始了，你先做个自我介绍吧
。。。

> 在你自我介绍的时候呢，我就看看你做过的项目，技术栈什么的。

看你的项目经历写的是 React 项目，有写过其他项目嘛？你觉得 React 好在哪里呢？或者为什么选择 React 呢？

## 1、简述一下 React？

首先要明确的是这是一个开发性的问题，他没有标准答案，目的其实更偏向于打开你的话匣子，所以这里可以尽量分维度的多说一些。同时这里要避免几个坑：第一是陷入一个点一直说（除非面试官显得很有兴趣），第二是说不到点子，第三是对比框架踩一捧一。

<details><summary><b>参考答案</b></summary>

(我这里写的比较全哦，比较概况，可以根据自己掌握情况做适当拓展)

1、一句话解释技术本质：React 是一个用于构建用户界面的 JavaScript 库。

2、核心概念：核心概念有三点，分别是声明式、组件化与 通用性。声明式-直观与组合。组件化-视图的拆分与模块复用，高内聚低耦合。通用性-一次学习，随处编写。

3、对比/优缺点：首先对比其他库比如 vue、jQuery，React 没有引入模板，而是通过 jsx 的语法编写组件化的 ui，代码更为简洁。其次 React 在减少操作 dom 等性能优化上采用的了虚拟 dom 的技术，现在这个技术被广泛的学习和认可。在者，React 提供的各种 hook，能让开发者编写更高效稳定的代码。最后，当然 React 也有缺点， 由于 React 并不是一个一揽子框架，所以导致在技术选型与学习使用上有比较高的成本。

</details>

> 😶 至于为啥问这个问题，其实也是有点私心哈哈，毕竟这个问题你可以自己说出一些你认为 react 核心的东西，往往可能是 hook、虚拟 dom、组件化、jsx 等等，这种你说出来的我更乐意问，不然真的就像考试一样，拿着面试题一个个问了。这里可能我会顺着你说的 react 区别其他组件的点，顺着说，比如下面的这几个例子。

诶，你刚刚说到了 JSX，那你说说什么是 JSX 呗？为什么 React 要使用 JSX？

## 2、什么是 JSX，为什么要使用 JSX？

<details><summary><b>参考答案</b></summary>
是什么？：

JSX 是一个 JavaScript 的语法扩展，结构类似 XML。JSX 主要用于声明 React 元素，但 React 中并不强制使用 JSX。即使使用了 JSX，也会在构建过程中，通过 Babel 插件编译为 React.createElement。所以 JSX 更像是 React.createElement 的一种语法糖。

为什么？：

1、JSX 是一个 JavaScript 的语法扩展，没有引入新概念，上手简单

2、JavaScript 的语法扩展+结构类似 XML，代码变得更为简洁，而且代码结构层次更为清晰。

3、结构类似 XML，React 需要将组件转化为虚拟 DOM 树，所以在编写代码时，实际上是在手写一棵结构树。而 XML 在树结构的描述上天生具有可读性强的优势。

</details>

听你有说到 hooks，我们公司现在项目基本都是用 hooks，那你自己有写过 hooks 嘛？说一下 useRef 的实际使用场景吧？

## 3、详细说说某某 hook？

> 可能第一个问题你有说到 hooks 以及他的好处什么的，那么这下面这道题就是看看你对是不是只是停留在会说。这类问题主要考察你对 hooks 的熟练程度，至少需要答到，它什么时候用，以及需要注意的点。

这里我就不一个个的列出 hook 了，就以 useRef 为例吧：

<details><summary><b>参考答案</b></summary>
useRef 的应用场景主要是：函数组件需有访问 dom 元素的场景，以及保持可变变量的场景。
需要知道的是：ref.current 发生变化并不会造成 re-render; useRef 和 useState 不同，如果一个状态或者数据会影响 DOM 的渲染结果，一定要避免使用 useRef 来保持引用
</details>

## 4、React 组件通信

<details><summary><b>参考答案</b></summary>
父组件 => 子组件：

- Props
- Instance Methods

子组件 => 父组件：

- Callback Functions
- Event Bubbling

兄弟组件之间：

- Parent Component

不太相关的组件之间：

- Context
- Portals
- Observer Pattern
- Redux 等

</details>

## ------ 源码考察分界线 ------

> 第三题也能聊到源码哈，下面的几道题是关于 React 核心的 架构 和虚拟 DOM 的。

## 5、setState 是同步更新还是异步更新？

<details><summary><b>参考答案</b></summary>
在源码中，通过 isBatchingUpdates 来判断 setState 是先存进 state 队列还是直接更新，如果值为 true 则执行异步操作，为 false 则直接更新。一般认为，做异步设计是为了性能优化、减少渲染次数。

一般会被追问（也可以自己说）：在什么情况下 isBatchingUpdates 会为 true 呢？

- 在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，都会走合并操作，延迟更新的策略。

- 在 React 无法控制的地方，比如原生事件，具体就是在 addEventListener 、setTimeout、setInterval 等事件中，就只能同步更新。

</details>

有看过 React 的源码嘛？可以简单的向我描述一下 Fiber 架构吗

## 6、简述 fiber 架构

<details><summary><b>参考答案</b></summary>
React16 开始的fiber架构可以分为三层，相较于React15，新增了Scheduler（调度器），Reconciler从递归处理虚拟DOM变为可中断的循环过程，：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入 Reconciler
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

官方也推荐了 [答案 1](https://github.com/acdlite/react-fiber-architecture) 和 [答案 2](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)
，我这里基于此题，简单描述一下，什么是 Fiber ，以及解决了什么问题，怎么解决的（进阶）。

**是什么？**

Fiber 是 React 16 中采用的新协调（reconciliation）引擎，主要目标是支持虚拟 DOM 的渐进式渲染。

**解决了什么问题？**

Fiber 将原有的 Stack Reconciler 替换为 Fiber Reconciler，提高了复杂应用的可响应性和性能。

**怎么解决的**

- 对大型复杂任务的分片。
- 对任务划分优先级，优先调度高优先级的任务。
- 调度过程中，可以对任务进行挂起、恢复、终止等操作。

::: warning TODO
简述可能错在错误理解，后续会更新详细文章解答。
:::

</details>

## 7、虚拟 DOM 的工作原理

<details><summary><b>参考答案</b></summary>
这个问题可能就会让你摸不着头脑，要讲清一个技术的原理，我们只要从三大方面着手就行，是什么、为什么、怎么做。这个问题可能不会问的这么泛，可能会问更细一点，比如：什么是虚拟DOM，他有什么优缺点，如何实现虚拟DOM。

**什么是虚拟 DOM**

虚拟 DOM 实际上它只是一层对真实 DOM 的抽象，以 JavaScript 对象 (VNode 节点) 作为基础的树，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实环境上。

**虚拟 DOM 优缺点**

优点：改善大规模 DOM 操作的性能、规避 XSS 风险、能以较低的成本实现跨平台开发。

缺点：内存占用较高，因为需要模拟整个网页的真实 DOM。高性能应用场景存在难以优化的情况，类似像 Google Earth 一类的高性能前端应用在技术选型上往往不会选择 React。

**如何实现虚拟 DOM**

1、h 函数，用 JS 对象模拟 DOM 树

2、render 函数，实现渲染，从 Virtual DOM 映射到真实 DOM

3、mount 函数，实现挂载

4、diff 算法:比较两棵虚拟 DOM 树的差异

</details>

那你再说说 React 的 Diff 算法是怎么实现的吧

## 8、React 的 diff 算法

<details><summary><b>参考答案</b></summary>

diff 算法是一种对比两个树差异的一种算法，那在 React 里就是对比新旧树的差异了。那么我们可以说 React 中 Diff 算法的本质是：

对比 current Fiber

> 如果该 DOM 节点已在页面中，current Fiber 代表该 DOM 节点对应的 Fiber 节点。

和 JSX 对象

> 即 ClassComponent 的 render 方法的返回结果，或 FunctionComponent 的调用结果。JSX 对象中包含描述 DOM 节点的信息。

并且生成 workInProgress Fiber。

> 如果该 DOM 节点将在本次更新中渲染到页面中，workInProgress Fiber 代表该 DOM 节点对应的 Fiber 节点。

React 对 diff 算法的优化，毕竟要完全对比两棵树的复杂度是很大的，所以 React 的 diff 算法预设了三个限制：

- 只对同级元素进行 Diff。如果一个 DOM 节点在前后两次更新中跨越了层级，那么 React 不会尝试复用他。

- 两个不同类型的元素会产生出不同的树。如果元素由 div 变为 p，React 会销毁 div 及其子孙节点，并新建 p 及其子孙节点。

- 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定。

</details>

## ------ 技术栈分界线 ------

以上都是多少都可以问一问的题，下面的就涉及技术栈了。你可以理解为根据公司技术栈出题。也可以理解为和 React 强相关的技术栈出题。

::: tip
篇幅原因，只是挑选了一些面试中和 React 相关性比较强，且比较常见的问题。
:::

## class

下面两道问题一般是公司存在 class 语法代码可能会问的题。
打个比方：公司项目旧代码是用 class 写的，希望你来了能维护或者重构就会问一些 class 的知识。

## 9、class 与 hooks 的区别/优劣

<details><summary><b>参考答案</b></summary>

- 共同点是两者的功能和效果都是一样的，类组件和函数组件都可以作为基础组件展示 UI。

- 他们的设计理念不一样，一个是面向对象，一个是函数式。面向对象的核心是继承、生命周期等这些。而函数式 immutable（不变）、没有副作用、引用透明等这些特点。

- Hooks 更优的原因： Hooks 有确定的输入输出，没有 this 指向问题，也不用 renderprops 或者 Hoc 去解决复用状态逻辑的问题，它是一个组合的思想，组合更优于继承。class 组件业务逻辑散落在生命周期中，Hooks 则淡化了生命周期的概念。Hooks 的函数组件可以提供比原先更细粒度的逻辑组织与复用，且能更好地适用于时间切片与并发模式。

</details>

## 10、聊聊 class 与 hook 的生命周期

<details><summary><b>参考答案</b></summary>
分为三个阶段 挂载->更新-> 卸载 （Error）

详细请看表格，其中标注 UNSAFE\_ 的都是被弃用的，通过这个表格可知道各方法所处的时期：

|             | Mount                                                                  | Update                                                                                                                | Unmount              | Error                    |
| ----------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------ |
| Render 阶段 | construct、getDerivedStateFromProps、UNSAFE_componentWillMount、Render | UNSAFE_componentWillReceiveProps、getDerivedStateFromProps、shouldComponentUpdate、UNSAFE_componentWillUpdate、Render |                      | getDerivedStateFromError |
| commit 阶段 | componentDidMount、getSnapshotBeforeUpdate                             | componentDidUpdate                                                                                                    | componentWillUnmount | componentDidCatch        |

- 对于异步请求，应该放在 componentDidMount 中去操作。
  > constructor：可以放，但从设计上而言不推荐。constructor 主要用于初始化 state 与函数绑定，不承载业务逻辑且现在已经很少使用了。componentWillMount：已被标记废弃，在新的异步渲染架构下会触发多次渲染，容易引发 Bug。
- getDerivedStateFromProps 容易编写反模式代码，使受控组件与非受控组件区分模糊。

- UNSAFE_componentWillMount 被标记弃用，主要原因是新的异步渲染架构会导致它被多次调用。所以网络请求及事件绑定代码应移至 componentDidMount 中。

- UNSAFE_componentWillReceiveProps 被标记弃用，被 getDerivedStateFromProps 所取代，主要原因是性能问题。

- shouldComponentUpdate 通过返回 true 或者 false 来确定是否需要触发新的渲染。主要用于性能优化。

- UNSAFE_componentWillUpdate 同样是由于新的异步渲染机制，而被标记废弃，原先的逻辑可结合 getSnapshotBeforeUpdate 与 componentDidUpdate 改造使用。

- 如果在 componentWillUnmount 函数中忘记解除事件绑定，取消定时器等清理操作，容易引发 bug。

- 如果没有添加错误边界处理，当渲染发生异常时，用户将会看到一个无法操作的白屏，所以一定要添加。

</details>

## vue

还有的公司 React 和 Vue 技术栈都有，你过来可能主要还是写 React 但是也希望你会一些 Vue。那么下面几道题你很可能会遇到。

情景导入：如果简历没写我可能会问，之前有写过 Vue 项目嘛？（有写过啊，就直接问，没写过就跳过这个技术栈）简历有写的话我就会说，我看你的 xxx 项目是用 Vue 写的，那。。。

## 11、你觉得 React 与 Vue 的区别主要在哪呢？

<details><summary><b>参考答案</b></summary>

**1、各自推崇的/核心思想**

- React 推崇函数式编程（纯组件），数据不可变以及单向数据流。函数式编程最大的好处是其无副作用（稳定性）和确定的输入输出（可测试性），所以通常说 React 适合大型应用。

- Vue 推崇灵活易用（渐进式开发体验），数据可变，双向数据绑定。尽可能的降低了前端开发的门槛。

**2、写法差异**

- React 没有太多的概念和 api，推崇 all in js，使用 JSX 和 部分 hook 就能开发。通过原生 JS 实现模板中的常见语法，比如插值，条件，循环等，都是通过 JS 语法实现的。更加原生。要求更高的 js 能力，以及对设计模式（也可以说开发经验）的掌握。

- Vue 是基于 template 模板 + options API。引入了较多的概念和 api，需要理解或记住大部分概念和 api 才能编写。更要求熟练使用官方概念和 api。

**3、数据流**

- React 提倡的是单向数据流，数据不可变，需要 setState 驱动新的 State 替换老的 State。

- Vue 数据被观测是双向绑定的，省去了数据手动处理更加便捷。

**4、Render（渲染过程）**

- React 在应用的状态被改变时，全部子组件都会重新渲染。通过 shouldComponentUpdate 这个生命周期方法可以进行控制，但 Vue 将此视为默认的优化。

- Vue 可以更快地计算出 Virtual DOM 的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。

**5、事件机制**

- React 原生事件被包装，所有事件都冒泡到顶层 document 监听，然后在这里合成事件下发。基于这套，可以跨端使用事件机制，而不是和 Web DOM 强绑定。React 组件上无事件，父子组件通信使用 props。

- Vue 原生事件使用标准 Web 事件，Vue 组件自定义事件机制，是父子组件通信基础，Vue 合理利用了 snabbdom 库的模块插件

6、<font color=gray>diff 算法实现</font>

- React 主要使用 diff 队列保存需要更新哪些 DOM，得到 patch 树，再统一操作批量更新 DOM。

- Vue Diff 使用双向链表，边对比，边更新 DOM。

7、<font color=gray>社区和未来发展</font>

> 注意两者处于不同赛道，不存在谁取代谁这一说法，别踩一捧一。

- React 只关注底层，上层应用解决方案交给社区，造就了 React 社区繁荣，同时 React 团队有更多时间专注底层。未来 React 的发展依然会在 函数式编程 这个核心思想的下进行升级。

- Vue 提供了一揽子全家桶解决方案，比如 Vuex、Vue-Router、Vue-CLI、Vutur 工具等。减少选择困难症，只需认准官方给出的解决方案即可。Vue 依然会定位简单易上手（渐进式开发），依然是考虑通过依赖收集来实现数据可变。

</details>

## 12、vuex 与 redux 的区别

<details><summary><b>参考答案</b></summary>

**从使用上来说**

- 在 Vuex 中，$store被直接注入到了组件实例中，因此可以比较灵活的使用：使用dispatch、commit提交更新，通过mapState或者直接通过this.$store 来读取数据。

- 在 Redux 中，我们每一个组件都需要显式的用 connect 把需要的 props 和 dispatch 连接起来。

- Vuex 更加灵活一些，组件中既可以 dispatch action，也可以 commit updates，而 Redux 中只能进行 dispatch，不能直接调用 reducer 进行修改。

**从实现原理来说**

- Redux 使用的是不可变数据，而 Vuex 的数据是可变的。

- Redux 每次都是用新 state 替换旧 state，而 Vuex 是直接修改。

- Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而 Vuex 其实和 Vue 的原理一样，是通过 getter/setter 来比较的。

</details>

## 状态/路由

## 13、flux 状态管理

<details><summary><b>参考答案</b></summary>

Flux 是一种基于单向数据流的架构。架构如图所示：

![flux.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4876bf2f94ee4bc2a9a68a0e75e360bf~tplv-k3u1fbpfcp-watermark.image?)

具体流程：Store 存储了视图层所有的数据，当 Store 变化后会引起 View 层的更新。如果在视图层触发 Action，比如点击一个按钮，当前的页面数据值会发生变化。Action 会被 Dispatcher 进行统一的收发处理，传递给 Store 层。由于 Store 层已经注册过相关 Action 的处理逻辑，处理对应的内部状态变化后，会触发 View 层更新。

</details>

## 14、简述 redux 状态管理

<details><summary><b>参考答案</b></summary>

**核心设计**

包含了三大原则：单一数据源、纯函数 Reducer、State 是只读的。

一个核心点是处理“副作用”。

- 第一类是在 Dispatch 的时候会有一个 middleware 中间件层，拦截分发的 Action 并添加额外的复杂行为，还可以添加副作用。
- 第二类是允许 Reducer 层中直接处理副作用，采取该方案的有 React Loop，React Loop 在实现中采用了 Elm 中分形的思想，使代码具备更强的组合能力。

> AJAX 请求等异步工作，或不是纯函数产生的第三方的交互都被认为是 “副作用”

**数据流**

Redux  中整个数据流的方案与 Flux 大同小异。

首先是 dispatch 一个 action。然后 reducer 会收到这个 action, 根据这个 action 对状态进行修改。状态修改以后会被处理容器捕捉到。从而对相关的界面进行更新。

![redux.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/6/24/1642fe4239346286~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

<font color=gray>另外一些需要知道的</font>

- Store，Store 存放应用程序的状态，并且有帮助函数来访问这些状态。Store 可以用来聆听变化和发送 action。Store 只有一个。
- Reducers，数据的状态是通过 reducer 函数来改变的。
- Actions，Actions 代表的是一个对象。有两部分，一个是 action 本身，另一个就是它的 payload。简单说就是对哪些数据进行哪些操作。
- React-Redux，Redux 本身和 React 没有关系，只是数据处理中心，是 React-Redux 让他们联系在一起。React-rRedux 提供两个方法：connect 和 Provider。

</details>

## 15、mobx 和 redux 有什么区别？

<details><summary><b>参考答案</b></summary>

- 核心的差异：Redux 是单向数据流，Mobx 则是通过监听数据的属性变化，直接在数据上更改来触发 UI 的渲染。
- redux 是只读的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数。mobx 中的状态是可变的，可以直接对其进行修改。
- mobx 结果也难以预测，调试会比较困难。redux 提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

</details>

## 16、React-Router 的实现原理是什么？

<details><summary><b>参考答案</b></summary>

基于 history 库来实现不同的客户端路由实现思想，并且能够保存历史记录等，磨平浏览器差异，上层无感知。

> 不同的客户端路由实现思想:1、基于 hash 的路由：通过监听 hashchange 事件，感知 > hash 的变化。通过 location.hash=xxx 改变 hash 。2、基于 H5 history 路由：通过自定义事件触发实现监听 url 的变化。可以通过 history.pushState 和 resplaceState 等改变 url ，会将 URL 压入堆栈，同时能够应用 history.go() 等 API。

通过维护的列表，在每次 URL 发生变化的回收，通过配置的 路由路径，匹配到对应的 Component，并且 render。

</details>

## 17、React-Router 实现路由切换

<details><summary><b>参考答案</b></summary>
有几种方式：

- 使用 `<Route>` ，会比较 `<Route>` 的 path 属性和当前地址的 pathname 实现路由切换。

- 使用 `<Switch>` 会遍历其所有的子 `<Route>` 元素，并仅渲染与当前地址匹配的第一个元素。

- 使用`<Link>`、 `<NavLink>`、`<Redirect>`，会在你的应用程序中创建链接，通过 to 属性与当前地址匹配。

</details>

## 18、React-Router 如何获取 URL 的参数和历史对象？

<details><summary><b>参考答案</b></summary>

- get 传值：通过 location.search 获取 url 获取到一个字符串'?id='1111'，通过浏览器的 URLSearchParams api 或自封装字符串解析方法解析出 id 的值。
- 动态路由传值：通过 match.params.id 或者 useParams（Hooks）取得 url 中的动态路由 id 部分的值
- 通过 query 或 state 传值：to 属性传递对象或数组时，通过 location.state 或 location.query 来获取即可，但是存在缺点就是，只要刷新页面参数就会丢失。
</details>

## ------ 设计模式/代码优化 ------

React 是对设计模式的能力很有要求的，这里只列举和 React 强相关的设计模式。

::: warning TODO
更详细的设计模式文章，待更新至设计模式专栏
:::

## 19、HOC

<details><summary><b>参考答案</b></summary>

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

在我们的应用程序中，我们经常希望在多个组件中使用相同的逻辑。此逻辑可以包括将特定样式应用于组件、要求授权或添加全局状态。

能够在多个组件中重用相同逻辑的一种方法就是使用高阶组件模式。这种模式允许我们在整个应用程序中重用组件逻辑。

具体而言，高阶组件是参数为组件，返回值为新组件的函数。HOC 包含我们想要应用于作为参数传递的组件的某些逻辑。应用该逻辑后，HOC 返回带有附加逻辑的元素。

```js
// HOC模式例子
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

</details>

## 20、Render Props

<details><summary><b>参考答案</b></summary>

> 术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render prop 的组件接受一个返回 React 元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑。

```js
// Render Props模式例子
<DataProvider render={(data) => <h1>Hello {data.target}</h1>} />
```

</details>

## 21、非受控组件

<details><summary><b>参考答案</b></summary>

> 在大多数情况下，推荐使用 受控组件 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。

因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

```js{9,18}
// 非受控组件例子
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

</details>

## ------ 性能优化 ------

## 22、如何发现以及分析性能问题

<details><summary><b>参考答案</b></summary>
肉眼可见的性能问题，如白屏、卡顿、加载时间很长，一般是要答带数据的优化。

1. lightHouse 的评分，可以作为优化依据。

2. React 性能检测的一些工具也可以：Profiler 能测出 reRender 的耗时，平常对数据要求不严也就是不需要准确测出 rerender 的时间的话可以使用 ReactDevtool。

3. 浏览器开发者工具可以检测到大部分的性能数据：

- 网络面板的一些优化方案：

  1. 阻塞或者排队，由于一个域名最多维护 6 个链接，可以做域名分片或者多个域名。
  2. 网络原因可以用 CDN 缓存
  3. 下载时间过长可以压缩或者 webpack 打包优化。

- performance：
  1. FPS （Frames Per Second）每秒传输帧数，发现页面帧速图表出现红色块，代表一帧所需时间过长->卡顿。
  2. CPU 图表显示占得面积太大，可能某个 js 占用太多主线程时间
  3. V8 内存使用凸显一直上升，内存泄漏可能存在

</details>

## 23、怎么做性能优化

<details><summary><b>参考答案</b></summary>

**1、写 React 代码的优化**

减少计算

1. 增加 key
2. commit 阶段减少耗时操作
3. 一些 hook ： useMemo、useCallback、React.Memo 4. setState 将多个合并，或者用 ustable_batchedUpdate 批量更新

精细化渲染

1. 优先用户响应，耗时任务放到下一个宏任务。“关闭弹窗类似的场景”
2. usecontext 跳过中间组件 ，发布订阅模式，redux
3. useMemo 也可以跳过 render

控制范围

1. 防抖节流
2. 懒渲染（"虚拟列表"）、懒加载（webPack）
3. 避免在 didMount 或 didUpdate 中更新 state

**2、webpack 的优化（除去开发环境的优化）**

打包速度

1. onOf、external 可以跳过 loader 的查找，除去一些不打包
2. babel 缓存，可以对运行结果缓存
3. 多进程打包 thread-loader

运行性能

1.  文件资源缓存 hash、chunkhash、contenthash，这几个的区别也要明白
2.  treeShacking
3.  code split
4.  懒加载、预加载（某些浏览器不支持）
5.  离线可访问 pwa （也是一种优化，但用的不多）

**3、网络等优化**

1. CDN 缓存
2. 域名分片
3. 文件压缩
4. DNS 预解析，提前解析之后可能会用到的域名

</details>

## 最后的话

⭐️虽然说现在大环境不好，工作难找但还是衷心希望各位准备面试的小伙伴面试顺利~，收割 offer，我们一起加油吧 🤝！还有就是新年快乐 ❤️ ~

🚀 文章还有不足，如果你有意向，很欢迎你可以加入我们，文章后续会持续更新~