---
author: "Choi Yang"
---

# 欢迎参与贡献，提 PR

## 贡献指南

可在 [github](https://github.com/chodocs/chodocs) 页 fork 一份仓库代码，然后基于 fork 后的提 PR 过来。

> 如果你足够感兴趣，我们也可以拉你加入我们的团队，直接基于 [chodocs](https://github.com/chodocs/chodocs) 开发。

推荐使用 pnpm 安装：

```bash
pnpm install
```

本地环境开发：

```bash
pnpm dev
```

## 文章贡献

对于文章贡献，分两种情况：

- 如果你是原创作者，请在 `author` 字段填写自己的 GitHub 账号名，会自动在文章末尾进行声明。

- 如果你是修正某篇文章，请在 `contributors` 字段增加自己的 GitHub 账号名，也会有贡献者头像，并不会修改原作者信息。


> 最好添加一下文字发布日期，即下方示例的 `date` 字段，会在文档开头自动生成发布日期和更新日期。

```bash
---
author: Choi Yang
contributors: [HearLing]
date: 2023-01-01
---
```

## 可以贡献哪些

比如你的面试经验，可参考这个来提交：[「isolcat 三月面试合集」](/interview/isolcat/)

也可以是文章勘误，因为本站内容难免会有一些笔误的存在，欢迎提交 PR！

来吧，在这里添加一个你的头像~

## 代码格式

对于代码格式，本仓库使用 `eslint` 与 `git-hooks`，在你提交代码的时候会进行格式化以及修复一些问题。

也可以手动执行一下：

```bash
pnpm run lint:fix
```

## 贡献者列表

采用自动生成形式，各位无需修改 `contributors.json` 文件，方便你我。

## 文字排版

笔记内容按照 [中文文案排版指北](https://mazhuang.org/wiki/chinese-copywriting-guidelines/)进行排版，即尽量保证中英文之间的空格，也可以使用 VSCode 相关格式化工具。

> todo：集成 md 格式化（欢迎 PR）

## 感谢参与

非常感谢你对于 [ChoDocs](https://github.com/chodocs/chodocs) 的参与贡献，我们会在首页 [chodocs.cn](https://chodocs.cn/) 展示各位贡献者的头像！
