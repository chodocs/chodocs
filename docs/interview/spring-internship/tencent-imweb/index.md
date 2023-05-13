# 【腾讯】记录腾讯一面（IMWeb 团队）

::: tip
文章编写于 2020 年 05 月 26 日 —— 第一次面试给我紧张的...
:::

## 写在开头

面试总时长大约 100 分钟，下午 3 点面试，结束接近 5 点样子。总体感觉就是体会到了差距，但也算是一次历练吧，大场面我都经历过了，也无惧小场面了。下面就将面经分享一下，主要是分享一下题目把，答案网上应该都能找到。

PS：`题目肯定是不唯一的，写这篇博客的原因：`

- 记录总结这次面试
- 分享一下面经
- 体会差距，努力学习

注：不代表这套题就是你会被问到的，可以学习一下面试模式

此次面试官：IMWeb 团队 前端架构师

## 正文

### 1、自我介绍

开场多半都是这样

### 2、询问你在大学学了哪些课程，你觉得你学得最好的是哪一门？

这里的话，接下来的话题就会围绕你觉得学的最好的课程来展开

### 3、先用 js 手写一个冒泡排序

这期间还问了时间复杂度和空间复杂度，空间复杂度与什么因素有关

### 4、你知道打开 https:www.qq.com经历了什么吗？

这个就是关于输入网址到显示页面的步骤

### 5、js 基本数据类型

之前答的不是很好，面试官就回到了简单一点的题

### 6、Vue 生命周期你有了解过吗？你用到过哪些？

beforeCreate 、created 等等

### 7、你知道 cookie 吗？请描述一下 cookies，sessionStorage 和 localStorage 的区别？

这里也问了 cookies 里面重要属性有哪些，有什么用

### 8、你了解 SEO 吗？知道怎么做吗？

这里我就答了 html5 一些，以及搭建 hexo 博客用的优化，还提及到了 SEO 有什么用

### 9、谈谈你对 this 的理解

因为提及到了 apply 和 call，面试官就反问了 apply 和 call 的知识

### 10、你了解跨域吗？

我在谈及的时候，提及到了前后端分离模式，于是下一题...

### 11、说说你对前后端分离的理解

我就从 JSONP 时代讲到了 nginx 反向代理，也从原本不需要考虑跨域问题谈到现在比较主流的前后端分离模式

### 12、你对浏览器的理解，本地打开浏览器经历了什么？

这个当时有点懵...

### 13、谈谈你所了解的前端性能优化？

代码压缩，SEO、缓存等等

### 14、你知道 gulp 吗？

流...

### 15、你用过 git 吗？常见哪些指令？你知道回退是什么指令吗？

### 16、你了解 React 吗？

因为不是很了解，这里我就谈及了 mvvm 和 mvc 的区别，也说明了为啥选择学习 Vue，作为学生目前了解不是很深入

### 17、你知道怎么不传 cookied 吗？你了解过 http:only 吗？

这个我就有点熟悉，但不记得了

### 18、你了解 Webpack 吗？

打包方面

### 19、对于之前打开本地浏览器那一块，你了解过 dom 树吗？

好像他也想问 AST 语法树方面，但我也不记得了

### 20、你了解 CDN 吗？在哪里你用过

### 21、说说你对原型链的理解？

### 22、谈谈你对响应式原理的理解

我提及到了 Vue2.0 和 Vue3.0 区别 以及 proxy 还能做些什么

### 23、你了解闭包吗？

### 24、leetcode 电话号码的字母组合

题目

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

<CloudinaryImg publicId='interview/phone_wnvkx3' alt='phone'/>

示例:
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

### 25、最后，出了 4 到题

① 异步、事件循环方面，具体题不急得了，但你能把下面这道题做出来，基本上没问题

<a href="https://chocolate.blog.csdn.net/article/details/104907304">原题地址及解析</a>

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>挑战js面试题</title>
</head>
<body>
    <script>
        async function async1(){
            console.log('async1 start');
            await async2();
            console.log('async1 end');
        }
        async function async2(){
            console.log('async2');
        }
        console.log('script start');
        setTimeout(function(){
            console.log('setTimeout');
        },0)
        async1();
        new Promise(function (resolve){
            console.log('promise1');
            resolve();
        }).then(function(){
            console.log('promise2');
        });
        console.log('script end');
    </script>
</body>
</html>

```

② 你如何将 arguments 参数改变为数组

③ box-sizing 中 content 和 border 的区别

讲解各种盒模型：标准盒模型、IE（怪异）盒模型、flex、分列布局

④ 请你用正则表达式来解析腾讯 qq 或者腾讯其它网页的域名

## 结尾

好了，距离上次面试也过了两天了，我才打算写一份面经，有些题目可能不太记得了，如果后续学习的时候想到了，我会在评论区进行补充，100 多分钟，想不到还问了这么多题...而且有些题目我还进行了深入探讨，比如对闭包，对 v8 引擎，Vue 中响应式原理那一块探索设计模式。

尽管凉了，但也是一次不错的体验吧，`跌倒了一次，爬起来，继续走下去`...

```javascript
学如逆水行舟，不进则退
```
