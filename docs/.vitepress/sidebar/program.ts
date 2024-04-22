export default function sidebarProgram() {
  return [
    {
      text: '💻 编程学习',
      items: [
        { text: '介绍', link: '/program/' },
        {
          text: '编程实战',
          items: [
            { text: '发布 npm 包', link: '/program/npm-package/' },
            { text: 'tRPC 基础篇', link: '/program/trpc/' },
          ],
        },
        {
          text: 'VitePress 配置',
          items: [
            {
              text: '给 VitePress 添加 algolia 搜索',
              link: '/program/vitepress-algolia/',
            },
            {
              text: '接上 algolia 搜索（补充）',
              link: '/program/vitepress-algolia-plus/',
            },
            {
              text: '接上 algolia 搜索（解决）',
              link: '/program/vitepress-algolia-solved/',
            },
            {
              text: '给 VitePress 添加本地搜索功能',
              link: '/program/vitepress-local-search/',
            },
            {
              text: 'VitePress 插件合集（beta）',
              link: '/program/vitepress-plugin/',
            },
          ],
        },
      ],
    },
  ]
}
