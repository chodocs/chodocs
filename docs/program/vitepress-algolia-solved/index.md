---
author: "Richard-Zhang1019"
---

# 给 VitePress 添加 algolia 搜索解决方案（高版本 alpha.37以后）

按照之前的方案在使用alpha.36之前的版本是没问题的，但是由于alpha.37开始支持i18n，原来的方法似乎不奏效了，在控制台network里发现没有返回搜索结果，这好我自己也在做文档搜索相关的内容，就去调研了一下，得到了一个非常简单的解决方案，

### 首先我是去vitepress下提了一个issue

[algolia Search can’t return result · Issue #1935 · vuejs/vitepress](https://github.com/vuejs/vitepress/issues/1935)

很快给我了回复，但是他是认为是我这边的爬虫问题，让我去algolia控制台重启爬虫，这也并没有解决，也就不不了了之了。

隔了几天另一位朋友在我的issue下留言，提供了他的爬虫配置，在爬虫文件里加了些配置，我立马去在我自己的项目里去尝试了下，没想到直接就成功了，立马过来文档里来分享给各位

我自己的vitepress是使用的目前最新的vitepress `1.0.0-alpha.45`，这个方法是没问题的，并且很简单，只需要在爬虫里加一些字段即可

```json
{
  "index_name": "***",
  "start_urls": ["***"],
  "rateLimit": 8,
  "maxDepth": 10,
  "selectors": {
    "lvl0": {
      "selector": "",
      "defaultValue": "Documentation"
    },
    "lvl1": ".content h1",
    "lvl2": ".content h2",
    "lvl3": ".content h3",
    "lvl4": ".content h4",
    "lvl5": ".content h5",
    "content": ".content p, .content li",
    "lang": {
      "selector": "/html/@lang",
      "type": "xpath",
      "global": true
    }
  },
  "selectors_exclude": [
    "aside",
    ".page-footer",
    ".next-and-prev-link",
    ".table-of-contents"
  ],
  "custom_settings": {
    "attributesForFaceting": ["lang", "tags"]
  },
  "js_render": true
}
```

这里是我自己的网站使用的搜索，大家可以去试一下 [lucky-design](https://lucky-design.vercel.app/)
