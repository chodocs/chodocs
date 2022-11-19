import DefaultTheme from "vitepress/theme";
import Info from "../components/Info.vue";
import List from "../components/List.vue";
import "./styles/main.css";
import "./styles/utils.css";
import "./styles/vars.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Info", Info);
    app.component("List", List);
  },
};
