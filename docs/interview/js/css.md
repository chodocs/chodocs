---
author: "HearLing"
---
# CSS 面试题大全（第一版）

## 引言

首先出这篇文章，一方面是为了记录巩固我所学的知识，明白面试的高频考点。不过我是不鼓励大家背题的，初衷是希望总结的一些面试题能帮助你查漏补缺，温故知新。这些题并不是全部，如果你还想看得更多，可以访问[小狮子前端](https://github.com/Chocolate1999/Front-end-learning-to-organize-notes/issues)，目前已经有 552 道大厂真题了，涵盖各类前端的真题，欢迎加入我们一起来讨论~

------ 以下是正文 ------

## 介绍一下 css 盒模型

CSS 盒模型本质上是一个盒子，封装周围的 HTML 元素，它包括：边距 margin，边框 border，填充 padding，和实际内容 content。

有两种盒模型，**标准** 盒模型和 **怪异** 盒模型，区别在于，元素的宽高大小表现为 content 的大小，而怪异盒模型则表现为 content + padding + border 的大小 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abcea89eddc847e0a35a25f141e44ac1~tplv-k3u1fbpfcp-zoom-1.image)

## 样式框架的原理，布局方法有哪些，flex，grid，还有吗？

**正常流布局** 浏览器默认的 HTML 布局方式，就是按照文档的顺序一个一个显示出来，块元素独占一行，行内元素共享一行

**浮动布局** 使用 float 属性，使元素脱离文档流，浮动起来。

**定位布局** 通过 position 属性来进行定位。（这里常考绝对定位于相对定位基准问题，下面再讲）

**使用 display 布局** 在 css 中实现页面布局的主要方法是设定 display 属性的值。此属性允许我们更改默认的显示方式。通过将一些内容从 block 转换为 inline（反之亦然）来更改默认表示形式，更重要的是可以通过设置 `flex` 或 `grid` 进行布局：

**flex 布局** 通过容器和轴进行布局设置。其中，容器分为父容器和子容器。轴分为主轴和交叉轴。

**grid 网格布局**：可以实现二维布局方式，和 table 布局差不多，基本概念-网格线(`Grid Lines`) 网格的水平和垂直的分界线 、网格轨道(`Grid Track`) 好比表格中行或列，分为 `grid column` 和 `grid row `、网格单元格(`Grid Cell`) 好比表格中的单元格 、网格区域(`Grid Area`) 好比表格合并单元格后的区域（用的不是很多）

**多列布局** : 一种把内容按列排序的方式，就像文本在报纸上排列那样。使用 `column-count` 属性设置需要多少列，也可以使用 `column-width` 以至少某个宽度的尽可能多的列来填充容器。

## css 绝对定位和相对定位都是以谁为基准？

定位 position 的几个属性要清楚：

- **静态定位**(`Static `positioning)是每个元素**默认**的属性——它表示“将元素放在文档布局流的默认位置。
- **相对定位**(`Relative` positioning)允许我们相对于元素在**正常的文档流中的位置移动**它——包括将两个元素叠放在页面上。这对于微调和精准设计(design pinpointing)非常有用。
- **绝对定位**(`Absolute` positioning)**脱离文档流**。我们可以将元素相对于页面的 `<html>` 元素边缘固定，或者相对于该元素的最近被定位祖先元素(nearest positioned ancestor element)。绝对定位在创建复杂布局效果时非常有用，例如通过标签显示和隐藏的内容面板或者通过按钮控制滑动到屏幕中的信息面板。
- **固定定位**(`Fixed` positioning)与绝对定位非常类似，但是它是将一个元素**相对浏览器视口固定**。 这在创建类似在整个页面滚动过程中总是处于屏幕的某个位置的导航菜单时非常有用。
- **粘性定位**(`Sticky` positioning)它会让元素**先保持和 position: static**一样的定位，当它的相对视口位置(offset from the viewport)达到某一个预设值时，他就会**再像 position: fixed**一样定位（某些网站头导航栏滚动到一定位置固定到屏幕）。

再回答这个问题：

- **absolute** 绝对定位 相对于最近的已定位的祖先元素, （有已定位指 position 不是 static 的元素祖先元素）如果无已定位祖先元素, 以 body 元素为偏移参照基准, 完全脱离了标准文档流。

