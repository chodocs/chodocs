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

```bash
---
author: Choi Yang
contributors: [HearLing]
---
```

## 代码格式

对于代码格式，本仓库使用 `eslint` 与 `git-hooks`，在你提交代码的时候会进行格式化以及修复一些问题。

也可以手动执行一下：

```bash
pnpm run lint:fix
```

## 贡献者列表

推荐大家自行填写相关信息，只需要在 `docs/index.md` 文件内添加自己的相关信息即可，无需修改 `contributors.json` 文件，该文件会自动生成。

## 文字排版

笔记内容按照 [中文文案排版指北](https://mazhuang.org/wiki/chinese-copywriting-guidelines/)进行排版，即尽量保证中英文之间的空格，也可以使用 VSCode 相关格式化工具。

> todo：集成 md 格式化（欢迎 PR）

## 感谢参与

非常感谢你对于 [ChoDocs](https://github.com/chodocs/chodocs) 的参与贡献，我们会在首页 [chodocs.cn](https://chodocs.cn/) 展示各位贡献者的头像！
