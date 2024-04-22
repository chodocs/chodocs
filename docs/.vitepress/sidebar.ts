import { exeryWeek, sidebarAlgorithm, sidebarInterview, sidebarPartterns, sidebarProgram } from './sidebar/index'
import autoSidebar from './theme/plugins/autoSidebarBeta'

export default {
  '/': [
    {
      text: '开始阅读',
      collapsed: false,
      items: [
        { text: '阅读须知', link: '/guide' },
        {
          text: '24 年每周学习动态',
          link: '/weekly/2024',
        },
        {
          text: '23 年每周学习动态',
          link: '/weekly/guide',
        },
        { text: '资源导航', link: '/favorites' },
        { text: '编程学习', link: '/program/' },
        {
          text: '年终总结',
          items: [
            { text: '2022 年终总结', link: '/2022' },
          ],
        },
        { text: '参与贡献指南', link: '/contributing' },
      ],
    },
    {
      text: '🍎 Next.js 实战',
      collapsed: false,
      items: [
        { text: '添加 sitemap', link: '/nextjs/sitemap/' },
      ],
    },
    {
      text: '🍏 Vue.js 实战',
      collapsed: false,
      items: [
        { text: '基于 Vue3 后台管理系统', link: '/vuejs/vue3-management-system/' },
      ],
    },
    {
      text: '📘 TS 学习',
      collapsed: false,
      items: [
        { text: '导读', link: '/ts/ch' },
        { text: '环境配置', link: '/ts/ch0' },
        { text: '基础操作', link: '/ts/ch1' },
        { text: '工具类', link: '/ts/ch2' },
        { text: '函数系统', link: '/ts/ch3' },
        { text: '泛型', link: '/ts/ch4' },
      ],
    },
    {
      text: '📝 备忘录',
      collapsed: false,
      items: [{ text: 'Git 命令', link: '/memo/git-command/' }],
    },
  ],
  '/weekly/': exeryWeek(),
  '/program/': sidebarProgram(),
  '/patterns/': sidebarPartterns(),
  '/algorithm/': sidebarAlgorithm(),
  '/green/': [
    {
      text: '🎈 ACM 经历',
      collapsed: false,
      items: [
        { text: '阅读须知', link: '/green/ch' },
        {
          text: '2019年 第二届信息科学与工程学院院赛-正式赛(赛后感想)',
          link: '/green/ch1',
        },
        {
          text: '2019年 第二届信息科学与工程学院院赛-正式赛(赛后补题)',
          link: '/green/ch2',
        },
        {
          text: '第四届全国中医药院校大学生程序设计竞赛（上篇）',
          link: '/green/ch3',
        },
        {
          text: '第四届全国中医药院校大学生程序设计竞赛（下篇）',
          link: '/green/ch4',
        },
      ],
    },
    {
      text: '💭 项目经历',
      collapsed: false,
      items: [
        {
          text: '🏆 从大一到大三，我与服务外包大赛',
          link: '/green/hl-contest/',
        },
      ],
    },
  ],
  '/tool/': [
    {
      text: '🎒 常用',
      collapsed: false,
      items: [
        { text: 'emoji-list', link: '/tool/emoji-list' },
        { text: 'finalcut 剪辑快捷键', link: '/tool/finalcut/' },
        { text: '什么时候下班？', link: '/tool/off-time/' },
        { text: '如何正常访问 GitHub？', link: '/tool/github520' },
        { text: '版本管理，Git 基础', link: '/tool/git/' },
      ],
    },
  ],
  '/essay/': autoSidebar({ base: 'essay' }),
  '/interview/': sidebarInterview(),
}
