---
author: "Choi Yang"
date: 2023-04-06
---

# 给你的 Next.js 项目优雅地添加 sitemap

## 好用的库 next-sitemap

关于 next.js 生成 sitemap 有一个比较好用的库，名字叫做 `next-sitemap`，他的描述信息如下：

> Sitemap generator for next.js. Generate sitemap(s) and robots.txt for all static/pre-rendered/dynamic/server-side pages.

这可以让我们在项目中生成 sitemap 文件，让搜索引擎更好地爬取我们的网站，从而提高网站的 SEO。

基础的安装教程大家可以参考 [next-sitemap](https://www.npmjs.com/package/next-sitemap) 的官方文档，这里就不再赘述了。

## 开箱使用

不过我看了一些开源项目，比如之前我一直在用的 next.js 启动模版，[🔋 Next.js + Tailwind CSS + TypeScript starter and boilerplate packed with useful development features](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter)

来看项目源码查看对应的 `next-sitemap.config.js` 文件，发现他们的配置文件是这样的：

```js
/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://chodocs.cn',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
```

这时候通过 `build` 之后你会发现生成的 `sitemap` 文件是这样的：

![默认情况生成的 sitemap 文件](https://chodocs-1301295644.cos.accelerate.myqcloud.com/img/20230405214926.png)

一般情况我们可能不需要那个 `sitemap-0.xml` 文件，然而生成的文件都放在了 `sitemap-0` 里面去了，而不是默认的 `sitemap.xml`。

> 这里就以我之前用 Next.js 开发的一个博客项目为例看看吧。

![](https://chodocs-1301295644.cos.accelerate.myqcloud.com/img/202304061412792.png)

在国内一些站点收录这块最好还是直接提供 `sitemap.xml` 文件，因此本篇就来介绍一下如何优雅地给 Next.js 项目添加 `sitemap`，并且还能拓展同域名下但是不同项目里的 `sitemap`。

## 修改配置取消生成 sitemap-0.xml

```js 9
/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  /** Without additional '/' on the end */
  siteUrl: 'https://blog.yangchaoyi.vip',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
```

这里我们只需要在配置文件里面添加 `generateIndexSitemap: false` 就可以了，这样就不会生成 `sitemap-0.xml` 文件了。

![](https://chodocs-1301295644.cos.accelerate.myqcloud.com/img/202304061420122.png)

具体可查看原文档 [Index sitemaps (Optional)](https://github.com/iamvishnusankar/next-sitemap#index-sitemaps-optional)

> 📣 From next-sitemap v2.x onwards, sitemap.xml will be Index Sitemap. It will contain urls of all other generated sitemap endpoints.

> Index sitemap generation can be turned off by setting generateIndexSitemap: false in next-sitemap config file. (This is useful for small/hobby sites which does not require an index sitemap) (Example: no-index-sitemaps)


## 如何拓展同域名下不同项目的 sitemap

这个需求不知道是否你也会有，我来给大家举个例子，比如 [coding.net](https://coding.net/) 官网，也是使用 Next.js 开发的，但官网内也有挺多子页面，比如洞见博客，以及帮助文档之类的，这些其实并不都是由 Next.js 创建的，但是呢作为官网首页，根路径下的 `sitemap` 内容也需要将子项目中索引包含进去，提交一个地址来收录即可。

`next-sitemap` 也考虑到了这点，具体可以查看 [Additional paths function](https://github.com/iamvishnusankar/next-sitemap#additional-paths-function) 这里，

::: details 查看示例代码

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  additionalPaths: async (config) => {
    const result = []

    // required value only
    result.push({ loc: '/additional-page-1' })

    // all possible values
    result.push({
      loc: '/additional-page-2',
      changefreq: 'yearly',
      priority: 0.7,
      lastmod: new Date().toISOString(),

      // acts only on '/additional-page-2'
      alternateRefs: [
        {
          href: 'https://es.example.com',
          hreflang: 'es',
        },
        {
          href: 'https://fr.example.com',
          hreflang: 'fr',
        },
      ],
    })

    // using transformation from the current configuration
    result.push(await config.transform(config, '/additional-page-3'))

    return result
  },
}
```

:::

通过 `additionalPaths` 这个配置项，我们可以在 `next-sitemap` 生成 `sitemap` 的时候添加一些额外的路径，这样也算是达到了拓展的效果，不过类似文档类项目，我们难道还要自己手动一个个添加吗？

那可是有好几百篇呢，因此我们可以在文档类项目单独给他生成一个 `sitemap.xml` 文件，然后主站的 `sitemap` 去读取就好了。

比如 coding 的[帮助文档](https://coding.net/help/docs/start/register-invite.html)，还是有 500 篇左右的文章，手动肯定是很麻烦的，那么对于这个文档类网站，我们根据文档框架也生成了 `sitemap.xml` 文件，地址如下：

> https://coding.net/help/docs/sitemap.xml

我们接下来就是读取这些内容，然后让我们在 build 阶段合并到我们的主站里去。

## 读取子项目的 sitemap.xml 文件

我们这里使用的库名叫做 [node-fetch](https://www.npmjs.com/package/node-fetch)，然而对于 `next-sitemap.config.js` 文件是跑在 `node` 这端的，并且不能使用 `esm` 规范，`node-fetch` 为我们也提供了 `CommonJS` 规范的，

```bash
npm install node-fetch@2
```

然后我们在 `next-sitemap.config.js` 文件里面引入 `node-fetch`，并且使用 `async/await` 的方式去读取 `sitemap.xml` 文件，最后返回给 `next-sitemap`。

示例代码如下：

```js
/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
const fetch = require('node-fetch')

module.exports = {
  siteUrl: 'https://blog.yangchaoyi.vip',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalPaths: async (config) => {
    const result = []
    // 帮助文档 url 集合
    const helpDocsMapUrl = await fetch(
      'https://coding.net/help/docs/sitemap.xml'
    )
      .then(response => response.text())
      .then(str => str.match(/<loc>(.*?)<\/loc>/g))
      .then(matches => matches.map(match => match.replace(/<\/?loc>/g, '')))
      .then(urls => Promise.resolve(urls))
    helpDocsMapUrl?.map(u =>
      result.push({
        loc: u,
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    )
    result.push(await config.transform(config))
    return result
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
```

此时当我们再次 `build` 时，就会生成全部内容了，如下图所示，文档内容还是挺多的，手动添加人都想哭了。

![](https://chodocs-1301295644.cos.accelerate.myqcloud.com/img/202304061506602.png)

## 结语

本篇就到此结束了，其实后面的是否同域名也许不重要，不过最好还是添加同域名下的索引吧，至于具体有啥影响读者也可以了解一下相关 SEO 的策略，欢迎反馈。

`next-sitemap` 这个库一开始是为大型索引而配置的，所以对于我们索引数都还没破万的，还是需要自己配置一下，如若发现本文有不足的地方，欢迎提 PR 或者 Issue。

## 相关链接

- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [next-sitemap](https://www.npmjs.com/package/next-sitemap)

> 学如逆水行舟，不进则退。