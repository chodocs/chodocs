import DefaultTheme from "vitepress/theme";
import ChoLayout from "./ChoLayout.vue";
import "./styles/main.css";
import "./styles/utils.css";
import "./styles/vars.css";

export default {
  ...DefaultTheme,
  Layout: ChoLayout,
  enhanceApp({ app }) {},
};
