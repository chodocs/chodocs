export default {
  "/": [
    {
      text: "开始阅读",
      collapsible: false,
      collapsed: false,
      items: [
        { text: "阅读须知", link: "/guide" },
        { text: "Arc 激活码获取", link: "/arc" },
        { text: "2022 年终总结", link: "/2022" },
      ],
    },
    {
      text: "📓 前端算法 JS",
      collapsible: true,
      collapsed: false,
      items: [{ text: "导读", link: "/algorithm/guide/" }],
    },
    {
      text: "📔 前端设计模式",
      collapsible: true,
      collapsed: false,
      items: [
        { text: "导读", link: "/patterns/guide/" },
        { text: "单例模式", link: "/patterns/singleton-pattern/" },
        { text: "代理模式", link: "/patterns/proxy-pattern/" }
      ],
    },
    {
      text: "📘 TS 学习",
      collapsible: true,
      collapsed: false,
      items: [
        { text: "导读", link: "/ts/ch" },
        { text: "环境配置", link: "/ts/ch0" },
        { text: "基础操作", link: "/ts/ch1" },
        { text: "工具类", link: "/ts/ch2" },
        { text: "函数系统", link: "/ts/ch3" },
        { text: "泛型", link: "/ts/ch4" },
      ],
    },
    {
      text: "📗 编程学习",
      collapsible: true,
      collapsed: false,
      items: [
        { text: "发布 npm 包", link: "/program/ch0" },
        { text: "给 VitePress 添加 algolia 搜索", link: "/program/ch1" }
      ],
    },
    {
      text: "📝 备忘录",
      collapsible: true,
      collapsed: false,
      items: [{ text: "Git 命令", link: "/memo/ch0" }],
    },
  ],
  '/green/': [
    {
      text: "🎈ACM 经历",
      collapsible: true,
      collapsed: false,
      items: [
        { text: "阅读须知", link: "/green/ch" },
        { text: "2019年 第二届信息科学与工程学院院赛-正式赛(赛后感想)", link: "/green/ch1" },
        { text: "2019年 第二届信息科学与工程学院院赛-正式赛(赛后补题)", link: "/green/ch2" },
        { text: "第四届全国中医药院校大学生程序设计竞赛（上篇）", link: "/green/ch3" },
        { text: "第四届全国中医药院校大学生程序设计竞赛（下篇）", link: "/green/ch4" },
      ],
    },
  ],
  '/tool/': [
    {
      text: "🎒 常用",
      collapsible: true,
      collapsed: false,
      items: [
        { text: "emoji-list", link: "/tool/emoji-list" },
      ],
    },
  ],
  '/essay/': [
    {
      items: [
        { text: "聊聊近况，差点账号被永久封禁...", link: "/essay/ch1" },
        { text: '2022年总结-内耗和放弃内耗的一年', link: "/essay/hl1" }
      ],
    },
  ],
  '/interview/': [
    {
      items: [
        { text: '介绍', link: "/interview/" }
      ],
    },
    {
      text: "React",
      collapsible: true,
      collapsed: false,
      items: [
        { text: "模拟面试", link: "/interview/react-summary/" },
      ],
    }
  ]
};
