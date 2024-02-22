# 【字节跳动】前端一面面经

::: tip
文章编写于 2020 年 06 月 11 日 —— 当时春招面试字节跳动一面面经。
:::

## 投递初

春招过去了，面了两次腾讯，两次一面直接 gg，但这两份经历对我是有很大帮助的，体会到了一定差距。但在 6 月份，看了牛客网讨论区，又发现了字节跳动一直在招人，从未停止过，而且正好某天瞧见了内推码，于是乎，我又想尝试一下了，赶紧迭代一下简历，投！投！投！

<CloudinaryImg publicId='interview/bytedance-1_d0dz6v' alt='bytedance'/>

### 要求

1、计算机、软件相关专业；
2、熟悉 HTML, CSS, JavaScript 和 HTTP 协议基本知识；
3、熟悉常用的数据结构以及其使用场景；
4、有参与设计和实现的项目（无论大小）；
5、了解浏览器调试工具；
6、有强烈的求知欲和进取心，具有扎实的编程功底，良好的编程习惯。

### 加分项

1、有过数据可视化相关经验；
2、了解 JavaScript 依赖管理；
3、了解 Webpack, React, SASS, ES6 基本原理以及它们解决的问题；
4、了解过不限于 Node.js, Python, Ruby 的任意一门脚本语言；
5、有 Github 账号并有项目。

## 投递完

不得不说，字节的处理效率真的是高，2 号投的，3 号就收到了 HR 小姐姐的电话询问，简单询问做过什么项目，用的是什么技术栈，然后有没有用过 React，最后一句：如果后续简历通过了，我们会联系您进行面试。

然后再 5 号，下午还在做网络安全的实验，就收到微信消息，HR 小姐姐加我然后跟我约下周面试时间。最后，选择了 8 号（周一）晚上 7 点 30 约一面，话不多说，我们进入正题。

## 面经

### 自我介绍

熟悉的开头，这里就不多说了，跳过...

### 地址栏输入 url，然后经历了什么，浏览器此时又经历了什么

### 从 URL 输入到页面展现到底发生什么？

<details><summary><b>参考答案</b></summary>
<a href="https://segmentfault.com/a/1190000017184701">推荐阅读：从 URL 输入到页面展现到底发生什么？</a>

<a href="https://juejin.im/post/5ed0d289e51d45783d0ea4b7">推荐阅读：前端面试：http 专场，你需要懂的知识</a>

<a href="https://juejin.im/post/5e76bd516fb9a07cce750746">推荐阅读：（建议精读）HTTP 灵魂之问，巩固你的 HTTP 知识体系</a>

</details>

#### 浏览器解析渲染页面

<details><summary><b>参考答案</b></summary>
浏览器解析渲染页面分为一下五个步骤：

- 根据 HTML 解析出 DOM 树
- 根据 CSS 解析生成 CSS 规则树
- 结合 DOM 树和 CSS 规则树，生成渲染树
- 根据渲染树计算每一个节点的信息
- 根据计算好的信息绘制页面

<CloudinaryImg publicId='interview/bytedance-2_loollr' alt='bytedance'/>

<a href="https://segmentfault.com/a/1190000017184701">推荐阅读：从 URL 输入到页面展现到底发生什么？</a>

</details>

### 看了我的简历，说使用过 Koa2，提出为什么要使用 Koa2，怎么不用 express 呢？

<a href="https://github.com/Chocolate1999/Vue-family-bucket-SSR-Koa2-full-stack-development-from-Meituan">项目地址（传送门）</a>

### Koa2 中间件你了解过嘛？

### 项目中有提到用户数据&状态，然后问：你登录拦截有具体了解怎么实现的么？

<details><summary><b>参考答案</b></summary>

其实，面试官就是看到了这样一句话：

> 浏览器发送一个 request 请求，根据 cookie ，服务器通过 passport 与 redis 来验证当前是否是登录状态，返回 username。

主要是项目忘了，我就提了一句用了 passport 中的一个函数，isAu...来着的，~~单词不会读~~

</details>

面试官也是觉得可能再问下去没啥必要了，就说，我们来搞点基础吧~

主要是三大模块，CSS，JS，算法

### 考察 CSS

#### css 样式优先级，以及渲染过程

<details><summary><b>参考答案</b></summary>

