# 【深信服】星耀实习生（前端开发）笔试&面试分享

::: tip
文章编写于 2020 年 06 月 16 日 —— 当时春招笔试与面试经历。
:::

## 投递初

原本我自己是不想参与笔试的，如标题所示，这是第二批笔试了。因为当初搜了搜关于深信服前端岗位，貌似有网友说前端框架比较老套，然后当初我看招聘信息上有这一点：熟悉 ejs 优先。关于这点，我没怎么了解过。第一次笔试，我室友就在我旁边进行的笔试，他是投的后端，一共就三道算法编程题。

原本以为我第一次没有参与笔试，应该就没有后续内容了，没想到前几天又发了邮件邀请我参与第二批笔试，我想了想，反正都是几道算法题，我就当做练练手好了，结果，打开题库，一共四个大题，分选择填空题 25 道，还有 3 道编程题，让我一下震惊地是三道编程题没有一个是算法题，全是手撕源码方面的，奈何最近又没怎么准备这方面的...

结果我想我已经心知肚明了，我交了白卷，但我把一些我感觉不太会的题目记录了下来，正好通过这次笔试，对自己查漏补缺一下。下面就是题目介绍环节了。

## 笔试过程

### 介绍

整套题 25 道多选题，3 道编程题（已存在 Promise 实现 Promise.all、手撕 IOS 按钮 switch、自定义 querySelector，要求保存状态）

### 小题

#### 代码题

下述代码会输出什么？

```javascript
let arr = ["a", "b"];
for (let key in arr) {
  console.log(key);
}
for (let key of arr) {
  console.log(key);
}
```

<details><summary><b>参考答案</b></summary>

<CloudinaryImg publicId='interview/sangfor-2_qx6acx' alt='sangfor'/>

`for in` 遍历的是数组的索引（即键名），而 `for of` 遍历的是数组元素值。 所以 `for in` 更适合遍历对象，不要使用 `for in` 遍历数组。

<a href="https://juejin.im/post/5aea83c86fb9a07aae15013b">推荐阅读：Js 中 for in 和 for of 的区别</a>

</details>

#### 理论题

哪些情况会导致 `HTTPS` 证书警告

<details><summary><b>参考答案</b></summary>

通常情况下，出现 **https 证书安全警告** 的原因无非就是两种，一种是 https 证书错误，一种是 https 证书风险。第一种错误还好点，最大的结果就是进不去，我们只要查找原因，消除错误就行，第二种 https 证书风险就会问题大一些，因为我们不知道证书的安全性是否收到了影响，一旦安全性收到影响，那么就得迅速更换证书，因为极有可能造成更多的安全风险。

**https 证书错误** 的原因有很多，通常最长见的原因就是 `证书过期`，过了这个时间，你再用的时候，系统就会提示你证书错误，这个时候，可查看该证书信息的有效起止日期，确定证书是否在有效期内，如在的话需查看电脑日期是否正确。否则就是第二种原因，`ssl证书不在有效期内`，需尽快联系证书颁发厂商，进行续费。

**https 证书安全警告** 的另一种原因就是 https 证书风险，出现这种状况的情况也很多，比如：

- 当你的电脑收到来自网络的攻击的时候，这个时候证书验证就会给你发出安全警示
- 当你的电脑存在病毒的时候也会发出安全警示
- 当你的防火墙关闭状态下也会出现类似的警告。

> 通常情况下，https 加密网页在验证你的证书之前，会对整个网络环境进行分析，就像机器自检一样，检查没有毛病了再认证，如果有问题，就会及时的提醒用户哪里存在问题，用户根据提示，及时的进行风险修复，当网络环境达到要求后就可以开启后续的认证了。

</details>

#### 代码题

下述代码会输出什么？

```javascript
(function () {
  for (var i = 0; i < 5; i++) {
    setTimeout(console.log, i, i);
  }
})();
```

<details><summary><b>参考答案</b></summary>

<CloudinaryImg publicId='interview/sangfor-3_nml8et' alt='sangfor'/>

本题考察：

`setTimeout(func, delay, param1, param2, ...) `第三个参数及以后的参数都可以作为 func 函数的参数，比如下面这个例题：

