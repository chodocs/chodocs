export default function sidebarPartterns() {
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
