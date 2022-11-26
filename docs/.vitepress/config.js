import sidebar from "./sidebar";

export default {
  title: "ChoDocs",
  description: "Front-end learning document collection.",
  markdown: {
    theme: "material-palenight",
    lineNumbers: true,
  },
  themeConfig: {
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-PRESENT Chocolate and ChoDocs contributors",
    },
    nav: [
      { text: "关于我", link: "https://blog.yangchaoyi.vip/" },
      { text: "Github", link: "https://github.com/Chocolate1999" },
    ],
    editLink: {
      pattern: "https://github.com/Chocolate1999/chodocs/edit/main/docs/:path",
    },
    sidebar,
  },
};