```javascript
(function () {
  for (var i = 0; i < 5; i++) {
    setTimeout(console.log, i, i, 100);
  }
})();
```

<a href="https://www.cnblogs.com/xjnotxj/p/7452698.html">推荐阅读：for 循环 + setTimeout 结合的烂大街的面试题</a>

</details>

#### 代码题

下述代码会输出什么？

```javascript
function load() {
  return Promise.resolve("chocolate")
    .then((res) => {
      throw res;
    })
    .catch((res) => "error");
}
async function fn() {
  console.log(await load());
}
fn();
```

<details><summary><b>参考答案</b></summary>

<CloudinaryImg publicId='interview/sangfor-4_ywkyiv' alt='sangfor'/>

`await` 会一直等待着 `Promise` 对象执行完，然后调用 `.then` 方法，那里 `throw`回调到 `.catch`，因此输出 `error`

</details>

#### 代码题

怎么将字符串 `"1.20"` 转换成 `1.2`

<details><summary><b>参考答案</b></summary>

```javascript
console.log(+"1.20");
console.log(Number("1.20"));
```

<CloudinaryImg publicId='interview/sangfor-5_j4e811' alt='sangfor'/>

</details>

#### 理论题

列举一下行内元素有哪些？

<details><summary><b>参考答案</b></summary>

行内元素列表
下面的元素都是行内元素：

- b, big, i, small, tt
- abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var
- a, bdo, br, img, map, object, q, script, span, sub, sup
- button, input, label, select, textarea

<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements">推荐阅读：块级元素 - HTML（超文本标记语言）</a>

<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Inline_elements">推荐阅读：行内元素 - HTML（超文本标记语言）</a>

</details>

### 编程题

#### 第一题

已存在 Promise 实现 Promise.all

<details><summary><b>参考答案</b></summary>

```javascript
Promise.all = function (promises) {
  let arr = new Array(promises.length);
  let cnt = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((val, index) => {
      Promise.resolve(val).then(
        (val) => {
          cnt++;
          arr[index] = val;
          if (cnt === promises.length) {
            resolve(promises);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};
```

</details>

#### 第二题

手撕 IOS 按钮 switch

要求：纯 CSS 实现，只能有 HTML+CSS 且 switch 按钮能够点击切换，要有效果。

<details><summary><b>参考答案</b></summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>实现IOS</title>
    <style>
      .switch-box {
        position: relative;
        height: 30px;
        display: inline-block;
      }
      .switch-input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      .switch-label {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 30px;
        background: #e3e3e3;
        border-radius: 20px;
      }

      .switch-label::after {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #fff;
        content: "";
        transition: 0.3s;
      }

      .switch-input:checked + .switch-label {
        background: #66cc33;
      }

      .switch-input:checked + .switch-label::after {
        left: 33px;
      }
    </style>
  </head>

  <body>
    <div class="switch-box">
      <input class="switch-input" type="checkbox" checked id="switch-input" />
      <label class="switch-label" for="switch-input"></label>
    </div>
  </body>
