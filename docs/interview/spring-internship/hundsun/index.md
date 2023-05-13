# 【恒生电子】2021 实习（前端） 笔试&面试分享

::: tip
文章编写于 2020 年 06 月 21 日 —— 当初第一家实习的公司，整个面试下来的感受都在这里。
:::

## 投递初

还是源自于学校里发了一个恒生招聘的 pdf 文件，首先看文件，就明确了会招前端，为什么说是会招呢？请看下图吧。

![](https://img-blog.csdnimg.cn/20200621212312692.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)

本次预计就招 380 人，而对于前端来说，只招 20 个，你没看错，就 20 名，这比例我刚开始看的时候就感觉有点离谱。可想这次招聘的难度了...

## 投递后

我不知道简历会不会刷人，你简历通过了的话，会发一个邮件邀请你加入恒生招聘群聊，我起初那时候加入的时候才 400 左右的人数，到今天 6 月 21 日晚早已经达到了群的容量 2000 人了，虽然期间有小部分退群的。但基本上这次招聘的话投递恒生的都是 1000 人以上了，而这 1000 多人中，我想搞 `Java` 的应该挺多的，毕竟招的人最多。不管怎样，这个群里投前端的也得有好几百人吧，还包括一些硕士研究生，而我得从这好几百人里面挤进前 20。但我依旧还是觉得有希望的，相信自己！

> 我想既然投的也这么多，而看群里的话，应该很少有人会因为简历被刷掉。那么，这次笔试的话，就会刷掉很多人了，因为恒生这次就一次技术面，而且招聘会上也是说了会在端午节之前（22、23、24 号三天）面完所有人，然后就是发放 Offer 了，可想这次笔试是多么重要了！

## 笔试过程

> 6 月 19 日收到了来自恒生的笔试邀请，也是确定自己会参与笔试了，然后在下午 6 点开始笔试，两小时时间。

### 题目类型

本次考察了单选题、不定项选择题（可能多选或单选）、问答题、编程题、算法题、逻辑测试题。

> 我就记录了一些比较重要有价值的题，其它可能比较基础，就没记录了。

### 单选题

#### 代码题

下述代码会输出什么？

```javascript
[
  [1, 0],
  [1, 1],
].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [0, 1]
);
```

<details><summary><b>参考答案</b></summary>

```javascript
var res = [
  [1, 0],
  [1, 1],
].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [0, 1]
);
console.log(res);
```

![](https://img-blog.csdnimg.cn/20200621221613192.png)

</details>

#### 理论题

插入排序的定义？

<details><summary><b>参考答案</b></summary>

直接插入排序（Straight Insertion Sort）是一种最简单的排序方法，其基本操作是将一条记录插入到已排好的有序表中，从而得到一个新的、记录数量增 1 的有序表

</details>

#### 理论题

进程间的通信方式

<details><summary><b>参考答案</b></summary>

进程（Linux）间的通信方式有：

- 管道
- 消息队列
- 共享内存
- 信号量
- Socket

<a href="https://juejin.im/post/5d515c7551882511ed7c273c">参考：happyjava—进程间通信方式总结</a>

</details>

#### 判断题

移动端要想动画性能流畅，应该使用 3D 硬件加速，因此最好给页面中的元素尽量添加 `translate3d` 或者 `translateZ(0)` 来触发 3D 硬件加速。

<details><summary><b>参考答案</b></summary>

**错误**。

> 滥用硬件加速会导致严重性能问题，因为它增加了内存使用，并且它会导致移动端电池寿命减少。

- A: 浏览器渲染页面时会根据 DOM 通过不同的图层来叠加呈现出页面,对于某些属性如 3D 属性、硬件加速的 `<video>` 等都会创建新图层
- B: 盒子属性、内部结构属性、定位属性、浮动等.这些可能修改节点的大小和位置,都会触发重布局
- C: `translate3d` 会添加新图层,过多的图层会使浏览器崩溃
- D: 层的重绘和重排是浏览器性能问题的很大影响因素

<a href="https://www.nowcoder.com/questionTerminal/0260851028b740a1a58370495fe1077d">参考：牛客网试题广场某单选题</a>

</details>

#### 代码题

下面代码会输出什么？

```javascript
class Counter {
  #number = 10;
  increment() {
    this.#number++;
  }
  getNum() {
    return this.#number;
  }
}
const counter = new Counter();
counter.increment();
console.log(counter.#number);
```

<details><summary><b>参考答案</b></summary>

`SyntaxError`

在 ES2020 中，通过 `#` 我们可以给 `class` 添加私有变量。在 `class` 的外部我们无法获取该值。当我们尝试输出 `counter.#number`，语法错误被抛出：我们无法在 `class Counter` 外部获取它!

</details>

#### 判断题

`localStroage` API 不支持设置过期时间

<details><summary><b>参考答案</b></summary>

很遗憾，`localstorage` 原生是不支持设置过期时间的，想要设置的话，就只能自己来封装一层逻辑来实现

<a href="https://blog.csdn.net/zhaoxiang66/article/details/86703438">参考：三哥玩前端——localStorage 设置过期时间</a>

<a href="https://juejin.im/post/5a9fcc5e51882555602074e3">参考：array_huang——localstorage 必知必会</a>

</details>

#### 理论题

进程和线程的区别

<details><summary><b>参考答案</b></summary>

- 进程是运行中的程序，线程是进程的内部的一个执行序列
- 进程是资源分配的单元，线程是执行单元
- 进程间切换代价大，线程间切换代价小
- 进程拥有资源多，线程拥有资源少
- 多个线程共享进程的资源

<a href="https://www.nowcoder.com/questionTerminal/234895a70e0b40e19db7f3fbaabc5fa3">参考：牛客网试题广场某问答题</a>

<a href="https://blog.csdn.net/mxsgoden/article/details/8821936">参考：森森向上——腾讯面试题 04.进程和线程的区别？</a>

</details>

### 问答题

#### 原型与原型链的考察

问如下代码输出结果？

```javascript
function foo(name) {
  this.name = name;
}
let c = new foo("chocolate");
console.log(c.__proto__);
console.log(foo.__proto__);
```

<details><summary><b>参考答案</b></summary>
![](https://img-blog.csdnimg.cn/20200621223730237.png)
</details>

#### 从 url 输入到页面渲染经历了什么？

> 最近一直在记的知识点，直接上手 700 字左右。

### 编程题

> 这道题是最后做的，没有写出来，但写了解题思路，求解了大概 30%样例吧，不知道影响大不大...这道题以前是做过的，奈何最近全都是记知识点了。

n 代表括号的对数，生成所有可能并且有效的括号组合

<details><summary><b>参考答案</b></summary>

![](https://img-blog.csdnimg.cn/20200622204304634.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)

画图以后，可以分析出的结论：

- 当前左右括号都有大于 0 个可以使用的时候，才产生分支；

- 产生左分支的时候，只看当前是否还有左括号可以使用；

- 产生右分支的时候，还受到左分支的限制，**右边剩余可以使用的括号数量一定得在严格大于左边剩余的数量**的时候，才可以产生分支；

- 在左边和右边剩余的括号数都等于 0 的时候结算。

**C++代码：**

```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        if(n==0) return res; //特判
        dfs("",n,n,res); // 执行深度优先遍历，搜索可能的结果
        return res;
    }
    void dfs(string str,int left,int right,vector<string>& res){
    	// 因为每一次尝试，都使用新的字符串变量，所以无需回溯
        // 在递归终止的时候，直接把它添加到结果集即可
        if(left==0&&right==0) res.push_back(str);
        // 剪枝（如图，左括号可以使用的个数严格大于右括号
        //可以使用的个数，才剪枝，注意这个细节）
        if(left>right) return;
        if(left>0)
            dfs(str+"(",left-1,right,res);
        if(right>0)
            dfs(str+")",left,right-1,res);
    }
};
```

<a href="https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/">参考：leetcode 大佬题解</a>

</details>

### 算法题

> 怎么说呢，正常的前端算法题吧...

1、使用 `javascript` 实现冒泡排序

2、分析冒泡排序的时间复杂度、空间复杂度、稳定性

### 逻辑测试题

> 此类就是一些测评，比如说给你一组图片，然后让你找出最合适的，符合题目规律；还有就是一些计算题，比较简单，例如一些解二元一次方程，等比数列求和等。其次，还有就是给你一段话，进行简单分析，选择最符合逻辑的一句话。

## 后续

整场下来，答的不是特别顺畅，有些题目还是第一次遇到，比如移动端想要动画性能流畅，应该使用 3D 硬件加速；进程和线程区别。另外，就是不定项选择题，不确定自己的选的对不对，希望如下图牛牛所述，**蒙的全对！**
![](https://img-blog.csdnimg.cn/20200621222949873.png)

## 总结

这次恒生招聘，对于我前端来说的话，还是有一定挑战的，我的编程题和部分选择题答的不是很好。然后明天或后天应该就会有笔试结果了（应该会刷掉很多人样子...）如果有后续面试邀请的话，再来进行补充了，熟悉的结尾：

> 学如逆水行舟，不进则退

![](https://img-blog.csdnimg.cn/20200621224006274.png)

## 收获实习 offer

2020 年 6 月 29 日下午，原本还在学校机房做着数字图像处理的实验，然后电脑右下角突然弹窗，显示 **实习录用** 几个字，我一下就激动起来了，它来了！它来了！它来了！
![](https://img-blog.csdnimg.cn/20200629171540597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
原本这个 offer 应该会早一点下来的，正好卡在了端午节前面试，然后就等到了端午节和周末假期过后，也就是周一下午，我这个部门才正式下发 offer。下面就来分享一下我面试恒生电子的过程与一些心得吧：

### 笔试过后

笔试相关题目我都总结在上面了，笔试的话我一开始以为会直接被刷掉，恒生的面试时间是 23 号和 24 号，大部分人在 6 月 22 号就陆续收到了面试邀请，有 23 号面试的，也有 24 号面试的。等了一天后，我邮件一点消息也没有，看着实习群里人陆续都收到了面试邀请，我感觉应该是被直接刷掉了。

后续，好在 hr 说面试邀请还没发完，我还是抱着一点希望，个人觉得面试机会我至少得有吧，不然也太扎心了...

在 6 月 23 日下午，早早地做完网络工程实验后，回到宿舍，就收到了面试邀请：

![](https://img-blog.csdnimg.cn/20200629172833941.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)

### 面试阶段

笔试还是如愿过了，恒生的面试就只有一轮技术面。在 23 号面试环节，许多人都说面试不怎么样，每个人几乎就 25 分钟，而且任何技术问题都没问...

我当时就很懵，如果只是用笔试来区别刷人的话，那这场面试岂不是没啥意义。一直到 23 号晚上，居然就有 dalao 收到了实习 offer，我当时一惊，这么快的嘛..我都还没开始面，这名额怎么就开始少了...

此时，大多数拿到实习 offer 的 dalao 都说是全程几乎问的技术问题，不是纯聊天。那么，我觉得如果面试不纯聊天的话，收到 offer 的概率应该特别高。

24 号下午 2 点，准时进入了腾讯会议，首先，简单地自我介绍，其中提到了自己的获奖经历，项目经历，如何学前端，CSDN 博客专家，平常习惯：善于总结，写博客、github 活跃，对恒生的了解，未来职业规划等等。

整场面试下来，几乎纯技术问题交流，也与面试官进行了互动，探讨一些问题。问的大部分是简历上的东西。（还是简单整理一下问题吧）

**万能开头：**

你先来一个自我介绍吧，介绍完毕后，面试官说：我看过你的 `github` 与博客，挺好的，总结的不错！

<a href="https://chocolate.blog.csdn.net/">CSDN 博客</a>

<a href="https://github.com/chocolate1999">Github</a>

**技术问题：**

- http 状态码你了解哪些？
- http 相关你所了解的有哪些，讲一讲？
- 简历上面写了你对浏览器渲染机制比较熟悉，来讲讲

**HR 方面问题：**

- 你所期望的公司员工关系是怎样的？
- 如果领导和你在某些方面，比如技术点上有一些冲突，你会怎么做？

**万能结尾：**

你还有什么想问我的？

> 整场面试下来，把自己准备的知识点都讲了一遍，也和面试官有说有笑的。其中对于浏览器渲染机制我展示了我的专业知识能力与自信，讲完后面试官对我笑了一下，此时我对收到 offer 更加自信了一点。

最后，努力还是收获了回报，成功收到 `offer`

![](https://img-blog.csdnimg.cn/20200629171540597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)

> 2020 年 6 月 29 日 恒生电子实习经验分享完结 ✿✿ ヽ(°▽°)ノ ✿
