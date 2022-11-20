# 使用 dumi 发布个人的 npm 包

## 前期准备

- 一个 npm 账号，如果没有的话需要自行[注册](https://www.npmjs.com/signup)。

- dumi 基础，可以观看 [bilibili 视频](https://www.bilibili.com/video/BV1KG4y1Z7ZX/) 快速学习文档。


## 使用 dumi
通过脚手架安装，根据提示选择对应的模版，由于我们要发布 npm 包，所以选择 `React Library`。

```js
npx create-dumi
```

## 发布前注意事项

第一，npm 源需要使用 npmjs

```typescript
npm config set registry http://registry.npmjs.org
```

第二，需要执行 `npm login`，填写用户名，邮箱等。

第三，package.json 里边 `name` 需要用小写，不能用大写

### 版本号规范

npm 包的版本通常遵循 [semver 语义化版本](https://semver.org/lang/zh-CN/)规范。

版本格式为：major.minor.patch，每个字母代表的含义如下：

主版本号（major）：当你做了不兼容的 API 修改，
次版本号（minor）：当你做了向下兼容的功能性新增，
修订号（patch）：当你做了向下兼容的问题修正。

先行版本号是加到修订号的后面，作为版本号的延伸；当要发行大版本或核心功能时，但不能保证这个版本完全正常，就要先发一个先行版本。

先行版本号的格式是在修订版本号后面加上一个连接号（-），再加上一连串以点（.）分割的标识符，标识符可以由英文、数字和连接号（[0-9A-Za-z-]）组成。举个例子：

```typescript
1.0​​.0-alpha
1.0.0-alpha.1
1.0.0-0.2.5
```

常见的先行版本号有：

- alpha：不稳定版本，一般而言，该版本的 Bug 较多，需要继续修改，是测试版本
- beta：基本稳定，相对于 Alpha 版已经有了很大的进步，消除了严重错误
- rc：和正式版基本相同，基本上不存在导致错误的 Bug
- release：最终版本

[此处参考：从零开始发布自己的 NPM 包](https://juejin.cn/post/7052307032971411463)


当然，我们最好是使用命令来规范我们的版本，举例：


> 以下主要介绍常用的几个命令

- `npm version major` （3.1.0 --> 4.0.0）
- `npm version minor`（2.0.1 --> 2.1.0）
- `npm version patch`（2.0.0 --> 2.0.1）

至于 prexxx 开头的，以及 release 相关可以查询下述文档拓展学习。


[文档指引：npm version](https://www.npmjs.cn/cli/version/)


## 补充相关命令

```typescript
// 登录自己的 npm 账号
npm login

// 退出当前账号
npm logout

// 查看当前身份
npm who am i

// 发布
npm publish

// 撤销发布某个版本
npm unpublish [pkg]@[version]
```
