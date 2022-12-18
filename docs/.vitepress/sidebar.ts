export default {
  "/": [
    {
      text: "开始阅读",
      collapsible: false,
      collapsed: false,
      items: [
        { text: "阅读须知", link: "/guide" },
        { text: "2022 年终总结", link: "/2022" },
      ],
    },
    {
      text: "📓 前端算法 JS",
      collapsible: true,
      collapsed: false,
      items: [{ text: "导读", link: "/algorithm/ch" }],
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
};
