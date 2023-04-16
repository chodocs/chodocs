import { inBrowser, useRoute } from 'vitepress'
import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch } from 'vue'
import busuanzi from 'busuanzi.pure.js'
import mediumZoom from 'medium-zoom'
import { registerAnalytics, siteIds, trackPageview } from './plugins/baidutongji'
import googleAnalytics from './plugins/googleAnalytics'
import './styles/main.css'
import './styles/global.css'
import './styles/demo.css'
import './styles/utils.css'
import './styles/vars.css'
import 'uno.css'

if (inBrowser)
  import('./plugins/pwa')

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ router }: EnhanceAppContext) {
    googleAnalytics({
      id: 'G-0F3DLK5BSG',
    })
    if (inBrowser) {
      registerAnalytics(siteIds)

      window.addEventListener('hashchange', () => {
        const { href: url } = window.location
        trackPageview(siteIds, url)
      })

      router.onAfterRouteChanged = (to) => {
        trackPageview(siteIds, to)
        busuanzi.fetch()
      }
    }
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) // Should there be a new?
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    )
  },
}

export default theme
