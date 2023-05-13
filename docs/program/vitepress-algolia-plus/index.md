---
author: "Choi Yang"
date: 2023-02-09
---

# 给 VitePress 添加 algolia 搜索（补充）

<VideoLink bvId="BV1DY411v7Lt">【编程】最新版本的 VitePress 中添加 Algolia 搜索，无坑版本 B 站视频传送门</VideoLink>

最近 vitepress 更新了好几个版本，而 chodocs 仓库依赖更新的机器人之前因为转换组织原因没启用，所以一直没有同步版本。直到最近还是有挺多粉丝来询问为什么我按照[「给 VitePress 添加 algolia 搜索」](/program/vitepress-algolia/) 这篇文章做法而不生效，如下图所示：

<CloudinaryImg publicId='program/algolia-comment_e34jfq' alt='algolia-comment'/>

于是就有了今天的内容，还是想着补充一下，不给各位留坑。

## 依旧使用 algolia

> 推荐这样做，也不需要继续使用我们的 ci 资源了。

大家可以看到，chodocs 目前已经使用了最新的版本，但 `Algolia` 依旧还是生效的。

这已经不是用的上一篇文章的 ci 自动爬取数据了，而是基于官方的（也是上文图中最后一段所说）`DocSearch` 来爬取数据，申请地址如下：

[docsearch 申请地址](https://docsearch.algolia.com/apply/)

> 如果表单提交不成功，需要使用科学上网。

这里有几点需要注意：

- 您必须是该网站的所有者，或至少有更新其内容的权限
- 你的网站必须是公开的
- 你的网站必须是一个开源项目或技术博客的技术文档，不授权于商业内容
- 你的网站必须到生产环境

> from [who-can-apply](https://docsearch.algolia.com/docs/who-can-apply)

其实一般是 GitHub 上的开源项目都会申请通过的，我是大概等了 2 天样子，会收到如下类似的邮件回复，根据 key 和 id 来替换过去旧的即可。

<CloudinaryImg publicId='program/algolia-email_rv2mu6' alt='algolia-email'/>

## 社区方案

一位小伙伴贡献了文档，详情见[「使用 flexsearch 支持本地搜索」](/program/vitepress-local-search/)