- **relative**：相对定位元素的定位是相对其正常位置。设置了 relative 的元素仍然处在文档流中，元素的宽高不变，设置偏移量也不会影响其他元素的位置。

共同点：改变行内元素的呈现方式，都脱离了文档流；不同点：absolute 的”根元素“是可以设置的，fixed 的“根元素”固定为浏览器窗口

## 浮动布局和 flex 布局相比有什么优缺点？

`flex`：优点在于其容易上手，根据 flex 规则很容易达到某个布局效果。缺点是：浏览器兼容性比较差，只能兼容到 ie9 及以上。

`浮动`：浮动元素是脱离文档流，要做清除浮动，这个处理不好的话，会带来很多问题，比如高度塌陷等。浮动布局的优点就是比较简单，兼容性也比较好。只要清除浮动做的好，是没有什么问题的。

## 清除浮动

`clear` 规则用于清除元素浮动影响 `::after` 伪类为父元素添加后标签，实现清除浮动影响通过添加父元素并设置 `overflow` 属性可以清除浮动，原因：父元素产生 BFC 机制，即父元素的高度计算会包括浮动元素的高度。

## bfc 是什么，怎么样形成 bfc，bfc 有哪些用？

BFC Block Formatting Context（BFC | **块级格式化上下文**），是 Web 页面中盒模型布局的 CSS 渲染模式，是一个隔离的独立容器。

**怎样形成一个 BFC？** 块级格式化上下文由以下之一创建：

- 根元素或其它包含它的元素
- 浮动 (元素的 float 不是 none)
- 绝对定位的元素 (元素具有 position 为 absolute 或 fixed)
- 非块级元素具有 display: inline-block，table-cell, table-caption, flex, inline-flex
- 块级元素具有 overflow ，且值不是 visible

**BFC 用处**

1. 清除浮动（规则 6）
2. 布局：自适应两栏布局（规则 4、5）
3. 防止垂直 margin 合并（规则 5）

BFC 规则：

1. 内部的 Box 会在垂直方向，一个接一个地放置。
2. Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
3. 每个元素的左外边缘（margin-left)， 与包含块的左边（contain box left）相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。除非这个元素自己形成了一个新的 BFC。
4. BFC 的区域不会与 float box 重叠。
5. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算 BFC 的高度时，浮动元素也参与计算

## css 选择器有哪些？

基本选择器比如 标签标签选择器、类选择器、ID 选择器，机构选择器比如后代、子、紧邻兄弟、后兄弟选择器，伪类选择器

**基本选择器**：

- **标签选择器**：通配符选择器\*、根据标签为元素设置样式
- **类选择器**：.class 类选择器是为一类状态声明样式规则
- **ID 选择器**：#id 为有 id 属性的元素设置样式

**结构选择器**：

- 后代选择器：div p 选择元素内部的所有元素
- 子元素：div>p 选择子元素，不包括孙级及以下元素
- 紧邻兄弟元素： div+p 选择紧挨着的同级兄弟元素
- 后兄弟元素选择器：p~ul 选择后面的所有兄弟元素

**属性选择器**：[target] 带有 target 属性所有元素、 [target=_blank]targe 属性 等于"\_blank" 的所有元素。。。根据属性来为元素设置样式。

**伪类选择器**：

- 超链接伪类 :target（控制具有锚点目标元素的样式）、:root （根元素选择伪类即选择 html） 、:empty （没有内容和空白的元素）
- 结构伪类 ：first-child 、 :last-child 、:nth-child(n) 、 nth-child(odd) 选择奇数 、 nth-child(even)选择偶数（表格隔行变色 table tr>td:nth-child(odd)）
- 表单伪类：input:enabled 选择每个启用的 input 元素
- 字符伪类：p:first-letter 选择每个元素的首字母

元素权重：（可叠加）强制优先级 !important 让某个规则强制有效

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce4cb9f4fa9f439cb1422b46d7fcb590~tplv-k3u1fbpfcp-zoom-1.image)

## 预处理器 sass（less）优点

可以提供 CSS 缺失的样式层复用机制、减少冗余代码，提高样式代码的可维护性，提高开发效率。

## 实现一个垂直水平居中

**垂直水平居中**

- 行内元素

```
.parent {
   height: 高度;
   text-align: center;
}
.son {
    line-height: 高度;
}
```

- flex 布局

```
.parent {
    display: flex;
    align-items: center;
    justify-content: center;
}
//或者设置父flex ，子 margin: auto;
```

