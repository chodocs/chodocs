export default function sidebarInterview() {
  return [
    {
      items: [{ text: '介绍', link: '/interview/' }],
    },
    {
      text: '模拟面试',
      collapsed: false,
      items: [
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
