# 【字节跳动】前端面试准备（一）

::: tip
文章编写于 2020 年 06 月 10 日 —— 因为当时接到了一面邀请，紧急之下参考了一些面经，自己整理了一些问题。
:::


## 拓展

### 什么是原生开发？什么是混合开发？两者有什么区别？
**原生开发(NativeApp开发)**：像盖房子一样，先打地基然后浇地梁、房屋结构、一砖一瓦、钢筋水泥、电路走向等，原生APP同理：通过代码从每个页面、每个功能、每个效果、每个逻辑、每个步骤全部用代码写出来，一层层，一段段全用代码写出来

此种APP的**数据都保存在本地**，APP能及时调取，所以相应速度及流畅性有保障

**混合开发(HTML5开发)**：这个就相当于一种框架开发，说白了就是网页;该模式通常由“HTML5云网站+APP应用客户端”两部份构成，APP应用客户端只需安装应用的框架部份，而应用的数据则是每次打开APP的时候，去云端取数据呈现给手机用户。

　　混合APP还有一种是套壳APP，套壳APP就是用H5的网页打包成APP，虽然是APP能安装到手机上，但是每个界面，全部是网页

　　此种APP数据都保存在云端，用户每次访问都需要从云端调取全部内容，这样就容易导致反应慢，每打开一个网页或点一个按钮都需要等半天。

### 什么是小程序？
小程序是一个不需要下载安装就可使用的应用，它实现了应用触手可及的梦想，用户扫一扫或者搜一下即可打开应用。也体现了用完即走的理念，用户不用关心是否安装太多应用的问题。应用将无处不在，随时可用，但又无需安装卸载。

简单来说，小程序不用安装就能使用；它的体积也非常小，每一个都不超过 1 M。
小程序的来到，将给我们带来许多便利和好处：

- 少了安装 App 的麻烦
- 释放手机内存
- 让手机桌面更简洁
- 对于开发者来说，相比 HTML 5，小程序可以节省大量的服务器资源。
- 小程序和 HTML 5 本质上是两种不同的东西：小程序是**计算机程序**，而HTML 5 则是互联网网页。

### 假设存在一个长度为1000（非常大）的数据列表，在v-for中渲染必然造成卡顿，如何优化

在后端优化，分页请求

## 路由

### vue-router实现原理;hash跟histroy具体指什么
Vue中会使用官方提供的vue-router插件来使用单页面，原理就是通过检测地址栏变化后将对应的路由组件进行切换（卸载和安装）。

### 路由模式
hash和history这两个方法应用于浏览器的历史记录站，在当前已有的back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的URL，但你浏览器不会立即向后端发送请求。

**hash：即地址栏URL中的#符号（此hsah 不是密码学里的散列运算）**

路由有两种模式：hash、history，默认会使用hash模式

比如这个URL：`www.baidu.com/#/hello`, hash 的值为`#/hello`。它的特点在于：hash 虽然出现URL中，但不会被包含在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。

history：利用了`HTML5 History Interface` 中新增的 **pushState() 和replaceState()** 方法。（需要特定浏览器支持）

>history模式，会出现404 的情况，需要后台配置。

history模式下，前端的url必须和实际向后端发起请求的url 一致，因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `www.baidu.com/home/detail… ` 404错误，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

**hash哈希路由的原理**

```javascript
window.onload = function(){
    //当hash发生变化的时候， 会产生一个事件 onhashchange
    window.onhashchange = function(){
        console.log( '你的hash改变了' );
        //location对象是 javascript内置的(自带的)
        console.log( location );
    }
}
```

上例，我们已经通过hash( 就是锚文本 ) 变化， 触发了onhashchange事件， 就可以把hash变化与内容切换对应起来，就实现了单页路由的应用！

监控hash值变化，hash一旦变化，页面内容变化，实现无刷新切换。


### 路由的懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。

懒加载也叫延迟加载，即在需要的时候进行加载，随用随载。在单页应用中，如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，延时过长，会出现长时间的白屏，即使做了loading也是不利于用户体验，而运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。简单的说就是：进入首页时不用一次加载过多资源，造成页面加载用时过长。

**懒加载写法：**

