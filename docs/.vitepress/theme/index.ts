import { inBrowser } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme";
import { setSymbolStyle, replaceSymbol } from './plugins/symbol'
import { siteIds, registerAnalytics, trackPageview } from './plugins/baidutongji'
import ChoLayout from "./components/ChoLayout.vue";
import "./styles/main.css";
import "./styles/utils.css";
import "./styles/vars.css";

const theme: Theme = {
  ...DefaultTheme,
  Layout: ChoLayout,
  enhanceApp({ router }) {
    if (inBrowser) {
      setSymbolStyle();
      registerAnalytics(siteIds);

      window.addEventListener('hashchange', () => {
        const { href: url } = window.location;
        trackPageview(siteIds, url);
      })

      router.onAfterRouteChanged = (to) => {
        replaceSymbol()
        trackPageview(siteIds, to);
      }
    }
  },
};

export default theme;
