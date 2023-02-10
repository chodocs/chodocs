---
author: "HearLing"
---

# 使用浏览器开发者工具

这个面试其实还真不好考察，因为是偏实践的问题，往往可能会和你所做的项目的性能挂钩，如果不是作为一个重要考点的话，往往你在描述自己项目如何发现性能问题，以及如何通过各种手段解决就好了。

所以真正面试很少会都问的一样，没有明确的面试题，但是作为工程师调试页面的核心工具，能够熟练掌握并使用，不仅能为工作提高效率，也能提高自己性能分析，性能优化等方面的能力。

好了，话不多说，直接开始吧~

如果本文对你来说太简单了，可以看看[官方的文档](https://developer.chrome.com/docs/devtools/overview/)。

> 以下浏览器的开发者工具都以 Chrome 为例

## 讲讲自己知道的开发者工具的面板吧

（自己不是很熟悉的就不要讲了）

- 与性能有关的面板：网络面板、Performance 面板、内存面板等
- 与调试有关的面板：Elements 面板、Source 面板、Console 面板等

## XXX 面板有什么用？（重点关注网络面板）

以下都是了解，如果有不了解的面板，可以看看：

### Elements 面板

![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/UjVAPTnFGxLEc5RLDwBy.png?auto=format&w=845)

作用：查看和更改 DOM 和 CSS。

### Console 面板

![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/hlgSxlGaLKLeQ45nGwUC.png?auto=format&w=845)

作用：从控制台查看消息并运行 JavaScript

### Source 面板

![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/tYPZahEdu0RMGFFcCvyp.png?auto=format&w=845)

作用：调试 JavaScript，在页面重新加载时保留在 DevTools 中所做 更改，保存和运行 JavaScript 的片段，并将 DevTools 中所做的更改保存到磁盘中。

### 网络面板

![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/XE91VMkc9x1jdMQR1Iep.png?auto=format&w=845)

作用：查看和调试网络活动。

网络面板中的一些详细操作，如记录网络活动、模拟较慢的网络连接、检查资源详细信息等，查看[描述](https://developer.chrome.com/docs/devtools/network/)，写的很清楚，在这里就不搬运了~

### 性能面板

![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/nCVPdzEUA2XIY5txAG1G.png?auto=format&w=845)

作用：找到提高负载和运行时性能的方法。

### 内存面板

![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/oR8gZtwxxhRLj77xYsWd.png?auto=format&w=845)

### 应用面板

![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/zVZBef8kCIP6uEm9em9y.png?auto=format&w=845)

检查加载的所有资源，包括 IndexedDB 或 Web SQL 数据库、本地和会话存储、cookie、应用程序缓存、图像、字体和样式表。

### 安全面板

![](https://wd.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/wB3jgziVHoF13hYf8Yi1.png?auto=format&w=845)

调试混合内容问题、证书问题等。

## 排队（Queuing）时间过久

大概率是由于浏览器为每个域名最多维护 6 个连接导致的，解决方案：

可以让 1 个站点下的资源放在多个域名下（域名分片技术）。除此之外，也可以将将站点升级到 HTTP2，就没有这个最多连接限制了。

## 第一字节时间过久（TTFB）

可能产生的原因，和解决方式：

- 服务器生成页面时间过久，需要提高服务器处理速度，可采用一些缓存的技术等
- 网络原因，可以使用 CDN 来缓存静态文件。
- 发送请求头是带上看多余的用户信息，尽量减少不必要的 Cookie 等数据信息。

## 下载时间过久（Content Download）

有可能是字节太多的原因导致的，可以通过减少文件大小，比如文件压缩等方法解决。

## 性能优化

如何让我们的页面能更快的显示和响应，这里可以分为三个阶段：

- 加载阶段：发出请求到网页渲染完成的这段过程，这里影响和优化的主要是网络和 JavaScript 脚本。
- 交互阶段：页面加载完成，用户交互的这段过程，影响的主要是 JavaScript 脚本。
- 关闭阶段：关闭后的一些清理操作，影响的主要也是 JavaScript 脚本。

那么接下来就详细再聊聊这些吧

## 加载阶段的优化

加载阶段能做的主要优化，总结了下面几点：

- 减少关键资源个数
- 降低关键资源大小
- 降低关键资源的 RTT 次数

这几个关键的优化点的优化方案：

- 减少关键资源个数：

  - 比如可以将 js 和 css 改成内联的形式，关键资源比如原来有 3 个就减少到 1 个了。
  - 变成非关键资源:如果 JavaScript 代码没有 DOM 操作，则可以改成 async 或者 defer；同样 CSS，如果不是在页面构建前加载，则可以加上取消阻止显示的标志，他们就都能变成非关键资源了。

- 降低关键资源大小：
- 压缩 CSS 和 JavaScript 资源
- 移除一些注释内容
- 变成非关键资源

- 降低关键资源的 RTT 次数:
  - 实现前两者的优化
  - 使用 CDN

## 交互阶段的优化

交互阶段的优化，其实就是说优化，渲染进程中渲染帧的速度，帧的速度决定了交互的流畅性。

> 大部分情况下，生成一个新的帧，是由 JavaScript 通过修改 DOM 或者 CSSOM 来触发的

## 重排和重绘

对于渲染进程中的主线程的样式计算、布局计算等以及合成线程的绘制阶段不懂的，详细可以看[输入 URL 到页面展示发生了什么吗？](https://chodocs.cn/interview/browser/process/)这篇文章，这里不会讲得很深入。

- 重排：如果在样式计算阶段发生布局信息的修改，那就会触发重排的操作，重新计算布局等一系列操作，代价是非常大的。
- 重绘：只是修改了颜色之类的信息，没有设计布局的调整，则今天跳过布局阶段，直接进入绘制阶段，重绘的代价比重排小一些。
- 由 CSS 触发的：例如变形、动画等特效，是在合成线程上执行的（合成线程的合成操作阶段），那就不会触发重排或重绘，并且合成线程速度本身就快。

## JavaScript 脚本执行时间过长

JavaScript 脚本执行时间过长，会霸占主线程执行其它渲染任务的时间，通常可以通过以下几种方法解决：

- 将一次执行的函数分解为多个任务，因为当任务被分解时，浏览器有更多的机会响应更高优先级的工作——包括用户交互。
- 采用 Web Worker 。可以把一些和 DOM 操作无关且耗时的任务放到 Web Workers 中去执行。
  > Web Workers 使得一个 Web 应用程序可以在与主执行线程分离的后台线程中运行一个脚本操作。这样做的好处是可以在一个单独的线程中执行费时的处理任务，从而允许主(通常是 UI)线程运行而不被阻塞。

## 布局抖动

是指在一次 JavaScript 执行过程中，多次执行强制布局和抖动操作。重复执行计算样式和布局（产生的原因），会大大影响当前 js 的执行，当然只要我们尽量避免在修改 DOM 的同时去查询相关值就能避免了。

## CSS 合成动画

与主线程上的布局计算和绘制操作不同，CSS 合成（在合成线程完成）是可以在主线程被占用的情况下，依然能执行。如果能利用好 CSS 合成动画，就能很大程度上提高在交互阶段的性能。

## 频繁的垃圾回收

是由于 JavaScript 的自动垃圾回收机制，如果频繁的创建临时对象，那么垃圾回收器也就会频繁执行垃圾回收策略。而垃圾回收操作是会占用主线程的，从而影响其它任务执行。尽量减少小颗粒对象产生，并且做好储存结构的优化就可以解决。

## 根据性能报告优化 Web 性能

> 详细与最新版的性能检测工具可能存在差距

主要有六项指标：

- 首次绘制(First Paint)：在渲染进程确认要渲染当前的请求后，渲染进程会创建一个空白页面，我们把创建空白页面的这个时间点称为 First Paint，简称 FP。
- 首次有效时间 (First Meaningfull Paint)：首次有效绘制，由于 FMP 计算复杂，而且容易出错，现在不推荐使用该指标。
- 首屏时间(Speed Index)：它表示填满首屏页面所消耗的时间，首屏时间的值越大，那么加载速度越慢。
- 首次 CPU 空闲时间(First CPU Idle)它表示页面达到最小化可交互的时间。要缩短首次 CPU 空闲时长，我们就需要尽可能快地加载完关键资源，尽可能快地渲染出来首屏内容
- 完全可交互时间(Time to Interactive)：，它表示页面中所有元素都达到了可交互的时长。
- 最大估计输入延时(Max Potential First Input Delay))：Web 页面在加载最繁忙的阶段， 窗口中响应用户输入所需的时间。

## Performance 的性能报告

- FPS 图表出现红色块，代表附近渲染一帧时间过久，可能导致页面速度慢，甚至卡顿。
- CPU 图表占用面积太大，代表 CPU 使用很高，可能是有 JavaScript 占用主线程，从而影响其它任务执行。
- 内存使用量图线一直增加，大概率是内存泄漏
- Network 指标，可以分析到网络请求所耗时长

可能有所遗漏，欢迎补充~

## 总结

内容可能不会在面试经常被问到，但是也是浏览器这个板块十分重要的知识点，当然可能本文的某个知识会在未来产生错误，所以，你看到这篇文章并觉得哪里有问题的话，可以[在这](https://developer.chrome.com/docs/devtools/)查询一下。
