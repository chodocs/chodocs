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
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/Chocolate1999.png',
    name: 'Chocolate',
    title: '管理者',
    links: [
      { icon: 'github', link: 'https://github.com/Chocolate1999' },
      { icon: 'twitter', link: 'https://twitter.com/ycyChocolate' },
      {
    icon: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="20" height="20"  viewBox="0 0 512 512" >
    <path fill="currentColor" d="M488.6 104.1c16.7 18.1 24.4 39.7 23.3 65.7v202.4c-.4 26.4-9.2 48.1-26.5 65.1c-17.2 17-39.1 25.9-65.5 26.7H92.02c-26.45-.8-48.21-9.8-65.28-27.2C9.682 419.4.767 396.5 0 368.2V169.8c.767-26 9.682-47.6 26.74-65.7C43.81 87.75 65.57 78.77 92.02 78h29.38L96.05 52.19c-5.75-5.73-8.63-13-8.63-21.79c0-8.8 2.88-16.06 8.63-21.797C101.8 2.868 109.1 0 117.9 0s16.1 2.868 21.9 8.603L213.1 78h88l74.5-69.397C381.7 2.868 389.2 0 398 0c8.8 0 16.1 2.868 21.9 8.603c5.7 5.737 8.6 12.997 8.6 21.797c0 8.79-2.9 16.06-8.6 21.79L394.6 78h29.3c26.4.77 48 9.75 64.7 26.1zm-38.8 69.7c-.4-9.6-3.7-17.4-10.7-23.5c-5.2-6.1-14-9.4-22.7-9.8H96.05c-9.59.4-17.45 3.7-23.58 9.8c-6.14 6.1-9.4 13.9-9.78 23.5v194.4c0 9.2 3.26 17 9.78 23.5s14.38 9.8 23.58 9.8H416.4c9.2 0 17-3.3 23.3-9.8c6.3-6.5 9.7-14.3 10.1-23.5V173.8zm-264.3 42.7c6.3 6.3 9.7 14.1 10.1 23.2V273c-.4 9.2-3.7 16.9-9.8 23.2c-6.2 6.3-14 9.5-23.6 9.5c-9.6 0-17.5-3.2-23.6-9.5c-6.1-6.3-9.4-14-9.8-23.2v-33.3c.4-9.1 3.8-16.9 10.1-23.2c6.3-6.3 13.2-9.6 23.3-10c9.2.4 17 3.7 23.3 10zm191.5 0c6.3 6.3 9.7 14.1 10.1 23.2V273c-.4 9.2-3.7 16.9-9.8 23.2c-6.1 6.3-14 9.5-23.6 9.5c-9.6 0-17.4-3.2-23.6-9.5c-7-6.3-9.4-14-9.7-23.2v-33.3c.3-9.1 3.7-16.9 10-23.2c6.3-6.3 14.1-9.6 23.3-10c9.2.4 17 3.7 23.3 10z"></path>
  </svg>`,
    },
    link: "https://space.bilibili.com/351534170",
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
