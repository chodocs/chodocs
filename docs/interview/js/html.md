---
author: "HearLing"
---
# HTML 基础面试题

HTML 相关的知识其实主要靠积累，这里也只是列举出一些网上出现过的，常考的关于 HTML 的面试题。

答案依旧是**仅供参考**，话不多说开始吧。

## DOCTYPE 有什么作用？

Doctype 是 HTML5 的文档声明，通过它可以告诉浏览器，使用哪一个 HTML 版本标准解析文档。如果没有 DOCTYPE，浏览器就不知道文档解析的标准是什么，会导致 HTML 文档以混杂模式呈现（不仅会降低解析效率，而且会在解析过程中产生一些难以预知的 bug）。

## 什么是标准模式与混杂模式

- 标准模式（Standards mode）：以浏览器支持的最高标准运行；
- 混杂模式（Quirks mode）：中页面是一种比较宽松的向后兼容的方式显示。

## 为什么 HTML5 只需要写 `<!DOCTYPE HTML>`？

HTML5 不基于 SGML，所以不需要对 DTD 进行应用，但是需要 DOCTYPE 来规范浏览器行为。

> SGML:标准通用标记语言 DTD：文档类型定义 HTML4.01 基于 SGML 的 写法：`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`

## HTML5 新特性

新增加了语义标签、音视频、地理定位、储存、多任务等功能和元素：

- 语义标签：`header`、`footer`等，可以使开发者更方便的构建页面。
- video、audio -- 用于播放视频和音频的媒体。
- Canvas、SVG -- 用于绘画的元素，canvas 绘制的图片会失真而 SVG 绘制的不会失真。
- Drag 、Drop -- 用于拖放的 。
- Geolocation -- 用于获取地理位置。
- localStorage、sessionStorage -- 用于本地离线存储。
- webSQL、IndexDB -- 前端数据库操作，由于安全性极低，目前 h5 已放弃。
- web Worker -- 独立于其他脚本，不影响页面性能运行在后台的 javascript。
- webSocket -- 单个 TCP 连接上进行全双工通讯的协议。
- 新的特殊内容元素 -- 如：article、footer、header、nav、section。
- 新的表单控件 -- 如：date、time、email、url、search。

## 对 HTML 语义化的理解

Web 语义化，事实上就是使用恰当语义的 HTML 标签和 CSS class 等内容，让页面具有良好的语义和结构，从而方便人类和机器都能快速理解网页内容。

可以拆分为这四点：

- 用正确的标签做正确的事情
- 页面内容结构化
- 无 CSS 时也能进行网页阅读
- 方便浏览器，搜索引擎解析，利于 SEO

然后后面的面试题就是考察 html 标签的使用之类的了，由于 html 的标签实在是有点多哈，都有可能被问到，如果想百分百都能答出来还是要自己多看多练的~

## iframe 作用和优缺点

iframe 也称作嵌入式框架，嵌入式框架和框架网页类似，它可以把一个网页的框架和内容嵌入到现有的网页中。

优点：

- 能原封不动的展现嵌入网站
- 如果有多处引用，只需要修改 iframe 的内容，就都能改到，代码可重用，方便快捷
- 遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决

缺点：

- 不利于 SEO，爬虫程序无法解读
- iframes 阻塞页面加载，影响网页加载速度，iframe 加载完毕后才会触发 window.onload 事件，动态设置 src 可解决这个问题。
- 有时 iframe 由于页面挤占空间的原因出现滚动条，造成布局混乱。
- iframe 与主页面是共享链接池的，若 iframe 加载时用光了链接池，则会造成主页面加载阻塞。
- 有些小型的移动设备如手机等无法完全显示框架，兼容性较差。

## img 的 title 和 alt

- alt：全称 alternate，切换的意思，如果无法显示图像，浏览器将显示 alt 指定的内容

- title：当鼠标移动到元素上时显示 title 的内容

在 alt 和 title 同时设置的时候，alt 作为图片的替代文字出现，title 是图片的解释文字。

## label 的作用是什么？怎么用的？

label 元素不会向用户呈现任何特殊效果，但是，它为鼠标用户改进了可用性，当我们在 label 元素内点击文本时就会触发此控件。

最常用的就是单选框了：

```html
<form>
  <label for="male">男</label>
  <input type="radio" name="sex" id="male" />
  <label for="female">女</label>
  <input type="radio" name="sex" id="female" />
</form>
```

## 如何实现在一张图片上的某个区域做到点击事件？

图片热区技术，要用法 img 的 usemap 属性，map 标签和 area 标签：

[效果链接](https://www.runoob.com/try/try.php?filename=tryhtml_areamap)

```html
<body>
  <img src="planets.gif" width="145" height="126" alt="Planets" usemap="#planetmap" />

  <map name="planetmap">
    <area shape="rect" coords="0,0,82,126" alt="Sun" href="sun.htm" />
    <area shape="circle" coords="90,58,3" alt="Mercury" href="mercur.htm" />
    <area shape="circle" coords="124,58,8" alt="Venus" href="venus.htm" />
  </map>
</body>
```

## a 元素除了用于导航外，还有什么作用？

a 元素最常见的就是用来做锚点和下载文件。由于 ref 属性中的 url 可以是浏览器支持的任何协议，所以 a 标签还可以用来手机拨号、和发送短信。

## SEO 中的 TDK 是什么？

TDK 其实就是 title、description、keywords 这三个标签。title 表示标题标签，description 是描述标签，keywords 是关键词标签。
