---
layout: home
hero:
  name: ChoDocs
  text: Front-end learning document collection
  tagline: "一站式前端内容网站，包括学习路线、知识体系"
  image:
    src: /it.svg
    alt: ChoDocs
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide
    - theme: alt
      text: 学习圈子
      link: /zsxq
    - theme: alt
      text: 模拟面试
      link: /interview/interviewer/
    - theme: alt
      text: 关于我
      link: https://github.com/Chocolate1999
features:
  - icon: 📋
    title: 面试专栏
    details: 海量前端面试问题解答，一站式阅读体验。
  - icon: 💬
    title: 编程学习
    details: 同步 B 站视频，文档用于巩固知识。
  - icon: 📓
    title: 前端算法
    details: 不再畏惧面试算法，提供刷题路线。
  - icon: 🚚
    title: 备忘录
    details: 将日常工作中遇到的问题做一份备忘录，方便查阅。
  - icon: 💭
    title: 学习圈子
    details: 打造专业的前端技术氛围社群，低调务实。
  - icon: 🔧
    title: 编程工具
    details: 归纳一些编程相关工具与网站，提高效率。
  - icon: 🌱
    title: 青葱岁月
    details: 程序人生时光机，记录所有美好的时光。
  - icon: 🎉
    title: 技术视野
    details: 跟随前沿技术，深度和广度学习。
  - icon: 🚩
    title: 拥抱开源
    details: 文档开源，版权 ChoDocs 所有，禁商业行为。
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';
import { icons } from './socialIcons';

const members = [
  {
    avatar: 'https://www.github.com/Chocolate1999.png',
    name: 'Choi Yang',
    title: 'open source developer, creator of ChoDocs.',
    links: [
      { icon: 'github', link: 'https://github.com/Chocolate1999' },
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
  {
    avatar: 'https://www.github.com/fxzer.png',
    name: 'fxzer',
    title: 'Open Source Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/fxzer' },
      {
       icon: { svg: icons.bilibili } ,link: "https://space.bilibili.com/228134791",
      },
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
