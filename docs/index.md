---
layout: home
hero:
  name: ChoDocs
  text: Front-end learning document collection
  tagline: "座右铭: 学如逆水行舟，不进则退。"
  image:
    src: /it.svg
    alt: ChoDocs
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide
    - theme: alt
      text: 程序人生
      link: /green/ch
    - theme: alt
      text: 关于我
      link: https://github.com/Chocolate1999
features:
  - icon: 📓
    title: 前端算法
    details: 预计 2023 年正式启动刷题...
  - icon: 💬
    title: 编程学习
    details: 同步 B 站视频，文档用于巩固知识。
  - icon: 🚩
    title: TS 深度学习（创作中）
    details: 从初出茅庐到掌握各种类型编程，保障代码质量。
  - icon: 🚚
    title: 备忘录
    details: 将日常工作中遇到的问题做一份备忘录，方便查阅。
  - icon: 🔧
    title: 编程工具
    details: 归纳一些编程相关工具与网站，提高效率。
  - icon: 🌱
    title: 青葱岁月
    details: 程序人生时光机，记录所有美好的时光。
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';
import { icons } from './public/socialIcons';

const members = [
  {
    avatar: 'https://www.github.com/Chocolate1999.png',
    name: 'Choi Yang',
    title: 'open source developer, creator of ChoDocs.',
    links: [
      { icon: 'github', link: 'https://github.com/Chocolate1999' },
      { icon: 'twitter', link: 'https://twitter.com/ycyChocolate' },
      {
       icon: { svg: icons.bilibili } ,link: "https://space.bilibili.com/351534170",
      },
    ]
  },
  {
    avatar: 'https://www.github.com/HearLing.png',
    name: 'HearLing',
    title: 'Open Source Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/HearLing' },
      {
       icon: { svg: icons.bilibili } ,link: "https://space.bilibili.com/201738571",
      },
    ]
  },
  {
    avatar: 'https://www.github.com/holazz.png',
    name: 'holazz',
    title: '@element-plus',
    links: [
      { icon: 'github', link: 'https://github.com/holazz' },
      { icon: 'twitter', link: 'https://twitter.com/holazz1208' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      感谢以下所有人的贡献与参与
    </template>
    <template #lead>
      以下排名不分先后（参与或主动提 PR 申请加入）
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
