import { inBrowser } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme";
import { setSymbolStyle, replaceSymbol } from './plugins/symbol'
import ChoLayout from "./components/ChoLayout.vue";
import "./styles/main.css";
import "./styles/utils.css";
import "./styles/vars.css";

const theme: Theme = {
  ...DefaultTheme,
  Layout: ChoLayout,
  enhanceApp({ router }) {
    if (inBrowser) {
      setSymbolStyle()
      router.onAfterRouteChanged = () => {
        replaceSymbol()
      }
    }
  },
};

export default theme;