```javascript
    // 路由的懒加载方式
    { path :"/home",component:()=>import("../views/Home")},// 当我访问/home首页时，页面才去加载Home组件，减少首页加载的时长
    { path :"/list",component:()=>import("../views/List")},
    { path :"/mine",component:()=>import("../views/Mine")}
```
非按需加载则会把所有的路由组件块的js包打在一起。当业务包很大的时候建议用路由的按需加载（懒加载）。 按需加载会在页面第一次请求的时候，把相关路由组件块的js添加上。

## Vuex

### 介绍一下vuex以及使用场景；更改state的方法

### 什么是Vuex？

vuex是一个专门为vue构建的状态集管理工具，vue和react都是基于组件化开发的，项目中包含很多的组件，组件都会有组件嵌套，想让组件中的数据被其他组件也可以访问到就需要使用到Vuex。

### Vuex主要解决了什么问题？

Vuex主要是为了解决多组件之间状态共享问题，它强调的是集中式管理（组件与组件之间的关系变成了组件与仓库之间的关系）把数据都放在一个仓库中管理，使用数据的时候直接从仓库中获取，如果仓库中一个数据改变了， 那么所有使用这个数据的组件都会更新。Vuex把组件与组件之间的关系解耦成组件与仓库之间的关系，方便数据维护。

### Vuex的流程？Vuex的核心？