- table

```
.parent {
  display: table;
  text-align: center;
}
.son {
  display: table-cell;
  vertical-align: middle;
}
```

- 绝对定位定宽 定高

```
.son {
 position: absolute;
    top: 50%;
    height: 高度;
    margin-top: -0.5高度;
    width: 宽度;
    left: 50%;
    margin-left: -0.5*宽度
}
```

- transform 绝对定位不定宽 不定高

```
.son {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 50%;
    transform: translate( 0, -50%);
}
```

- left/right: 0 top/bottom: 0;

```
.son {
    position: absolute;
    width: 宽度;
    left: 0;
    right: 0;
    margin: 0 auto;

    height: 高度;
    top: 0;
    bottom: 0;
    margin: auto 0;
}
```

## css 中隐藏元素的方法，display:none, visibility:hidden,区别？还有什么方式

visibility:hidden、display:none、z-index=-1、opacity：0

**opacity：00**，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定了一些事件，如 click 事件也能触发 **visibility:hidden**，该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件 **display:none**， 把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删掉 **z-index=-1**，置于其他元素下面

## 实现一个块从左到右的移动

```cpp
<style>
  div {
       width: 100px;
        height: 100px;
        background: red;
    }

    div:hover {
        transition: 2s;
        transform: translateX(100px);
    }
</style>
```

## animation 的参数，怎样实现一个动画？

![animation](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0258957c82844836b6830344825b041c~tplv-k3u1fbpfcp-zoom-1.image)

使用 animation，定义一个函数，以及相关参数，在通过@keyframe 规则，创建动画

## CSS 和 JS 实现动画的方式

**JS 实现动画的方式**：setInterval，requestAnimationFrame（类似 setInterval）

它的主要思想是通过 setInterval 或 setTimeout 方法的回调函数来持续调用改变某个元素的 CSS 样式以达到元素样式变化的效果。

rAF：requestAnimationFrame 是另一种 Web API，原理与 setTimeout 和 setInterval 类似，都是通过 javascript 持续循环的方法调用来触发动画动作。但是 requestAnimationFrame 是浏览器针对动画专门优化形成的 APi，在性能上比另两者要好。

**CSS 实现动画**

1.css3 的`transition`--设置样式的属性值是如何从一种状态平滑过渡到另外一种状态

2.css3 的`transform`--应用于元素的 2D 或 3D 转换，可以用来设置元素的形状改变，如：rotate（旋转）、scale（缩放）、skew（扭曲）、translate（移动）和 matrix（矩阵变形）通常 transform 变化 和 transition 过渡 是组合使用的 t； 3.css3 的`animation`（animation 属性+@keyframes）--由属性 keyframes 来完成逐帧动画的。通过对关键帧和循环次数的控制，页面标签元素会根据设定好的样式改变进行平滑过渡。而且关键帧状态的控制是通过百分比来控制的。

下面是一个动画示例：

```css
<!DOCTYPE html>
<html>
<head>
<style>
div
{
width:100px;
height:100px;
background:red;
position:relative;
animation:myfirst 5s;
-moz-animation:myfirst 5s; /* Firefox */
-webkit-animation:myfirst 5s; /* Safari and Chrome */
-o-animation:myfirst 5s; /* Opera */
}

@keyframes myfirst
{
0%   {background:red; left:0px; top:0px;}
25%  {background:yellow; left:200px; top:0px;}
50%  {background:blue; left:200px; top:200px;}
75%  {background:green; left:0px; top:200px;}
100% {background:red; left:0px; top:0px;}
}

@-moz-keyframes myfirst /* Firefox */
{/* 内容同上 */}

@-webkit-keyframes myfirst /* Safari and Chrome */
{/* 内容同上 */}

@-o-keyframes myfirst /* Opera */
{/* 内容同上 */}
</style>
</head>
<body>

<div></div>

</body>
</html>
```

运行效果：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ddb0c7f919b415b8dc6de62d3affbb6~tplv-k3u1fbpfcp-watermark.image)

## 最后的话

🚀🚀 更多基础知识总结可以 ⭐️ 关注我，后续会持续更新面试题总结和面筋~

⭐️⭐️ 最后祝各位正在准备秋招补招和春招的小伙伴面试顺利~，收割 offer，我们一起加油吧 🤝！还有就是快春节了，提前祝你新年快乐~❤ ❤
