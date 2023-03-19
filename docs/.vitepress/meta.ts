import { version } from '../../package.json'

// base info
export const name = 'ChoDocs'
export const site = 'https://chodocs.cn/'
export const logo = 'https://chodocs.cn/chodocs-logo.svg'
export const keywords = '前端专栏、学习路线、面试手册、知识体系、前端面试、前端算法、编程学习、bilibili、vitepress、随笔、资源导航、知识星球、chodocs、React、Vue、Next.js、思维导图、coding、github'
export const description = '一站式前端内容网站，包括学习路线、知识体系，海量前端面试问题解答，一站式阅读体验，跟随前沿技术，深度和广度学习，React 与 Vue 生态。'

// social link
export const bilibili = 'https://space.bilibili.com/351534170'
export const github = 'https://github.com/chodocs/chodocs'

// docs version
export const docsVersion = version

/* PWA runtime caching urlPattern regular expressions */
/* eslint-disable prefer-regex-literals */
export const githubSourceContentRegex = new RegExp('^https://(((raw|user-images|camo).githubusercontent.com))/.*', 'i')
export const googleFontRegex = new RegExp('^https://fonts.googleapis.com/.*', 'i')
export const googleStaticFontRegex = new RegExp('^https://fonts.gstatic.com/.*', 'i')
export const jsdelivrCDNRegex = new RegExp('^https://cdn.jsdelivr.net/.*', 'i')