![](https://img-blog.csdnimg.cn/20200606235904478.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
（1）将需要共享的状态挂载到state上：this.$store.state来调用

创建store，将状态挂载到state上，在根实例里面配置store，之后我们在组件中就可以通过 this.$store.state 来使用 state 中管理的数据，但是这样使用时，当state的数据更改的时候，vue组件并不会重新渲染，所以我们要通过计算属性computed来使用，但是当我们使用多个数据的时候这种写法比较麻烦，vuex提供了**mapState辅助函数**，帮助我们在组件中获取并使用vuex的store中保存的状态。


（2）我们通过 `getters` 来创建状态：通过`this.$store.getters`来调用

可以根据某一个状态派生出一个新状态，vuex也提供了 **mapGetters辅助函数** 来帮助我们在组件中使用getters里的状态。

（3）使用 `mutations` 来更改state：通过 `this.$store.commit` 来调用

我们不能直接在组件中更改state，而是需要使用 **mutations** 来更改，mutations也是一个纯对象，里面包含很多更改state的方法，这些方法的形参接收到state，在函数体里更改，这时，组件用到的数据也会更改，实现响应式。vuex提供了**mapMutations方法**来帮助我们在组件中调用mutations 的方法。

（4）使用 `actions` 来处理异步操作：this.$store.dispatch来调用

Actions类似于mutations，不同在于：Actions提交的是mutations，而不是直接变更状态。Actions可以包含任意异步操作。也就是说，如果有这样的需求：在一个异步操作处理之后，更改状态，我们在组件中应该先调用actions，来进行异步动作，然后由actions调用mutations来更改数据。在组件中通过this.$store.dispatch方法调用actions的方法，当然也可以使用mapMutations来辅助使用。


**简便版流程：**

```javascript
组件使用数据且通过异步动作更改数据的一系列事情：

1.生成store,设置state
2.在根实例中注入store
3.组件通过计算属性或者mapState来使用状态
4.用户产生操作，调用actions的方法，然后进行异步动作
5.异步动作之后，通过commit调用mutations的方法
6.mutations方法被调用后，更改state
7.state中的数据更新之后，计算属性重新执行来更改在页面中使用的状态
8.组件状态被更改，创建新的虚拟dom
9.组件的模板更新之后重新渲染在dom中
```

### 项目中使用到vuex的一些场景？
（1）购物车数据共享 
（2）用户登录 
（3）打开窗口，出现一个表单数据，然后关闭窗口，再次打开还想出现，就使用vuex

### Vuex的项目结构

```javascript
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```
### vuex与local storage有什么区别

- 区别：vuex存储在内存，localstorage（本地存储）则以文件的方式存储在本地，永久保存；sessionstorage( 会话存储 ) ，临时保存。localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理。
- 应用场景：vuex用于组件之间的传值，localstorage，sessionstorage则主要用于不同页面之间的传值。
- 永久性：当刷新页面（这里的刷新页面指的是 --> F5刷新,属于清除内存了）时vuex存储的值会丢失，sessionstorage页面关闭后就清除掉了，localstorage不会。

注：觉得用localstorage可以代替vuex,  对于不变的数据确实可以，但是当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage，sessionstorage无法做到，原因就是区别1。

### vue组件之间的通信
在vue中。组件间进行数据传递、通信很频繁，而父子组件和非父子组件的通信功能也比较完善，但是，唯一困难的就是多组件间的数据共享，这个问题由vuex来处理

<a href="https://juejin.im/post/5deac42d518825124a05ae98#heading-13">推荐阅读：VUE组件通信的十种姿势</a>

## 存储
### storge介绍一下，有什么区别？和cookie的区别是什么？cookie的字段介绍一下；

```javascript
cookie  4kb 随http请求发送到服务端 后端可以帮助前端设置cookie 
session 放在服务端  一般存放用户比较重要的信息
        （token 令牌  token ==> cookie /localstorage）  vuex

localStorage 本地存储（h5的新特性 draggable canvas svg）
             5M     纯粹在本地客户端  多个标签页共享数据
             sessionStorage  会话级别的存储
             往本地页面中存值的方法（localStorage.setItem(key,value))
```
### 讲一下cookie、sessionstorage、localstorage
相同点：都存储在客户端

不同点：

1.存储大小

- cookie数据大小不能超过4k。
- sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。


2.有效时间

- localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
- sessionStorage 数据在当前浏览器窗口关闭后自动删除。
- cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

3.数据与服务器之间的交互方式

- cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端
- sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。


### 定义一个对象，里面包含用户名、电话，然后将其存入localStorage的代码

```javascript
var json = {username:"张三",phone:17650246248}
for(var key in json){
    localStorage.setItem(key,json[key]);
}
```
<a href="https://hanxueqing.github.io/Web-Front-end-Interview-Q-A/#/?id=cookie%e5%92%8csession%e7%9a%84%e5%8c%ba%e5%88%ab">推荐阅读：cookie和session的区别</a>

### 介绍一下同源策略

所谓同源是指：域名、协议、端口相同。

下表是相对于 `http://www.laixiangran.cn/home/index.html `的同源检测结果：

![](https://img-blog.csdnimg.cn/2020060708574199.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
另外，同源策略又分为以下两种：

- DOM 同源策略：禁止对不同源页面 DOM 进行操作。这里主要场景是 iframe 跨域的情况，不同域名的 iframe 是限制互相访问的。
- XMLHttpRequest 同源策略：禁止使用 XHR 对象向不同源的服务器地址发起 HTTP 请求。

<a href="https://juejin.im/post/5ba1d4fe6fb9a05ce873d4ad">推荐阅读：浏览器同源策略及跨域的解决方法</a>

## 网络
### TCP和UDP区别，UDP怎么保证传输可靠

**TCP与UDP区别总结**：

1、TCP面向连接（如打电话要先拨号建立连接）;UDP是无连接的，即发送数据之前不需要建立连接

2、TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付
3、TCP面向字节流，实际上是TCP把数据看成一连串无结构的字节流;UDP是面向报文的
UDP没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如IP电话，实时视频会议等）
4、每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信
5、TCP首部开销20字节;UDP的首部开销小，只有8个字节
6、TCP的逻辑通信信道是全双工的可靠信道，UDP则是不可靠信道

**UDP如何实现可靠传输**

由于在传输层UDP已经是不可靠的连接，那就要在应用层自己实现一些保障可靠传输的机制

简单来讲，要使用UDP来构建可靠的面向连接的数据传输，就要实现类似于TCP协议的

- 超时重传（定时器）
- 有序接受 （添加包序号）
- 应答确认 （Seq/Ack应答机制）
- 滑动窗口流量控制等机制 （滑动窗口协议）

等于说要在传输层的上一层（或者直接在应用层）实现TCP协议的可靠数据传输机制，比如使用UDP数据包+序列号，UDP数据包+时间戳等方法。

目前已经有一些实现UDP可靠传输的机制，比如

**UDT（UDP-based Data Transfer Protocol）**

基于UDP的数据传输协议（UDP-based Data Transfer Protocol，简称UDT）是一种互联网数据传输协议。UDT的主要目的是支持高速广域网上的海量数据传输，而互联网上的标准数据传输协议TCP在高带宽长距离网络上性能很差。 顾名思义，UDT建于UDP之上，并**引入新的拥塞控制和数据可靠性控制机制**。UDT是**面向连接的双向的应用层协议**。它同时**支持可靠的数据流传输和部分可靠的数据报传输**。 由于UDT完全在UDP上实现，它也可以应用在除了高速数据传输之外的其它应用领域，例如点到点技术（P2P），防火墙穿透，多媒体数据传输等等。

### 用户登陆后如何记住用户的登录状态
<a href="https://segmentfault.com/a/1190000019065025">推荐阅读：Cookie、Session是如何保持登录状态的？</a>

### cookie字段说明
- name字段为一个cookie的名称。

- value字段为一个cookie的值。

- domain字段为可以访问此cookie的域名。
非顶级域名，如二级域名或者三级域名，设置的cookie的domain只能为顶级域名或者二级域名或者三级域名本身，不能设置其他二级域名的cookie，否则cookie无法生成。
顶级域名只能设置domain为顶级域名，不能设置为二级域名或者三级域名，否则cookie无法生成。
二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。所以要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。
顶级域名只能获取到domain设置为顶级域名的cookie，其他domain设置为二级域名的无法获取。

- path字段为可以访问此cookie的页面路径。 比如domain是abc.com,path是/test，那么只有/test路径下的页面可以读取此cookie。

- expires/Max-Age 字段为此cookie超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。

- Size字段 此cookie大小。

- http字段 cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。

- secure 字段 设置是否只能通过https来传递此条cookie

### 浏览器怎么识别cookie是否过期？不同网站如何获取不同的cookie

<a href="https://juejin.im/entry/5a29fffa51882531ba10da1c">推荐阅读：这一次带你彻底了解Cookie</a>

<a href="https://zhuanlan.zhihu.com/p/42370557">推荐阅读：计算机网络|Cookie全方面总结</a>

<a href="https://zhuanlan.zhihu.com/p/79819678">推荐阅读：一文带你超详细了解Cookie</a>

### CSRF攻击知道吗？原理是什么？在后端如何防范？
<a href="https://www.jianshu.com/p/b99dc31f1e9f">推荐阅读：CSRF 攻击是什么？如何防范?</a>

<a href="https://juejin.im/post/5bc009996fb9a05d0a055192">推荐阅读：前端安全系列之二：如何防止CSRF攻击？</a>

**后端如何防范：**

**同源检测**

既然CSRF大多来自第三方网站，那么我们就直接禁止外域（或者不受信任的域名）对我们发起请求。

在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：
- Origin Header
- Referer Header

这两个Header在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。 服务器可以通过解析这两个Header中的域名，确定请求的来源域。


### 网络分层模型，协议，TCP与UDP，TCP三次握手，四次挥手
<a href="https://juejin.im/post/5c8d1d7951882501c817b2b6">推荐阅读：不要再让TCP协议及三次握手、四次挥手掉分了</a>

<a href="https://juejin.im/post/5eabcfde5188256d72314515#heading-58">推荐阅读：TCP三次握手，两次行不行，四次行不行，四次挥手？</a>

### https，对称加密，非对称加密，怎么检测公钥

<a href="https://juejin.im/post/5e6c4458518825491b11e082">推荐阅读：看完这篇 HTTPS，和面试官扯皮就没问题了</a>










## 浏览器
### 浏览器缓存
<a href="https://juejin.im/entry/5ad86c16f265da505a77dca4">推荐阅读：彻底理解浏览器的缓存机制</a>



## Promise 
### Promises/A+ 规范
<a href="https://juejin.im/post/5c4b0423e51d4525211c0fbc">推荐阅读：【译】 Promises/A+ 规范</a>

<a href="https://juejin.im/post/5d37abf7e51d45108223fd49">推荐阅读：如何优雅地处理 Async / Await 的异常？</a>


## JSON
### JSON数据格式介绍一下，JS转JSON时要注意什么？对象转为JSON什么情况下JSON.stringfy会报错？

<a href="https://juejin.im/post/5be5b9f8518825512f58ba0e">推荐阅读：有意思的JSON.parse（）、JSON.stringify（）
</a>

<a href="https://blog.csdn.net/u011277123/article/details/53055479">推荐阅读：使用JSON.parse()转化成json对象需要注意的地方</a>

简单说一下JSON格式,JSON格式就是一种表示一系列的“值”的方法，这些值包含在数组或对象之中，是它们的成员。
对于这一系列的“值”，有如下几点格式规定：

- 数组或对象的每个成员的值，可以是简单值，也可以是复合值。
- 简单值分为四种：字符串、数值（必须以十进制表示）、布尔值和`null（NaN, Infinity, -Infinity和undefined都会被转为null）`。
- 复合值分为两种：符合`JSON`格式的对象和符合`JSON`格式的数组。
- 数组或对象最后一个成员的后面，不能加逗号。
- 数组或对象之中的字符串必须使用双引号，不能使用单引号。
- 对象的成员名称必须使用双引号。

以下是合格的`JSON`值:

```javascript
["one", "two", "three"]

{ "one": 1, "two": 2, "three": 3 }

{"names": ["张三", "李四"] }

[ { "name": "张三"}, {"name": "李四"} ]
```

**注意**⚠️：

>空数组和空对象都是合格的JSON值，null本身也是一个合格的JSON值。


如下定义(原文中的例子)是无法通过编译的：
```javascript
let foo = { b: foo };
```
错误信息：
```javascript
ReferenceError: foo is not defined
    at repl:1:14
```

例子：
![](https://img-blog.csdnimg.cn/20200607092956548.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
### 为什么有些属性无法被 stringify 呢？
因为 JSON 是一个通用的文本格式，和语言无关。设想如果将函数定义也 stringify 的话，如何判断是哪种语言，并且通过合适的方式将其呈现出来将会变得特别复杂。特别是和语言相关的一些特性，比如 JavaScript 中的 Symbol。

ECMASCript 官方也特意强调了这一点：

>It does not attempt to impose ECMAScript’s internal data representations on other programming languages. Instead, it shares a small subset of ECMAScript’s textual representations with all other programming languages.


## CSS
### CSS的尺寸单位，分别介绍一下；移动端适配可以用哪些单位？
<a href="https://zhuanlan.zhihu.com/p/47693900">推荐阅读：对于前端页面适配，你应该使用px还是rem</a>

css中的单位很多，%、px、em、rem，以及比较新的vw、vh等。每个单位都有特定的用途，比如当需要设置一个矩形的宽高比为16:9，并且随屏幕宽度自适应时，除了用%，其他单位是很难做到的。所以不存在说某个单位是错误的，某个单位是最好的这种说法。

页面适配的方式有很多：

- 使用px，结合Media Query进行阶梯式的适配；
- 使用%，按百分比自适应布局；
- 使用rem，结合html元素的font-size来根据屏幕宽度适配；
- 使用vw、vh，直接根据视口宽高适配。

**经验之道**：

在视觉稿要求固定尺寸的元素上使用px。比如1px线，4px的圆角边框。
在字号、（大多数）间距上使用rem。
慎用em（em会**叠加计算**。在这个机制下太容易犯错了，因为你不知道这段css指定的字号具体是多少。）

## DOM
### dom事件流，事件监听在什么阶段触发？dom上直接设置onclick跟addeventlistener的区别
`addEventListener` 默认 `false` 冒泡

<a href="https://segmentfault.com/a/1190000018454775">推荐阅读：Dom 事件详解</a>

<a href="https://juejin.im/post/5c71e80d51882562547bb0ce">推荐阅读：深入理解DOM事件机制</a>

<a href="https://juejin.im/post/5d25c4cbe51d454f71439d6f">推荐阅读：一篇文章能否解决你事件监听的许多疑问</a>


## 编程题

### EventEmitter的实现
EventEmitter的实现。要求：两个方法on(eventname,callback),trigger(eventname,params)，on绑定可以给eventname绑定多个callback，trigger触发eventname的callback，params是参数。另外口述了如何实现once功能（callback只允许调用一次）

```javascript
function EventEmitter(){
    this.eventList = {}
}
EventEmitter.prototype.on = function(eventname, callback){
    if(!this.eventList[eventname]) {
       this.eventList[eventname] = [callback]
    }
    this.eventList[eventname].push(callback)
}
EventEmitter.prototype.trigger = function(eventname, params){
    if(this.eventList[eventname]){
        for(let i = 0; i < this.eventList[eventname].length; i++) {
            this.eventList[eventname][i](params)
        }
    }
}
```

## Vue
### Vue生命周期
<a href="https://hanxueqing.github.io/Web-Front-end-Interview-Q-A/#/?id=%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f">推荐阅读：生命周期</a>


### Vue中的computed和watch的区别

<a href="https://juejin.im/post/5c9990d6f265da60ea146d21">推荐阅读：面试题： Vue中的 computed 和 watch的区别</a>





## WebPack
### webpack实现代码拆分的方式有哪些
webpack通过下面三种方式来达到以上目的

- Entry Points: 多入口分开打包
- Prevent Duplication:去重，抽离公共模块和第三方库（通过CommonsChunkPlugin插件）
- Dynamic Imports:动态加载（ECMAScript中出于提案状态的import()）

<a href="https://juejin.im/post/5a6d7eeef265da3e4d72f1f9">推荐阅读：webpack之代码拆分</a>














## 移动端
### 移动端适配，rem原理
<a href="https://juejin.im/post/5da82357518825486c66f5e1">推荐阅读：移动端rem、vw等手机适配原理详解</a>

什么是rem？
REM是相对单位，是相对HTML根元素，rem就是根元素html的字体大小，其他元素调用rem，能统一根据这个适配比例进行调整。

## 设计模式
### 手撕发布订阅模式 EventEmitter

```javascript
// 发布订阅模式
class EventEmitter {
  constructor() {
    // 事件对象，存放订阅的名字和事件  如:  { click: [ handle1, handle2 ]  }
    this.events = {}
  }
  // 订阅事件的方法
  on(eventName, callback) {
    if (!this.events[eventName]) {
      // 一个名字可以订阅多个事件函数
      this.events[eventName] = [callback]
    } else {
      // 存在则push到指定数组的尾部保存
      this.events[eventName].push(callback)
    }
  }
  // 触发事件的方法
  emit(eventName, ...rest) {
    // 遍历执行所有订阅的事件
    this.events[eventName] &&
      this.events[eventName].forEach(f => f.apply(this, rest))
  }
  // 移除订阅事件
  remove(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(f => f != callback)
    }
  }
  // 只执行一次订阅的事件，然后移除
  once(eventName, callback) {
    // 绑定的时fn, 执行的时候会触发fn函数
    const fn = () => {
      callback() // fn函数中调用原有的callback
      this.remove(eventName, fn) // 删除fn, 再次执行的时候之后执行一次
    }
    this.on(eventName, fn)
  }
}~~删除线格式~~ 
```
## 介绍项目及难题
<a href="https://juejin.im/post/5a5d926cf265da3e3f4cb030">推荐阅读：Nuxt.js实战</a>

###  Nuxt.js

Nuxt.js 是一个基于 Vue.js 的通用应用框架，它预设了利用 Vue.js 开发 **服务端渲染（SSR, Server Side Render）** 的应用所需要的各种配置，同时也可以一键生成静态站点。

作为框架，Nuxt.js 为 客户端/服务端 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。区别于其他 vue SSR 框架，Nuxt.js 有以下比较明显的特性。

- 自动代码分层
- 强大的路由功能，支持异步数据（路由无需额外配置）
- HTML头部标签管理（依赖 vue-meta 实现）
- 内置 webpack 配置，无需额外配置


### Express VS Koa
<a href="https://juejin.im/entry/58a11f61128fe1005823a257">推荐阅读：Node.js 框架对比之 Express VS Koa（2017）</a>

### 服务端渲染 SSR
<a href="https://juejin.im/post/5c068fd8f265da61524d2abc">推荐阅读：服务端渲染（SSR)</a>





## JS
### script中defer和async的区别

<a href="https://juejin.im/post/5a1229596fb9a0451704cae8">推荐阅读：script中defer和async的区别</a>

- 对于defer，我们可以认为是将外链的js放在了页面底部。js的加载不会阻塞页面的渲染和资源的加载。不过defer会按照原本的js的顺序执行，所以如果前后有依赖关系的js可以放心使用。

- 对于async，这个是html5中新增的属性，它的作用是能够异步的加载和执行脚本，不因为加载脚本而阻塞页面的加载。一旦加载到就会立刻执行在有async的情况下，js一旦下载好了就会执行，所以很有可能不是按照原本的顺序来执行的。如果js前后有依赖性，用async，就很有可能出错。

简单的来说，使用这两个属性会有三种可能的情况

- 如果async为true，那么脚本在下载完成后异步执行。
- 如果async为false，defer为true，那么脚本会在页面解析完毕之后执行。
- 如果async和defer都为false，那么脚本会在页面解析中，停止页面解析，立刻下载并且执行。

最后给一点个人的建议，无论使用defer还是async属性，都需要首先将页面中的js文件进行整理，哪些文件之间有依赖性，哪些文件可以延迟加载等等，做好js代码的合并和拆分，然后再根据页面需要使用这两个属性。







