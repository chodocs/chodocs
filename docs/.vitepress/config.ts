import { generateSitemap as sitemap } from 'sitemap-ts'
import sidebar from './sidebar'
import socialLinks from './link'
import algolia from './algolia'

export default {
  outDir: '../dist',
  title: 'ChoDocs',
  description: 'Front-end learning document collection.',
  lastUpdated: true,
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true,
  },
  themeConfig: {
    outline: 'deep',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT Chocolate and ChoDocs contributors',
    },
    nav: [
      { text: '🔥 前端算法', link: '/algorithm/guide/' },
      { text: '🔥 设计模式', link: '/patterns/guide/' },
      { text: '💭 学习圈子', link: '/zsxq' },
      { text: '📋 面试', link: '/interview/' },
      { text: '✨ 计划', link: '/plan/' },
      {
        text: '更多',
        items: [
          { text: '🔧 编程工具', link: '/tool/' },
          { text: '✏️ 随笔', link: '/essay/' },
          { text: '🌱 青葱岁月', link: '/green/ch' },
        ],
      },
      // { text: "🔥 TS 学习", link: "/ts/ch" },
    ],
    editLink: {
      pattern: 'https://github.com/chodocs/chodocs/edit/main/docs/:path',
    },
    algolia,
    sidebar,
    socialLinks,
  },
  async buildEnd() {
    await sitemap({ hostname: 'https://chodocs.cn/' })
  },
}