</html>
```

<a href="https://juejin.im/post/5c8322a9e51d452fee00b70f">大志前端：【前端帮帮忙】第 4 期 使用纯 CSS 制作一个开关按钮</a>

<a href="https://codepen.io/chocolate1999/pen/eYJvOwz">Chocolate：CSS 制作开关按钮源码（演示）</a>

</details>

#### 第三题

自定义 querySelector，要求保存状态

编写 `customQuery` 函数，实现类似于 `querySelector` 函数的功能，但只实现类选择器与后代选择器的查询（其它的选择器情况不需要考虑）接受参数为一个字符串，如：`'.class-a .class-b' `，要求调用 `customQuery('.class-a .class-b')` 可以查找到对应的元素节点。

> 待更新...

## 后续

我就好奇的搜了搜 `深信服ejs`，然后就给我推荐了一篇博客：2020.6.1 深信服前端实习一轮笔试+面试，我好奇地点了进去，然后我：WTF? 这不就是我这次笔试的题目吗... 我当时就留下了没有准备好的泪水...

<a href="https://blog.csdn.net/weixin_43336545/article/details/106477642">2020.6.1 深信服前端实习一轮笔试+面试</a>

然后在我打算写错题笔记时，在`牛客招聘助手` 上又收到了 **简历-不合适** 通知，我就很奇怪了，毕竟我的简历是通过了 `腾讯` 和 `字节跳动` HR 的筛选了的。然后我就去牛客网找原因，我就打开了自己的附件简历，又是一句：WTF？我简历居然是老版本的，应该是我最初的那一批简历了，目前版本的都是迭代了好多次了，我又留下了没有细心的泪水...我之前还是投了好几家公司，有字节，有虎牙等。因为这个我最近几天的简历应该都没通过...

## 总结

尽管今天看上去挺倒霉的，但还是不错的一天，**顺风不骄傲，逆风不放弃**，是我最近看到的一句话。又总结了一次，知识又**扎实**了一点，继续努力！

```javascript
学如逆水行舟，不进则退
```

> 没想到深信服居然捞了我，感动到哭了，呜呜呜~
> <CloudinaryImg publicId='interview/sangfor-6_w18ka2' alt='sangfor'/>
> 赶快写一个面经吧！

## 一面

> 下午 15 点 10 准时来电话，面试时长 25 分 40 秒（毕竟录了音，能有个准确时间...）面试官是一个小姐姐，挺温柔的哈哈哈。

### 自我介绍（经典开头）

### 询问博客主要内容介绍

### 再问笔试题相关，因为之前做的不是很好...

#### 哪些情况会导致 `HTTPS` 证书警告

<details><summary><b>参考答案</b></summary>

通常情况下，出现 **https 证书安全警告** 的原因无非就是两种，一种是 https 证书错误，一种是 https 证书风险。第一种错误还好点，最大的结果就是进不去，我们只要查找原因，消除错误就行，第二种 https 证书风险就会问题大一些，因为我们不知道证书的安全性是否收到了影响，一旦安全性收到影响，那么就得迅速更换证书，因为极有可能造成更多的安全风险。

**https 证书错误** 的原因有很多，通常最长见的原因就是 `证书过期`，过了这个时间，你再用的时候，系统就会提示你证书错误，这个时候，可查看该证书信息的有效起止日期，确定证书是否在有效期内，如在的话需查看电脑日期是否正确。否则就是第二种原因，`ssl证书不在有效期内`，需尽快联系证书颁发厂商，进行续费。

**https 证书安全警告** 的另一种原因就是 https 证书风险，出现这种状况的情况也很多，比如：

- 当你的电脑收到来自网络的攻击的时候，这个时候证书验证就会给你发出安全警示
- 当你的电脑存在病毒的时候也会发出安全警示
- 当你的防火墙关闭状态下也会出现类似的警告。

> 通常情况下，https 加密网页在验证你的证书之前，会对整个网络环境进行分析，就像机器自检一样，检查没有毛病了再认证，如果有问题，就会及时的提醒用户哪里存在问题，用户根据提示，及时的进行风险修复，当网络环境达到要求后就可以开启后续的认证了。

</details>

#### Promise.all 的原理（还是之前笔试的题）

<details><summary><b>参考答案</b></summary>

```javascript
Promise.all = function (promises) {
  let arr = new Array(promises.length);
  let cnt = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((val, index) => {
      Promise.resolve(val).then(
        (val) => {
          cnt++;
          arr[index] = val;
          if (cnt === promises.length) {
            resolve(promises);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};
```

</details>

#### 手撕 IOS 按钮 switch（仅提供思路）

要求：纯 CSS 实现，只能有 HTML+CSS 且 switch 按钮能够点击切换，要有效果。

<details><summary><b>参考答案</b></summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>实现IOS</title>
    <style>
      .switch-box {
        position: relative;
        height: 30px;
        display: inline-block;
      }
      .switch-input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      .switch-label {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 30px;
        background: #e3e3e3;
        border-radius: 20px;
      }

      .switch-label::after {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #fff;
        content: "";
        transition: 0.3s;
      }

      .switch-input:checked + .switch-label {
        background: #66cc33;
      }

      .switch-input:checked + .switch-label::after {
        left: 33px;
      }
    </style>
  </head>

  <body>
    <div class="switch-box">
      <input class="switch-input" type="checkbox" checked id="switch-input" />
      <label class="switch-label" for="switch-input"></label>
    </div>
  </body>
</html>
```

<a href="https://juejin.im/post/5c8322a9e51d452fee00b70f">大志前端：【前端帮帮忙】第 4 期 使用纯 CSS 制作一个开关按钮</a>

<a href="https://codepen.io/chocolate1999/pen/eYJvOwz">Chocolate：CSS 制作开关按钮源码（演示）</a>

</details>

### Vue 双向绑定的实现原理

### 谈谈你对 BFC 的理解

### css 实现倒三角

<details><summary><b>参考答案</b></summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>画倒三角形</title>
    <style>
      .triggle {
        width: 0px;
        height: 0px;
        border-top: 40px solid red;
        border-left: 40px solid transparent;
        border-bottom: 40px solid transparent;
        border-right: 40px solid transparent;
        margin: 40px;
      }
    </style>
  </head>
  <body>
    <div class="triggle"></div>
  </body>
</html>
```

<CloudinaryImg publicId='interview/sangfor-1_hraou8' alt='sangfor-1'/>

</details>

### 谈谈你对 cookie 的理解

### 谈谈你对 sessionstorage 的理解

### ajax 的工作流程

### 谈谈你对闭包的理解

### for of 和 for in 的区别

下述代码会输出什么？

```javascript
let arr = ["a", "b"];
for (let key in arr) {
  console.log(key);
}
for (let key of arr) {
  console.log(key);
}
```

<details><summary><b>参考答案</b></summary>

<CloudinaryImg publicId='interview/sangfor-7_pwdcxk' alt='sangfor'/>

`for in` 遍历的是数组的索引（即键名），而 `for of` 遍历的是数组元素值。 所以 `for in` 更适合遍历对象，不要使用 `for in` 遍历数组。

<a href="https://juejin.im/post/5aea83c86fb9a07aae15013b">推荐阅读：Js 中 for in 和 for of 的区别</a>

</details>

### HTTP 的状态码

### 算法题 1：单链表反转

<details><summary><b>参考答案</b></summary>

```java
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}
```

<a href="https://juejin.im/post/5e3d3f25e51d45270c276fe3">推荐阅读——Jay_huaxiao：看一遍就理解，图解单链表反转</a>

</details>

### 算法题 2：有一个仅由 0 和 1 组成的 01 串，找到其中最长的一段子串，使得该子串中 0 和 1 的数目相等

<details><summary><b>参考答案</b></summary>

- 如果将 0 看做-1，则我们要找的子串是最长的和为 0 的子串。

- 这种子串求和的问题，一般采用前缀和的方法来解决。

- 用 Sum[i]代表前 i 个数的和，问题的模型转换为，找到 i 和 j，满足 Sum[i] 与 Sum[j]相等，且|i-j|最大。

- 使用 Hash 表作为辅助数据结构，Hash 表中记录了获得某个 Sum 时最小的 i。从左到右遍历 Sum[i]，在 Hash 表中查找是否存在，如果存在，则记录下 Hash[Sum[i]] 和 i 的距离差，否则 Hash[Sum[i]] = i。一次遍历结束后得到最大的距离差，同时也可以得到具体是哪一段。

```cpp
#include<bits/stdc++.h>
#define endl '\n';
#define mst(a,b) memset(a,b,sizeof(a));
using namespace std;
const int maxn=1e5+5;
int a[maxn];
int n,m,t;
int dp[maxn];
int main(){
    string str;
    while(cin>>str){
        int zeroIndex = 0;
        int len = str.length();
        dp[1] = (str[0]-'0') == 1? 1:-1;  //将0转变成-1
        for(int i=2;i<=len;i++){
            dp[i] = (str[i-1]-'0') == 1? 1:-1; //将0转变成-1
            dp[i]+=dp[i-1];   //求前缀和
            if(dp[i]==0) zeroIndex=i;  //记录当前前缀和为0的下标位置
        }
        int start = 0 ,maxnlen = 0;
        map<int,int> mp;
        for(int i=1;i<=len;i++){
            if(!mp.count(dp[i])){  //记录首次出现的前缀和的位置
                mp[dp[i]]=i;
            }else{
                start = mp[dp[i]];  //如果有相同的前缀和，求出最长长度
                maxnlen = i-start;
            }
        }
        string ans;
        if(zeroIndex>=maxnlen){  //对于前缀和为0的情况特殊考虑
            maxnlen = zeroIndex;   //与相同前缀和的长度取最大值
            ans = str.substr(0,maxnlen);
        }
        else
            ans = str.substr(start,maxnlen);
        cout<<ans<<" "<<maxnlen<<endl;
    }
    return 0;
}
```

如果需要详细的步骤介绍，可以参考如下博文：

<a href="https://blog.csdn.net/SunnyYoona/article/details/41910519">推荐阅读——SunnyYoona ：[经典面试题]最长 01 子串</a>

</details>

### 你还有什么要问我的吗？（经典结尾）

#### 询问城市

#### 深信服那边前端主要技术栈

#### 询问前端框架 ext.js，~~毕竟有点老了~~

#### 询问面试结果的时间

## 一面总结

总体来说，是体验比较好的一次面试了，题目都比较简单（~~都是常见的基础题~~ ），然后是小姐姐面试，感觉还是不错的，自我介绍完后我就很有底气，毕竟最近我准备了很久，关于网络方面的问题还有 `Vue` 源码我准备了和面试官扯 40 分钟的知识点。但本次一面是电话面的话，我知道一般就 20-30 分钟，所以我就保留了一些知识点，说不定来二面了呢是吧。

后面询问了面试官相关技术栈，也是 `Vue`。我连忙回答：可以！起初春招那时候我就看到前端需要熟悉 `ext.js`，我那时候就百度了下，原来这都比较老了...所以我有一段时间都没有想法考虑深信服了，因为觉得可能技术栈和我不太符合，因此一轮笔试我就没参加，具体本文开头就提及了。后面面试官是说因为有一些老的项目需要维护，现在都是主流用`Vue`了。

<CloudinaryImg publicId='interview/sangfor-8_qu5kbi' alt='sangfor'/>

> 好了，本次一面到此分享结束，后续有二面的话，再进行补充了。

## 结尾：努力不一定成功

今天刚做完笔试题，然后 6 月 21 日晚 10 点 27 收到了来自深信服的邮件，我原本很期待选择下一次面试时间的，看到邮件标题 `很遗憾` 三个字，一下子就沉浸了下来。

<CloudinaryImg publicId='interview/sangfor-9_dsqjkw' alt='sangfor'/>

**努力不一定成功**，是我看完邮件后立即想到的句子。对于一面我其实是比较有信心的，但最后还是被刷了，我立即想了想为什么我会被刷？有这几个原因在：

- 笔试做的太差了，我甚至后面编程题几乎白卷，首先从态度上就已经做的不是很好了
- 一面也是运气比较好，收到了面试邀约，在面试开头，面试官就和我说了笔试**很一般**
- 最后面试官给的算法题，后续补提地时候才发现我居然听错题目了，呜呜呜...我以为是求 1 构成的最长子串。
- 简历不是最新的，我看了下我的投递时间，是 4 月 30 日，那个时候简历还是有一些问题的，当时还把自己搭的 `hexo` 博客写了进去，为什么后面的简历选择撤掉了呢？因为搭的博客显得比较不成熟。
- 核心的编程题没写出来，可能就是被刷掉的主要原因吧，因为只懂得一点知识点是满足不了公司业务需求的。

ok，总结完毕，也不是一次受打击了，现在也逐渐习惯了，老一面了。后续还有恒生电子的面试，继续保持干劲吧！

<CloudinaryImg publicId='interview/sangfor-0_ezwfgk' alt='sangfor'/>

> 2020 年 6 月 21 日晚，深信服实习笔试&面试分享结束