- 内联样式(例如, style="...")
- ID 选择器(例如, #example)
- 类选择器(例如, .example)、属性选择器(例如, [type="radio"])、伪类(例如, :hover)
- 类型选择器(例如, h1)、伪元素(例如, ::before)
- 继承的样式

<a href="https://juejin.im/post/5c7003e8f265da2d864b3e3c">推荐阅读：CSS 技巧篇(五)：理解 CSS 优先级</a>

</details>

#### 下面样式是怎样渲染的

```javascript
.container .inner div{
 width: 100px;
 height: 100px;
}
```

<details><summary><b>参考答案</b></summary>

我说的是从右到左，这确实是没有问题的，面试官反问，为什么？ 其实道理很简单，如果先渲染 container，怎么找 inner 呢？我说了全部遍历一遍，然后又说了如果是从右到左的话，就会少一些查找。

</details>

#### 下面代码，父级元素 container 高度是多少？

```javascript
<div class="container">
        <div class="inner"/>
        <div class="inner"/>
</div>

.container {
    border: 1px;
}
.inner {
    margin: 10px;
    height=width: 10px;
}
```

<details><summary><b>参考答案</b></summary>

我自己重新写了一个比较好理解的代码，具体如下：

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    .container {
        border: 1px;
    }
    .inner1 {
        margin: 10px;
        height: 10px;
        width: 10px;
        background: red;
    }
    .inner2 {
        margin: 10px;
        height: 10px;
        width: 10px;
        background: blue;
    }
    </style>
</head>
<body>
    <div class="container">
        <div class="inner1"></div>
        <div class="inner2"></div>
    </div>
</body>
</html>
```

查看结果，高度为 50px

<CloudinaryImg publicId='interview/bytedance-3_pbtha9' alt='bytedance'/>

面试官然后又添加了浮动，再问父级元素高度

```javascript
<div class="container">
        <div class="inner"/>
        <div class="inner"/>
</div>

.container {
    border: 1px;
}
.inner {
    float: left;
    margin: 10px;
    height=width: 10px;
}
```

查看结果，高度为 0px，此时就出现了一个高度塌陷问题。

<CloudinaryImg publicId='interview/bytedance-4_v3wwjc' alt='bytedance'/>

因为子元素设置了浮动，导致父级元素高度没有算进去。通过以下方式即可清楚浮动，形成一个 BFC，就会加上子集元素的高度。

```css
.container {
  border: 1px;
  overflow: hidden;
}
```

重新打开开发者工具（F12），可以看到父级元素有了高度。

<CloudinaryImg publicId='interview/bytedance-5_ikkgr1' alt='bytedance'/>

</details>

#### 100px 直径的圆你怎么画？

<details><summary><b>参考答案</b></summary>

<a href="https://juejin.im/post/5d3810fd6fb9a07ed13716d9#heading-6">推荐阅读：趣味 CSS3 效果挑战小汇总</a>

<a href="https://juejin.im/post/5c0f6b9df265da614b11d63c">推荐阅读：css 绘制特殊图形</a>

<a href="https://www.zhangxinxu.com/study/201511/demo-border-radius.html">推荐：CSS3 border-radius 圆角各个属性值作用演示实例页面</a>

</details>

### 考察 JS

#### 下面代码会输出什么？（考察变量提升）

<a href="https://juejin.im/post/5d79b9f351882507ba226047">推荐阅读：JavaScript 变量提升运行机制</a>

##### 第一步

```javascript
console.log(a);
```

此时会报错，因为 a 未定义。

<CloudinaryImg publicId='interview/bytedance-6_lqisot' alt='bytedance-6_lqisot'/>

##### 第二步

```javascript
console.log(a);
var a = 1;
```

会输出 `undefined`。

<CloudinaryImg publicId='interview/bytedance-7_dtm4s6' alt='bytedance-7'/>

上述代码中，变量 `a` 用 `var` 命令声明，会发生变量提升，即脚本开始运行时，变量 `a` 已经存在了，但是没有值，所以会输出 `undefined` 。

##### 第三步

```javascript
console.log(a);
var a = 1;
function a() {}
```

上述代码会输出一个函数 `a`。

<CloudinaryImg publicId='interview/bytedance-8_vtmkp9' alt='bytedance'/>

考察知识点：当有多个同名变量声明的时候，函数声明会覆盖其他的声明。如果有多个函数声明，则是由最后的一个函数声明覆盖之前所有的声明。

##### 第四步

```javascript
console.log(a);
var a = 1;
function a() {}
a = 2;
```

上述代码结果与知识点与 `第三步` 一样

##### 第五步

```javascript
console.log(a);
var a = 1;
function a() {}
a = 2;
a();
```

<a href="https://juejin.im/post/5bd465b4f265da0ac07c9b96">推荐阅读：javascript 变量提升详解</a>
<a href="https://juejin.im/post/5afcf1b96fb9a07abd0ddc43">推荐阅读：深入浅出 JS - 变量提升（函数声明提升）</a>

输出结果：

<CloudinaryImg publicId='interview/bytedance-9_uxoib5' alt='bytedance'/>

上述代码，首先进行函数声明提升，然后再进行变量提升，此时 `a`已经是一个变量了，不再是一个函数了，所以就会 `throw error` 。

#### 下面代码会输出什么？（考察事件循环）

<a href="https://juejin.im/post/5c60e090f265da2dd8687013">推荐阅读：Javascript 事件循环 event loop</a>

##### 第一步

```javascript
setTimeout(() => {
  console.log(1);
}, 0);
console.log(2);
// 输出结果：2 1
```

##### 第二步

```javascript
setTimeout(() => {
  console.log(1);
}, 0);
console.log(2);
new Promise((resolve) => {
  console.log(3);
  resolve(4);
}).then((val) => console.log(val));
// 输出结果：2 3 4 1
```

##### 第三步

```javascript
document.body.addEventListener(
  "click",
  () => {
    Promise.resolve().then(() => console.log(1));
    console.log(2);
  },
  false
);

document.body.addEventListener(
  "click",
  () => {
    Promise.resolve().then(() => console.log(3));
    console.log(4);
  },
  false
);
```

之前那几题答完后，这道题，我毫不犹豫的直接说了 2 4 1 3 ，然后面试官给了我下面这代码提示，啪，直接被拍醒...

```javascript
document.body.click();
```

给出的答案是 `2 1 4 3`

> 以下为新增讨论

---

这个答案其实是不正确的。(以下为不正确的原因，来自遥远的 2024 年补充~)

这个题目，其实考察了浏览器原理和微任务。实际上，如果是直接用鼠标点击 `body`，也就是点击屏幕，控制台会出现这样的结果：

```txt
2 1 4 3
```

但是如果在控制台手动的输入：

```javascript
document.body.click();
```

它却会显示这个结果：

```txt
2 4 1 3
```

所以，答案是后者，即 `2 4 1 3`。造成不一样的原因，其实是手动点击，和手动调用 `click()` 底层执行的原理是不一样的。

当我们使用 `click()` 来触发回调的时候，他将依次的执行如下代码：

```js
const target = document.body
target.dispatchEvent(new Event('click'))
```

值得一提的是，`eventTarget.dispatchEvent()` 是一个 **同步** 的调用，也就是说，它不会造成任何阻塞和异步操作，和普通的 `js` 代码没有区别：它将简单的调用上面两个监听函数并返回，所以代码又变成了这样：

```js
function cb1() {
  Promise.resolve().then(() => console.log(1))
  console.log(2)
}

function cb2() {
  Promise.resolve().then(() => console.log(3))
  console.log(4)
}

cb1()
cb2()
```

这个输出结果就一目了然了，微任务放后面：`2 4 1 3`。

但是在手动的使用鼠标点击屏幕的过程 **并不是** 这样的。

在手动点击屏幕后，浏览器会监听到这个动作，之后它会 **依次将** 触发的那些回调函数压入栈中（也就是新添 js 代码），交给 js 模块执行。这个 **依次** 的动作，就是关键的地方。之前的 `click()`执行，仅仅为栈压了一行 `click`，然后交给 js 模块执行，整个过程同步，衔接起来，没有异议。

而依次的动作，意味着这样一件事：浏览器把第一个回调压进去，这个回调就被立即执行完了——这种情况下，js 代码完全被执行完毕，栈为空，所以根据事件循环，js 引擎就又会去微任务队列中找事干，也就是打印 `2` 后，去打印 `1`。随着微任务队列也执行完，`1` 被打印，第二个回调才被浏览器压入栈中，又有了 js 代码可以执行，所以才紧接着打印出最后的 `4 3`。

参考：

[Is dispatchEvent a sync or an async function](https://stackoverflow.com/questions/15277800/is-dispatchevent-a-sync-or-an-async-function/22924862#22924862)

[Callback function executing in the call stack even when it's not empty](https://stackoverflow.com/questions/70317322/callback-function-executing-in-the-call-stack-even-when-its-not-empty)

---

<br>

后面搜了相关资料，原来是设计模式中的**发布-订阅模式**，之前就看了面经，知道字节喜欢考这个设计模式，原来真的又考到了，不过题型不一样罢了。

<a href="https://juejin.im/post/5a9108b6f265da4e7527b1a4">推荐阅读：Javascript 设计模式之发布-订阅模式</a>

<a href="https://juejin.im/post/5cd7b3ea6fb9a0324a08c933">推荐阅读：前端 JavaScript 的发布-订阅模式</a>

### 算法题

#### 你了解回文字符串吗？例如 abba，写一下代码吧（不限语言）

<details><summary><b>参考答案</b></summary>

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    string str;
    cin>>str;
    int len=str.length();
    int mid=(len+1)/2;
    string ans1=str.substr(0,mid); //取前半段字符串
    if(len&1) mid--;
    string ans2=str.substr(mid,len-mid); //取后半段字符串
    reverse(ans2.begin(),ans2.end()); //取反
    if(ans1==ans2) cout<<1<<endl;
    else cout<<0<<endl;
    return 0;
}
```

由于不限语言，我就用了 `C++` 编写了，当时忘记对第二个字符串取反了，也~~没有验证是否可行，就直接上代码了~~ ...

</details>

#### 那你可以求出字符串中最长回文子串吗？例如给你 abbac，得到 abba

<details><summary><b>参考答案</b></summary>

我当时提到了马拉车算法（`Manacher`），面试官要我手写一下，还是吃了过去的亏啊，打比赛还遇到过，没有怎么使用就忘了，今天又重新温习一下吧...

话不多说，先贴参考博客：

<a href="https://www.jianshu.com/p/392172762e55">推荐阅读：马拉车算法（Manacher's Algorithm）</a>

贴上代码：

```cpp
#include<bits/stdc++.h>
#define endl '\n'
using namespace std;
const int maxn=1e3+5;
int p[maxn];
int main(){
    string str;
    while(cin>>str){
        string s="$";//第一步:预处理，将原字符串转换为新字符串
        for(int i=0;i<str.length();i++)
            s+="#",s+=str[i];
        s+="#@"; //尾部再加上字符@，将偶数长度变为奇数长度
        int n=s.length();
        int id=0,mx=0; //初始化中心位置和最右端位置
        int maxlen=-1,idx=0;
        for(int j=1;j<n-1;j++){
            p[j]=mx>j? min(p[2*id-j],mx-j):1;
            while(s.at(j+p[j]) == s.at(j-p[j])) //向左右两边拓展
                p[j]++;
            if(mx<p[j]+j){ //如果超过右边界，进行更新
                mx=p[j]+j;
                id=j;
            }
            if(maxlen<p[j]-1){ //更新最大长度和中心索引位置
                maxlen=p[j]-1;
                idx=j;
            }
        }
        int start=(idx-maxlen)/2;  //求起始点索引
        string ans=str.substr(start,maxlen); //字符串截取得到最长回文子串
        cout<<ans<<endl;
    }
    return 0;
}
```

用两种数据，进行测试，得到如下结果：

<CloudinaryImg publicId='interview/bytedance-10_dwaxjr' alt='bytedance-10'/>

</details>

## 总结

每次面完之后，都要好好总结一下。当我写完这篇文章之后，我发现本次面试难度算很低了，没有考察要你手撕各种设计模式，还有手撕 `Promise`、手撕 `new`等等。这些我在面试前还做了准备，但是我发现我又遗忘了...原因很简单，只是第一次接触那些手撕，用的也不是很多，还有更多的知识也是在面试前抢记的。看的特别广而杂，反而知识没有连通性，记着记着自然遗忘了。

其次，对于字节跳动，经历过这一次面试后，我也逐渐发现面试都差不多，面试官都挺好的，期间还会暗示你（当然你懂他意思的话...），面之前，一看是头条我一下觉得没啥自信了，都说头条很在意算法，但本次考察的算法好像没有 `acm` 那样的难度，而是自己把自己给吓住了，信心自然没了...

过了好几天了，也没有收到感谢信，当然，也没有收到下次面试通知，估计是 "入库" 了吧，在此，写下今后的安排：

- 无需惧怕算法题，难度真的没有 `acm` 那个高度
- 将知识重新捡起来，不要在要面试的时候，才临时抢记知识
- 安静地努力，每篇文章写完后就要消化，不要没弄懂就发布
- 文章不在于多，而在于精，将每篇文章都要认真书写，让读者都能一读即懂

发现每次只有把知识点讲出来才会印象深刻，今后的日子也要这样做！

最后，本次面经书写完毕，算是一次不错的体验了，还要继续加油~

```javascript
学如逆水行舟，不进则退
```
