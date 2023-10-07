import autoSidebar from './theme/plugins/autoSidebarBeta'

export default {
  '/': [
    {
      text: '开始阅读',
      collapsed: false,
      items: [
        { text: '阅读须知', link: '/guide' },
        { text: '学习圈子', link: '/zsxq' },
        {
          text: '23 年每周学习动态',
          items: [
            {
              text: '内容介绍',
              link: '/weekly/guide',
            },
            {
              text: '3 月',
              link: '/weekly/202303',
            },
            {
              text: '4 月',
              link: '/weekly/202304',
            },
            {
              text: '5 月',
              link: '/weekly/202305',
            },
            {
              text: '6 月',
              link: '/weekly/202306',
            },
            {
              text: '7 月',
              link: '/weekly/202307',
            },
            {
              text: '8 月',
              link: '/weekly/202308',
            },
            {
              text: '9 月',
              link: '/weekly/202309',
            },
            {
              text: '10 月',
              link: '/weekly/202310',
            },
          ],
        },
        { text: '资源导航', link: '/favorites' },
        { text: '编程学习', link: '/program/' },
        { text: 'Arc 激活码获取', link: '/arc' },
        { text: '2022 年终总结', link: '/2022' },
        { text: '关于 ChoDocs', link: '/chodocs' },
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

function sidebarPartterns() {
  return [
    {
      text: '📔 前端设计模式',
      collapsed: false,
      items: [
        { text: '导读', link: '/patterns/guide/' },
        { text: '单例模式', link: '/patterns/singleton-pattern/' },
        { text: '代理模式', link: '/patterns/proxy-pattern/' },
        { text: '提供者模式', link: '/patterns/provider-pattern/' },
        { text: '原型模式', link: '/patterns/prototype-pattern/' },
        {
          text: '容器/演示模式',
          link: '/patterns/container-presentational-pattern/',
        },
        { text: '观察者模式', link: '/patterns/observer-pattern/' },
        { text: '模块模式', link: '/patterns/module-pattern/' },
        { text: '混合模式', link: '/patterns/mixin-pattern/' },
        { text: '中介/中间件模式', link: '/patterns/middleware-pattern/' },
        { text: '高阶组件模式', link: '/patterns/hoc-pattern/' },
      ],
    },
  ]
}

function sidebarProgram() {
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

function sidebarInterview() {
  return [
    {
      items: [{ text: '介绍', link: '/interview/' }],
    },
    {
      text: '模拟面试',
      collapsed: false,
      items: [
        { text: '介绍', link: '/interview/interviewer/' },
        { text: '模拟面试 01', link: '/interview/interviewer/01' },
        { text: '模拟面试 02', link: '/interview/interviewer/02' },
        { text: '模拟面试 03', link: '/interview/interviewer/03' },
      ],
    },
    {
      text: '春招实习',
      collapsed: false,
      items: [
        {
          text: '询问面试官的问题',
          link: '/interview/spring-internship/interviewer/',
        },
        {
          text: '腾讯一面',
          link: '/interview/spring-internship/tencent-imweb/',
        },
        {
          text: '字节一面准备',
          link: '/interview/spring-internship/bytedance-preparation/',
        },
        { text: '字节一面', link: '/interview/spring-internship/bytedance1/' },
        {
          text: '深信服-星耀实习',
          link: '/interview/spring-internship/sangfor/',
        },
        { text: '恒生电子面试', link: '/interview/spring-internship/hundsun/' },
        {
          text: '腾讯云 COS 一面',
          link: '/interview/spring-internship/tencent-cos/',
        },
        { text: '春招知识整理', link: '/interview/spring-internship/summary/' },
      ],
    },
    {
      text: '2023 面试合集',
      collapsed: false,
      items: [{ text: 'isolcat 三月实习', link: '/interview/isolcat/' },
        { text: 'HearLing 六月社招', link: '/interview/2023/hearling' }],
    },
    {
      text: 'React',
      collapsed: false,
      items: [{ text: '模拟面试', link: '/interview/react-summary/' }],
    },
    {
      text: 'Vue',
      collapsed: false,
      items: [{ text: '模拟面试', link: '/interview/vue/' }],
    },
    {
      text: '前端基础：js/html/css/ts',
      collapsed: false,
      items: [
        { text: 'JS 面试大全', link: '/interview/js/' },
        { text: 'JS 自测清单（一）', link: '/interview/js/test/1.md' },
        { text: 'JS 自测清单（二）', link: '/interview/js/test/2.md' },
        { text: 'JS 自测清单（三）', link: '/interview/js/test/3.md' },
        { text: 'CSS 面试', link: '/interview/js/css' },
        { text: 'HTML 面试', link: '/interview/js/html' },
        { text: 'TS 面试', link: '/interview/js/ts' },
      ],
    },
    {
      text: '操作系统/网络/浏览器',
      collapsed: false,
      items: [
        { text: '操作系统', link: '/interview/system/' },
        { text: '网络-TCP', link: '/interview/net/tcp/' },
        { text: '网络-HTTP', link: '/interview/net/http/' },
        { text: '网络-Websocket', link: '/interview/net/websocket/' },
        { text: '网络-跨域问题', link: '/interview/net/cors/' },
        {
          text: '浏览器-Session/Cookie/Token',
          link: '/interview/browser/cookie',
        },
        {
          text: '浏览器-事件循环',
          link: '/interview/browser/principle/eventLoop',
        },
        {
          text: '浏览器-输入URL到页面展示发生了什么',
          link: '/interview/browser/process/',
        },
        { text: '浏览器-缓存', link: '/interview/browser/cache' },
        { text: '浏览器-开发者工具', link: '/interview/browser/performance' },
        { text: '浏览器-安全', link: '/interview/browser/safety/' },
      ],
    },
  ]
}

function sidebarAlgorithm() {
  return [
    {
      items: [
        { text: '📓 导读', link: '/algorithm/guide/' },
        { text: '数据结构', link: '/algorithm/guide/classic1' },
      ],
    },
    {
      text: 'Hash Table 哈希表',
      collapsed: false,
      items: [
        { text: '介绍', link: '/algorithm/hash-table/' },
        { text: '1. 两数之和', link: '/algorithm/hash-table/1' },
        {
          text: '3. 无重复字符的最长子串',
          link: '/algorithm/hash-table/3',
        },
        {
          text: '136. 只出现一次的数字',
          link: '/algorithm/hash-table/136',
        },
        {
          text: '349. 两个数组的交集',
          link: '/algorithm/hash-table/349',
        },
        {
          text: '560. 和为 K 的子数组',
          link: '/algorithm/hash-table/560',
        },
      ],
    },
    {
      text: 'Stack 栈',
      collapsed: false,
      items: [
        { text: '20. 有效的括号', link: '/algorithm/stack/20' },
        { text: '739. 每日温度', link: '/algorithm/stack/739' },
        {
          text: '901. 股票价格跨度',
          link: '/algorithm/stack/901',
        },
        {
          text: '907. 子数组的最小值之和',
          link: '/algorithm/stack/907',
        },
        {
          text: '921. 使括号有效的最少添加',
          link: '/algorithm/stack/921',
        },
        { text: '946. 验证栈序列', link: '/algorithm/stack/946' },
        {
          text: '1190. 反转每对括号间的子串',
          link: '/algorithm/stack/1190',
        },
        {
          text: '1249. 移除无效的括号',
          link: '/algorithm/stack/1249',
        },
      ],
    },
    {
      text: 'Queue 队列',
      collapsed: false,
      items: [
        {
          text: '933. 最近的请求次数',
          link: '/algorithm/queue/933',
        },
      ],
    },
    {
      text: 'Backtracking 递归与回溯',
      collapsed: false,
      items: [
        {
          text: '08.08. 有重复字符串的排列组合',
          link: '/algorithm/recursion-backtracking/08.08',
        },
        {
          text: '16.11. 跳水板',
          link: '/algorithm/recursion-backtracking/16.11',
        },
        {
          text: '17. 电话号码的字母组合',
          link: '/algorithm/recursion-backtracking/17',
        },
        {
          text: '22. 括号生成',
          link: '/algorithm/recursion-backtracking/22',
        },
        {
          text: '37. 解数独',
          link: '/algorithm/recursion-backtracking/37',
        },
        {
          text: '39. 组合总和',
          link: '/algorithm/recursion-backtracking/39',
        },
        {
          text: '40. 组合总和 II',
          link: '/algorithm/recursion-backtracking/40',
        },
        {
          text: '46. 全排列',
          link: '/algorithm/recursion-backtracking/46',
        },
        {
          text: '47. 全排列 II',
          link: '/algorithm/recursion-backtracking/47',
        },
        {
          text: '51. N 皇后',
          link: '/algorithm/recursion-backtracking/51',
        },
        {
          text: '54. 螺旋矩阵',
          link: '/algorithm/recursion-backtracking/54',
        },
        {
          text: '59. 螺旋矩阵 II',
          link: '/algorithm/recursion-backtracking/59',
        },
        {
          text: '73. 矩阵置零',
          link: '/algorithm/recursion-backtracking/73',
        },
        { text: '77. 组合', link: '/algorithm/recursion-backtracking/77' },
        { text: '78. 子集', link: '/algorithm/recursion-backtracking/78' },
        {
          text: '79. 单词搜索',
          link: '/algorithm/recursion-backtracking/79',
        },
        {
          text: '90. 子集 II',
          link: '/algorithm/recursion-backtracking/90',
        },
        {
          text: '93. 复原IP地址',
          link: '/algorithm/recursion-backtracking/93',
        },
        {
          text: '131. 分割回文串',
          link: '/algorithm/recursion-backtracking/131',
        },
        {
          text: '212. 单词搜索',
          link: '/algorithm/recursion-backtracking/212',
        },
        {
          text: '216. 组合总和 III',
          link: '/algorithm/recursion-backtracking/216',
        },
        {
          text: '401. 二进制手表',
          link: '/algorithm/recursion-backtracking/401',
        },
        {
          text: '784. 字母大小写全排列',
          link: '/algorithm/recursion-backtracking/784',
        },
        {
          text: '980. 不同路径 III',
          link: '/algorithm/recursion-backtracking/980',
        },
        {
          text: '1219. 黄金矿工',
          link: '/algorithm/recursion-backtracking/1219',
        },
        {
          text: '1291. 顺次数',
          link: '/algorithm/recursion-backtracking/1291',
        },
      ],
    },
    {
      text: 'Tree 二叉树',
      collapsed: false,
      items: [
        { text: '100. 相同的树', link: '/algorithm/binary-tree/100.相同的树' },
        {
          text: '101. 对称二叉树',
          link: '/algorithm/binary-tree/101.对称二叉树',
        },
        {
          text: '102. 二叉树的层序遍历',
          link: '/algorithm/binary-tree/102.二叉树的层序遍历',
        },
        {
          text: '104. 二叉树的最大深度',
          link: '/algorithm/binary-tree/104.二叉树的最大深度',
        },
        {
          text: '108. 将有序数组转换为二叉搜索树',
          link: '/algorithm/binary-tree/108.将有序数组转换为二叉搜索树',
        },
        {
          text: '110. 平衡二叉树',
          link: '/algorithm/binary-tree/110.平衡二叉树',
        },
        {
          text: '111. 二叉树的最小深度',
          link: '/algorithm/binary-tree/111.二叉树的最小深度',
        },
        { text: '112. 路径总和', link: '/algorithm/binary-tree/112.路径总和' },
        {
          text: '113. 路径总和 II',
          link: '/algorithm/binary-tree/113.路径总和 II',
        },
        {
          text: '124. 二叉树中的最大路径和',
          link: '/algorithm/binary-tree/124.二叉树中的最大路径和',
        },
        {
          text: '129. 求根到叶子节点数字之和',
          link: '/algorithm/binary-tree/129.求根到叶子节点数字之和',
        },
        {
          text: '144. 二叉树的前序遍历',
          link: '/algorithm/binary-tree/144.二叉树的前序遍历',
        },
        {
          text: '199. 二叉树的右视图',
          link: '/algorithm/binary-tree/199.二叉树的右视图',
        },
        {
          text: '236. 二叉树的最近公共祖先',
          link: '/algorithm/binary-tree/236.二叉树的最近公共祖先',
        },
        {
          text: '257. 二叉树的所有路径',
          link: '/algorithm/binary-tree/257.二叉树的所有路径',
        },
        {
          text: '404. 左叶子之和',
          link: '/algorithm/binary-tree/404.左叶子之和',
        },
        {
          text: '437. 路径总和 III',
          link: '/algorithm/binary-tree/437.路径总和 III',
        },
        {
          text: '450. 删除二叉搜索树中的节点',
          link: '/algorithm/binary-tree/450.删除二叉搜索树中的节点',
        },
        {
          text: '501. 二叉搜索树中的众数',
          link: '/algorithm/binary-tree/501.二叉搜索树中的众数',
        },
        {
          text: '543. 二叉树的直径',
          link: '/algorithm/binary-tree/543.二叉树的直径',
        },
      ],
    },
    {
      text: 'Linked List 链表',
      collapsed: false,
      items: [
        { text: '2. 两数相加', link: '/algorithm/linked-list/2.两数相加' },
        {
          text: '18. 删除链表的节点',
          link: '/algorithm/linked-list/18.删除链表的节点',
        },
        {
          text: '19. 删除链表的倒数第N个节点',
          link: '/algorithm/linked-list/19.删除链表的倒数第N个节点',
        },
        {
          text: '24. 两两交换链表中的节点',
          link: '/algorithm/linked-list/24.两两交换链表中的节点',
        },
        {
          text: '92. 反转链表 II',
          link: '/algorithm/linked-list/92.反转链表 II',
        },
        {
          text: '142. 环形链表 II',
          link: '/algorithm/linked-list/142.环形链表 II',
        },
        {
          text: '203. 移除链表元素',
          link: '/algorithm/linked-list/203.移除链表元素',
        },
        { text: '206. 反转链表', link: '/algorithm/linked-list/206.反转链表' },
      ],
    },
    {
      text: 'Dynamic Programming 动态规划',
      collapsed: false,
      items: [
        { text: '62. 不同路径', link: '/algorithm/dp/62.不同路径' },
        { text: '63. 不同路径 II', link: '/algorithm/dp/63.不同路径 II' },
        { text: '70. 爬楼梯', link: '/algorithm/dp/70.爬楼梯' },
        {
          text: '121. 买卖股票的最佳时机',
          link: '/algorithm/dp/121.买卖股票的最佳时机',
        },
        {
          text: '122. 买卖股票的最佳时机 II',
          link: '/algorithm/dp/122.买卖股票的最佳时机 II',
        },
        { text: '198. 打家劫舍', link: '/algorithm/dp/198.打家劫舍' },
        { text: '213. 打家劫舍 II', link: '/algorithm/dp/213.打家劫舍 II' },
        { text: '221. 最大正方形', link: '/algorithm/dp/221.最大正方形' },
        { text: '322. 零钱兑换', link: '/algorithm/dp/322.零钱兑换' },
      ],
    },
    {
      text: 'Two Pointers 双指针',
      collapsed: false,
      items: [
        {
          text: '11. 盛最多水的容器',
          link: '/algorithm/double-pointer/11.盛最多水的容器',
        },
        { text: '15. 三数之和', link: '/algorithm/double-pointer/15.三数之和' },
        {
          text: '16. 最接近的三数之和',
          link: '/algorithm/double-pointer/16.最接近的三数之和',
        },
        { text: '42. 接雨水', link: '/algorithm/double-pointer/42.接雨水' },
        { text: '75. 颜色分类', link: '/algorithm/double-pointer/75.颜色分类' },
        {
          text: '209. 长度最小的子数组',
          link: '/algorithm/double-pointer/209.长度最小的子数组',
        },
        {
          text: '344. 反转字符串',
          link: '/algorithm/double-pointer/344.反转字符串',
        },
        {
          text: '763. 划分字母区间',
          link: '/algorithm/double-pointer/763.划分字母区间',
        },
        {
          text: '925. 长按键入',
          link: '/algorithm/double-pointer/925.长按键入',
        },
      ],
    },
  ]
}
