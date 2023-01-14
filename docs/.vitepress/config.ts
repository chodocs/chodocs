import { generateSitemap as sitemap } from 'sitemap-ts'
import sidebar from "./sidebar";
import socialLinks from "./link";
import algolia from "./algolia";


export default {
  outDir: '../dist',
  title: "ChoDocs",
  description: "Front-end learning document collection.",
  lastUpdated: true,
  markdown: {
    theme: "material-palenight",
    lineNumbers: true,
  },
  themeConfig: {
    outline: 'deep',
    recommend: {
      mpwx: "https://img-blog.csdnimg.cn/img_convert/43c196751f4984c71011557d06e7e9b6.png",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-PRESENT Chocolate and ChoDocs contributors",
    },
    nav: [
      // { text: "🔥 前端算法", link: "/algorithm/ch" },
      { text: "🔥 设计模式", link: "/patterns/guide/" },
      { text: "🔥 TS 学习", link: "/ts/ch" },
      { text: "🔧 编程工具", link: "/tool/" },
      { text: "✏️ 随笔", link: "/essay/" },
      { text: "🌱 青葱岁月", link: "/green/ch" },
      { text: "📋 面试", link: "/interview/" },
    ],
    editLink: {
      pattern: "https://github.com/Chocolate1999/chodocs/edit/main/docs/:path",
    },
    algolia,
    sidebar,
    socialLinks,
  },
  async buildEnd() {
    await sitemap({ hostname: 'https://chodocs.cn/' });
  }
}
