import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import sidebar from "./sidebar";
import socialLinks from "./link";
import algolia from "./algolia";

const links = []

export default {
  title: "ChoDocs",
  description: "Front-end learning document collection.",
  lastUpdated: true,
  markdown: {
    theme: "material-palenight",
    lineNumbers: true,
  },
  themeConfig: {
    recommend: {
      mpwx: "https://img-blog.csdnimg.cn/img_convert/43c196751f4984c71011557d06e7e9b6.png",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-PRESENT Chocolate and ChoDocs contributors",
    },
    nav: [
      { text: "🔥 前端算法", link: "/algorithm/ch" },
      { text: "🔥 TS 学习", link: "/ts/ch" },
      { text: "🔧 编程工具", link: "/tool/" },
      { text: "🌱 青葱岁月", link: "/green/ch" },
    ],
    editLink: {
      pattern: "https://github.com/Chocolate1999/chodocs/edit/main/docs/:path",
    },
    algolia,
    sidebar,
    socialLinks,
  },
  vite: {
    buildEnd: async ({ outDir }) => {
      const sitemap = new SitemapStream({
        hostname: 'https://chodocs.cn/'
      })
      const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
      sitemap.pipe(writeStream)
      links.forEach((link) => sitemap.write(link))
      sitemap.end()
      console.log('links', links);
      await new Promise((r) => writeStream.on('finish', r))
    },
  },
};
