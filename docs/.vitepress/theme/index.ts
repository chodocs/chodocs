import { inBrowser } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme";
import { siteIds, registerAnalytics, trackPageview } from './plugins/baidutongji'
import "./styles/main.css";
import "./styles/global.css";
import './styles/demo.css';
import "./styles/utils.css";
import "./styles/vars.css";
import 'uno.css';

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ router }) {
    if (inBrowser) {
      registerAnalytics(siteIds);

      window.addEventListener('hashchange', () => {
        const { href: url } = window.location;
        trackPageview(siteIds, url);
      })

      router.onAfterRouteChanged = (to) => {
        trackPageview(siteIds, to);
      }
    }
  },
};

export default theme;
